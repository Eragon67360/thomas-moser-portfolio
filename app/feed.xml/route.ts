import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/metadata";
import { escapeXml } from "@/lib/xml";
import { getPosts } from "@/services/posts.service";

export const dynamic = "force-static";

/** RSS 2.0 feed of every published post, English and French. */
export async function GET() {
  const posts = await getPosts();
  const feedUrl = absoluteUrl("/feed.xml");
  const lastBuild = posts
    .map((post) => post.updated ?? post.date)
    .toSorted()
    .at(-1);

  const items = posts.map((post) => {
    const url = absoluteUrl(`/blog/${post.slug}`);
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(site.author)}</dc:creator>
      <dc:language>${post.lang}</dc:language>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${site.author}'s blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
${lastBuild ? `    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
