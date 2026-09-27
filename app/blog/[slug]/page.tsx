import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import readingDuration from "reading-duration";
import { Comments } from "@/components/blog/Comments";
import { PostContent } from "@/components/blog/PostContent";
import { PostHeader } from "@/components/blog/PostHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ViewTracker } from "@/components/blog/ViewTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { compileMdx } from "@/lib/mdx";
import { absoluteUrl, feedAlternate, sharedOpenGraph } from "@/lib/seo/metadata";
import { blogPosting } from "@/lib/seo/structured-data";
import { getPost, getPosts, getTranslation } from "@/services/posts.service";
import type { PostLang } from "@/types/post";
import { getPostViews } from "@/services/views.service";

export const revalidate = 60;

const OG_LOCALES: Record<PostLang, string> = { en: "en_US", fr: "fr_FR" };

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const path = `/blog/${slug}`;
  const translation = await getTranslation(post);
  const english = post.lang === "en" ? post : translation;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: path,
      types: feedAlternate,
      ...(translation && {
        languages: {
          [post.lang]: path,
          [translation.lang]: `/blog/${translation.slug}`,
          ...(english && { "x-default": `/blog/${english.slug}` }),
        },
      }),
    },
    openGraph: {
      ...sharedOpenGraph,
      type: "article",
      url: path,
      title: post.title,
      description: post.description,
      locale: OG_LOCALES[post.lang],
      ...(translation && { alternateLocale: OG_LOCALES[translation.lang] }),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [absoluteUrl("/about")],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [{ Content, headings }, views, translation] = await Promise.all([
    compileMdx(post.body),
    getPostViews(slug).catch(() => 0),
    getTranslation(post),
  ]);
  const readingTime = readingDuration(post.body, { wordsPerMinute: 100, emoji: false });

  return (
    <div lang={post.lang}>
      <JsonLd data={blogPosting(post, translation)} />
      <ViewTracker slug={slug} />
      <PostHeader post={post} views={views} translation={translation} />
      <div className="mx-auto my-10 max-w-6xl px-6 sm:my-20 md:px-24 lg:flex lg:gap-8 xl:px-0">
        <div className="w-full min-w-0">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-between gap-4 text-sm text-muted">
            <Link href="/blog" className="transition-colors hover:text-accent">
              ← {post.lang === "fr" ? "Tous les articles" : "All posts"}
            </Link>
            <span>{readingTime}</span>
          </nav>
          <article>
            <PostContent Content={Content} />
          </article>
          <hr className="my-8 opacity-20" />
          <Comments />
        </div>
        <aside className="my-10 hidden lg:block lg:w-2/5">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
