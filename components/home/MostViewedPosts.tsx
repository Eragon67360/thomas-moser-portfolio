import Link from "next/link";
import { getMostViewedPosts, getPostSummaries } from "@/services/posts.service";
import type { PostMeta } from "@/types/post";

type PostCardData = PostMeta & { views?: number };

function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      hrefLang={post.lang}
      className="flex h-full flex-col gap-4 rounded-lg border border-gray-700 bg-white/5 p-4 text-start backdrop-blur-sm transition-colors hover:border-accent/60"
    >
      {post.views !== undefined && (
        <span className="self-start rounded-lg bg-accent/10 p-1 text-xs text-accent">{post.views} views</span>
      )}
      <h3 lang={post.lang} className="font-semibold">
        {post.title}
      </h3>
      <p lang={post.lang} className="text-sm text-gray-300">
        {post.description}
      </p>
    </Link>
  );
}

/** Most viewed posts; the latest ones when view counts are unavailable, so the home page always links to the blog. */
export async function MostViewedPosts() {
  const mostViewed: PostCardData[] = await getMostViewedPosts().catch((error: unknown) => {
    console.error("Could not load post views", error);
    return [];
  });
  const posts = mostViewed.length > 0 ? mostViewed : await getPostSummaries(4);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="home-posts" className="w-full">
      <h2 id="home-posts" className="sr-only">
        {mostViewed.length > 0 ? "Most read posts" : "Latest posts"}
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
