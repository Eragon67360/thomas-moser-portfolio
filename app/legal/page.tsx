import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeader } from "@/components/ui/Typography";
import { profile, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Legal notice",
  description: "Legal notice (mentions légales) of thomasmoserdev.com: publisher, host and licences.",
  path: "/legal",
});

export default function LegalNoticePage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12 px-8 py-8">
      <SectionHeader as="h1" title="Legal notice" subtitle="Mentions légales" />
      <div className="article-prose w-full">
        <h2>Publisher</h2>
        <p>
          {site.name} is the personal, non-commercial website of {site.author}, a private individual. He is also its
          publication director (directeur de la publication).
        </p>
        <p>
          Contact: <a href={`mailto:${profile.Email}`}>{profile.Email}</a>
        </p>

        <h2>Host</h2>
        <p>
          Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States.{" "}
          <ExternalLink href="https://vercel.com">vercel.com</ExternalLink>
        </p>

        <h2>Content and source code</h2>
        <p>
          Articles and other written content are licensed under{" "}
          <ExternalLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</ExternalLink>. The
          source code is published under the <ExternalLink href={profile.License}>MIT License</ExternalLink>. Project
          names, logos and screenshots belong to their respective owners.
        </p>

        <h2>Personal data</h2>
        <p>
          How this site handles visitors&apos; data is described in the <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </div>
  );
}
