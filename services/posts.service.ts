import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { getAllPostViews } from "@/services/views.service";
import type { Post, PostWithViews } from "@/types/post";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function parseFrontmatter(file: string, data: Record<string, unknown>): Omit<Post, "body"> | null {
  if (data.published === false) return null;

  const { slug, title, description, date, tags, duration } = data;
  if (typeof slug !== "string" || typeof title !== "string" || typeof date !== "string") {
    throw new Error(`${file}: frontmatter requires string "slug", "title" and "date"`);
  }
  return {
    slug,
    title,
    date,
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

  return posts
    .filter((post): post is Post => post !== null)
    .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
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
