import type { Metadata } from "next";
import { PostList } from "@/components/blog/PostList";
import { SectionHeader } from "@/components/ui/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { blogPage } from "@/lib/seo/structured-data";
import { getPostSummaries } from "@/services/posts.service";

const DESCRIPTION =
  "Hands-on tutorials on Next.js, TypeScript and web APIs, written in English and French by full-stack developer Thomas Moser.";

export const metadata: Metadata = pageMetadata({ title: "Blog", description: DESCRIPTION, path: "/blog" });

export default async function BlogPage() {
  const posts = await getPostSummaries();

  return (
    <div className="flex w-full flex-col items-center gap-8 font-inter">
      <JsonLd data={blogPage(posts)} />
      <SectionHeader as="h1" title="Posts" subtitle={DESCRIPTION} />
      <div className="w-full max-w-4xl py-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
