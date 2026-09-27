import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import type { PostMeta } from "@/types/post";

const HEADER_IMAGE_BASE =
  "https://res.cloudinary.com/dluezegi8/image/upload/v1714491226/images/upload/thomasmoserdev.com/blog";

export function PostHeader({ post, views }: { post: PostMeta; views: number }) {
  return (
    <header className="relative -mt-16 min-h-screen">
      <Image
        src={`${HEADER_IMAGE_BASE}/${post.slug}/header`}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="relative flex min-h-screen w-full items-center justify-center bg-linear-to-t from-background to-transparent text-center">
        <div className="mx-5 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">{post.title}</h1>
          <div className="relative my-10 grid grid-cols-[auto_1fr_auto] items-center gap-x-2">
            <time className="rounded-lg bg-white/20 p-1 px-2 text-sm">{post.date}</time>
            <div className="w-full border-b" />
            <div className="flex items-center gap-2" aria-label={`${views} views`}>
              <FaRegEye aria-hidden />
              {views}
            </div>
          </div>
          <p className="text-md mb-10 text-gray-400 sm:text-lg lg:mb-0">{post.description}</p>
        </div>
      </div>
    </header>
  );
}
