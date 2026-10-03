import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/Typography";
import { site } from "@/config/site";
import { feedAlternate, sharedOpenGraph } from "@/lib/seo/metadata";

const TITLE = "Page not found";
const DESCRIPTION = `The address you followed does not exist on ${site.name}.`;

/**
 * Keeps crawlers from indexing a missing page: no canonical (a 404 has no canonical address, and
 * `alternates` replaces the layout's rather than merging with it) and no `og:url`. Next adds its
 * own `<meta name="robots" content="noindex">` to every not-found render; `robots: null` only
 * drops the layout's `index, follow`, so exactly one robots tag remains.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: null,
  alternates: { canonical: null, types: feedAlternate },
  openGraph: { ...sharedOpenGraph, type: "website", title: `${TITLE} | ${site.author}`, description: DESCRIPTION },
  twitter: { card: "summary", title: `${TITLE} | ${site.author}`, description: DESCRIPTION },
};

const PILL = "rounded-full px-4 py-2 text-sm font-semibold transition-colors";

/** Rendered for unknown URLs and by `notFound()` (e.g. an unknown post slug), inside the root layout. */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-8 py-16">
      <SectionHeader as="h1" title={TITLE} subtitle={DESCRIPTION} />
      <nav aria-label="Where to go next" className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className={`${PILL} bg-accent text-accent-foreground hover:bg-accent-hover`}>
          Home
        </Link>
        <Link href="/projects" className={`${PILL} border border-white/20 hover:border-accent/60 hover:text-accent`}>
          Projects
        </Link>
        <Link href="/blog" className={`${PILL} border border-white/20 hover:border-accent/60 hover:text-accent`}>
          Blog
        </Link>
      </nav>
    </div>
  );
}
