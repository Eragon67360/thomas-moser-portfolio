import type { Metadata } from "next";
import { site } from "@/config/site";

/** Absolute URL on the canonical host. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/blog". Becomes the canonical and og:url. */
  path: string;
  /** Keep the page out of search results (it stays crawlable so the directive is seen). */
  noindex?: boolean;
};

/** RSS feed link, repeated on every page because a page's `alternates` replaces the layout's. */
export const feedAlternate = {
  "application/rss+xml": [{ url: "/feed.xml", title: `${site.author}'s blog` }],
};

/** Site-wide social card (app/opengraph-image.tsx); routes with their own card override it. */
const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, alt: site.title };

export const sharedOpenGraph = { siteName: site.name, locale: "en_US" } as const;

/**
 * Metadata for a regular page. A page's `openGraph`, `twitter` and `alternates` replace the
 * layout's instead of merging, so every page restates the shared fields.
 */
export function pageMetadata({ title, description, path, noindex }: PageMetadataInput): Metadata {
  // The `%s | Thomas Moser` title template only applies to <title>, not to social titles.
  const shareTitle = `${title} | ${site.author}`;
  return {
    title,
    description,
    alternates: { canonical: path, types: feedAlternate },
    openGraph: {
      ...sharedOpenGraph,
      type: "website",
      url: path,
      title: shareTitle,
      description,
      images: [defaultImage],
    },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [defaultImage] },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
