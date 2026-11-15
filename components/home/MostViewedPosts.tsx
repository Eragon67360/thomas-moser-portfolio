import Link from "next/link";
import { getMostViewedPosts, getPostSummaries, onePerArticle } from "@/services/posts.service";
import type { PostMeta } from "@/types/post";

type PostCardData = PostMeta & { views?: number };

/** Cards on the home page: two rows of two, however many posts the blog has. */
const HOME_POST_LIMIT = 4;

function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      hrefLang={post.lang}
      className="flex h-full flex-col gap-4 rounded-lg border border-white/15 bg-white/5 p-4 text-start backdrop-blur-sm transition-colors hover:border-accent/60"
    >
      {post.views !== undefined && (
        <span className="self-start rounded-lg bg-accent/10 p-1 text-xs text-accent">{post.views} views</span>
      )}
      <h3 lang={post.lang} className="font-semibold">
        {post.title}
      </h3>
      <p lang={post.lang} className="text-sm text-foreground/80">
        {post.description}
      </p>
    </Link>
  );
}

/**
 * The most viewed articles, one card per article (not one per language), topped up with the latest ones when fewer
 * have views or view counts are unavailable, so the home page always shows the same number of cards.
 */
export async function MostViewedPosts() {
  const [mostViewed, latest] = await Promise.all([
    getMostViewedPosts().catch((error: unknown) => {
      console.error("Could not load post views", error);
      return [];
    }),
    getPostSummaries(),
  ]);
  const posts: PostCardData[] = onePerArticle<PostCardData>([...mostViewed, ...latest], HOME_POST_LIMIT);
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
      <div className="mt-3 flex justify-center lg:justify-end">
        <Link href="/blog" className="py-1 text-sm text-muted transition-colors hover:text-accent">
          All posts →
        </Link>
      </div>
    </section>
  );
}
