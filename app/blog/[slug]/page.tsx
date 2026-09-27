import type { Metadata } from "next";
import { notFound } from "next/navigation";
import readingDuration from "reading-duration";
import { Comments } from "@/components/blog/Comments";
import { PostContent } from "@/components/blog/PostContent";
import { PostHeader } from "@/components/blog/PostHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ViewTracker } from "@/components/blog/ViewTracker";
import { compileMdx } from "@/lib/mdx";
import { getPost, getPosts } from "@/services/posts.service";
import { getPostViews } from "@/services/views.service";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [{ Content, headings }, views] = await Promise.all([compileMdx(post.body), getPostViews(slug).catch(() => 0)]);
  const readingTime = readingDuration(post.body, { wordsPerMinute: 100, emoji: false });

  return (
    <>
      <ViewTracker slug={slug} />
      <PostHeader post={post} views={views} />
      <div className="mx-auto my-10 max-w-6xl px-6 sm:my-20 md:px-24 lg:flex lg:gap-8 xl:px-0">
        <div className="w-full min-w-0">
          <p className="mb-6 text-sm text-muted">{readingTime}</p>
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
    </>
  );
}
