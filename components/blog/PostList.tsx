import Link from "next/link";
import { formatPostDate } from "@/lib/dates";
import type { PostMeta } from "@/types/post";

function PostListItem({ post }: { post: PostMeta }) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} hrefLang={post.lang} className="group flex w-full gap-4 p-4">
        <div className="hidden flex-1 items-center sm:flex" aria-hidden>
          <div className="h-px w-full bg-muted/65" />
        </div>
        <article
          lang={post.lang}
          className="flex w-full flex-col gap-3 rounded-2xl p-4 transition-colors group-hover:bg-surface/40 sm:w-2/3"
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="rounded bg-accent/10 px-1.5 py-0.5 font-jet text-accent uppercase">{post.lang}</span>
            <time dateTime={post.date}>{formatPostDate(post.date, post.lang)}</time>
          </p>
          <p className="text-base font-extralight text-muted">{post.description}</p>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-xl bg-surface px-3 py-2 text-xs">
                #{tag}
              </li>
            ))}
          </ul>
        </article>
      </Link>
    </li>
  );
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="w-full">
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
