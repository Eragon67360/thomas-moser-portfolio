import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { postHeaderImage } from "@/lib/media";
import { ogImageSize, publicImageDataUrl, renderOgImage } from "@/lib/seo/og-image";
import { getPost, getPosts } from "@/services/posts.service";

// Next only allows a static alt here; it still beats a generic "cover".
export const alt = `Social card for an article by ${site.author}`;
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
    background: await publicImageDataUrl(postHeaderImage(slug)),
  });
}
