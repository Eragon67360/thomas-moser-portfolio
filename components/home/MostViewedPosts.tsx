import Link from "next/link";
import { getMostViewedPosts } from "@/services/posts.service";
import type { PostWithViews } from "@/types/post";

function PostCard({ post }: { post: PostWithViews }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col gap-4 rounded-lg border border-gray-700 bg-white/5 p-4 text-start backdrop-blur-sm transition-colors hover:border-accent/60"
    >
      <span className="self-start rounded-lg bg-accent/10 p-1 text-xs text-accent">{post.views} views</span>
      <h3 className="font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-300">{post.description}</p>
    </Link>
  );
}

export async function MostViewedPosts() {
  const posts = await getMostViewedPosts().catch((error: unknown) => {
    console.error("Could not load post views", error);
    return [];
  });
  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
