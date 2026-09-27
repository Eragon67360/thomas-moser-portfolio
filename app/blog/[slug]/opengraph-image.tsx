import { notFound } from "next/navigation";
import { postShareImage } from "@/lib/media";
import { ogImageSize, renderOgImage } from "@/lib/seo/og-image";
import { getPost, getPosts } from "@/services/posts.service";

export const alt = "Article cover";
export const size = ogImageSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return renderOgImage({
    kicker: post.lang === "fr" ? "Article" : "Blog post",
    title: post.title,
    subtitle: post.description,
    background: postShareImage(slug),
  });
}
