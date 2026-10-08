import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { getAllPostViews } from "@/services/views.service";
import { POST_TYPES, type Post, type PostMeta, type PostType, type PostWithViews } from "@/types/post";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

/**
 * Production shows a post only once its `date` has come, judged on the day of the build (Paris time,
 * inlined by next.config.ts) so that an ISR revalidation never lists a post whose page wasn't built.
 * A daily workflow redeploys main when a post is due (.github/workflows/publish-scheduled-posts.yml).
 * Previews and local runs show scheduled posts so they can be reviewed.
 */
function isDue(date: string): boolean {
  const buildDay = process.env.POSTS_BUILD_DAY;
  return process.env.VERCEL_ENV !== "production" || !buildDay || date <= buildDay;
}

/** YAML turns an unquoted `2024-04-29` into a Date; accept that or an ISO string. */
function isoDate(file: string, field: string, value: unknown): string | undefined {
  if (value === undefined) return undefined;
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    throw new Error(`${file}: frontmatter "${field}" must be a YYYY-MM-DD date`);
  }
  return iso;
}

function isPostType(value: unknown): value is PostType {
  return POST_TYPES.some((type) => type === value);
}

function parseFrontmatter(file: string, data: Record<string, unknown>): Omit<Post, "body"> | null {
  if (data.published === false) return null;

  const { slug, title, description, tags, duration, lang, type, translation } = data;
  const date = isoDate(file, "date", data.date);
  if (typeof slug !== "string" || typeof title !== "string" || !date) {
    throw new Error(`${file}: frontmatter requires string "slug", "title" and "date"`);
  }
  if (lang !== undefined && lang !== "en" && lang !== "fr") {
    throw new Error(`${file}: frontmatter "lang" must be "en" or "fr"`);
  }
  if (!isPostType(type)) {
    throw new Error(`${file}: frontmatter "type" must be one of ${POST_TYPES.join(", ")}`);
  }
  return {
    slug,
    title,
    date,
    updated: isoDate(file, "updated", data.updated),
    lang: lang ?? "en",
    type,
    translation: typeof translation === "string" ? translation : undefined,
    description: typeof description === "string" ? description : "",
    tags: Array.isArray(tags) ? tags.map(String) : [],
    duration: typeof duration === "number" ? duration : undefined,
  };
}

/** Published posts, newest first. Cached per request. */
export const getPosts = cache(async (): Promise<Post[]> => {
  const files = (await readdir(ARTICLES_DIR)).filter((file) => /\.mdx?$/.test(file));

  const posts = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(await readFile(path.join(ARTICLES_DIR, file), "utf8"));
      const meta = parseFrontmatter(file, data);
      return meta && { ...meta, body: content };
    }),
  );

  // Newest first; on the same day the English original comes before its translation.
  return posts
    .filter((post): post is Post => post !== null && isDue(post.date))
    .toSorted((a, b) => b.date.localeCompare(a.date) || Number(b.lang === "en") - Number(a.lang === "en"));
});

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
}

/** The same article in the other language, if it exists and is published. */
export async function getTranslation(post: PostMeta): Promise<Post | undefined> {
  return post.translation ? getPost(post.translation) : undefined;
}

/** Posts without their bodies, newest first; all of them unless `limit` is given. */
export async function getPostSummaries(limit?: number): Promise<PostMeta[]> {
  return (await getPosts()).slice(0, limit).map(({ body: _body, ...meta }) => meta);
}

/** Posts that have recorded views, most viewed first. */
export async function getMostViewedPosts(): Promise<PostWithViews[]> {
  const [posts, views] = await Promise.all([getPosts(), getAllPostViews()]);
  const bySlug = new Map(posts.map((post) => [post.slug, post]));

  return views.flatMap(({ slug, views: count }) => {
    const post = bySlug.get(slug);
    if (!post) return [];
    const { body: _body, ...meta } = post;
    return [{ ...meta, views: count }];
  });
}
