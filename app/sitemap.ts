import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";
import { getPosts } from "@/services/posts.service";
import type { Post } from "@/types/post";

const STATIC_ROUTES = ["/", "/about", "/projects", "/blog", "/activities"];

/** hreflang pair for a translated post, including the post itself. */
function languageAlternates(post: Post, posts: Post[]) {
  const translation = posts.find(({ slug }) => slug === post.translation);
  if (!translation) return undefined;
  const english = post.lang === "en" ? post : translation;
  return {
    languages: {
      [post.lang]: absoluteUrl(`/blog/${post.slug}`),
      [translation.lang]: absoluteUrl(`/blog/${translation.slug}`),
      "x-default": absoluteUrl(`/blog/${english.slug}`),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latestPost = posts
    .map((post) => post.updated ?? post.date)
    .toSorted()
    .at(-1);

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route),
      ...(route === "/blog" && latestPost && { lastModified: latestPost }),
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
      alternates: languageAlternates(post, posts),
    })),
  ];
}
