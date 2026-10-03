import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { site } from "@/config/site";
import { formatPostDate } from "@/lib/dates";
import { postHeaderImage } from "@/lib/media";
import type { PostLang, PostMeta } from "@/types/post";

const LABELS: Record<PostLang, { by: string; updated: string; readIn: string }> = {
  en: { by: "By", updated: "Updated", readIn: "Read in English" },
  fr: { by: "Par", updated: "Mis à jour le", readIn: "Lire en français" },
};

type PostHeaderProps = { post: PostMeta; views: number; translation?: PostMeta };

export function PostHeader({ post, views, translation }: PostHeaderProps) {
  const labels = LABELS[post.lang];
  return (
    <header className="relative -mt-16 min-h-screen">
      <Image src={postHeaderImage(post.slug)} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="relative flex min-h-screen w-full items-center justify-center bg-linear-to-t from-background to-transparent text-center">
        <div className="mx-5 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-foreground sm:text-5xl">{post.title}</h1>
          <div className="relative my-10 grid grid-cols-[auto_1fr_auto] items-center gap-x-2">
            <time dateTime={post.date} className="rounded-lg bg-white/20 p-1 px-2 text-sm">
              {formatPostDate(post.date, post.lang)}
            </time>
            <div className="w-full border-b" />
            <div className="flex items-center gap-2" aria-label={`${views} views`}>
              <FaRegEye aria-hidden />
              {views}
            </div>
          </div>
          <p className="mb-6 text-base text-muted sm:text-lg">{post.description}</p>
          <p className="mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-foreground/80 lg:mb-0">
            <span>
              {labels.by}{" "}
              <Link href="/about" rel="author" className="text-accent hover:underline">
                {site.author}
              </Link>
            </span>
            {post.updated && (
              <span>
                · {labels.updated} <time dateTime={post.updated}>{formatPostDate(post.updated, post.lang)}</time>
              </span>
            )}
            {translation && (
              <span>
                ·{" "}
                <Link
                  href={`/blog/${translation.slug}`}
                  hrefLang={translation.lang}
                  lang={translation.lang}
                  className="text-accent hover:underline"
                >
                  {LABELS[translation.lang].readIn}
                </Link>
              </span>
            )}
          </p>
        </div>
      </div>
    </header>
  );
}
