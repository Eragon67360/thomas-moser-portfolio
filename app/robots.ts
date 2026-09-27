import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/metadata";

/**
 * The site wants to be found, by search engines and AI assistants alike, so every
 * crawler is welcome. Most AI crawlers do not run JavaScript: keep content server-rendered.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
