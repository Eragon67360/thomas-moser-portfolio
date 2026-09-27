import type { Metadata } from "next";
import { PostList } from "@/components/blog/PostList";
import { SectionHeader } from "@/components/ui/Typography";
import { getPosts } from "@/services/posts.service";

const DESCRIPTION =
  "Collection of informative and resources focused on various programming-related with the latest industry trends.";

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex w-full flex-col items-center gap-8 font-inter">
      <SectionHeader title="Posts" subtitle={DESCRIPTION} />
      <div className="w-full max-w-4xl py-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
