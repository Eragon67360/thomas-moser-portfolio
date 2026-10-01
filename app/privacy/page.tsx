import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SectionHeader } from "@/components/ui/Typography";
import { profile, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";

/** Bump when the policy changes. */
const LAST_UPDATED = "2 October 2026";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "What thomasmoserdev.com processes when you visit: hosting, cookieless statistics, blog view counts, comments and the 3D scene. No ads, no tracking cookies.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = <a href={`mailto:${profile.Email}`}>{profile.Email}</a>;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-12 px-8 py-8">
      <SectionHeader as="h1" title="Privacy policy" subtitle={`Last updated ${LAST_UPDATED}`} />
      <div className="article-prose w-full">
        <p>
          This policy explains which personal data {site.name} processes when you visit it, why, and what your rights
          are. The site has no user accounts, no newsletter and no advertising, and it sets no cookies of its own.
        </p>

        <h2>Who is responsible</h2>
        <p>
          {site.author}, a private individual who publishes this site (see the <Link href="/legal">legal notice</Link>
          ), is the controller of the data described here. Contact: {email}.
        </p>

        <h2>What is processed, and why</h2>

        <h3>Hosting</h3>
        <p>
          The site is hosted by Vercel. Like any web server, it receives the technical data needed to deliver pages and
          protect the service: your IP address, the page requested, the date and time, your browser&apos;s user agent
          and the referring page. Vercel keeps these logs only for operation and security, under its own policy; the
          site keeps no request logs of its own. Legal basis: legitimate interest in running a secure website (Article
          6(1)(f) GDPR).
        </p>

        <h3>Audience statistics</h3>
        <p>
          Page views are counted with Vercel Web Analytics, which uses no cookies and stores no IP address. Each view
          records the page, the referring site, your country or region (derived from your IP address), your browser,
          operating system and device type. Visitors are told apart by a hash of the request that Vercel discards after
          24 hours, so views can&apos;t be linked to a person or followed across sites. Legal basis: legitimate interest
          in knowing which pages are read.
        </p>

        <h3>Blog view counts</h3>
        <p>
          When you open a post, your browser tells the site which post you are reading, and the post&apos;s view counter
          goes up by one. To count each reader once a day, the site stores, for 24 hours, a one-way hash of a random
          daily key, your IP address and the post. Your IP address itself is never stored, and the random keys are
          deleted after 48 hours, after which the hashes can no longer be linked to anyone. The counters are plain
          numbers per post. These data are stored with Upstash, the site&apos;s database provider. Legal basis:
          legitimate interest in showing honest view counts.
        </p>

        <h3>Home page visits by country</h3>
        <p>
          Each visit to the home page adds one to a daily counter for your country, which Vercel derives from your IP
          address. Only the country and the count are stored, for 7 days.
        </p>

        <h3>Comments</h3>
        <p>
          Comments under posts use <ExternalLink href="https://giscus.app">giscus</ExternalLink>, which displays a
          GitHub Discussion of this site&apos;s repository. The comments frame is loaded from giscus.app only when you
          scroll down to it; like any website, giscus.app and GitHub then receive your IP address and browser
          information. Reading comments needs no account. To comment or react, you sign in with GitHub: your comment is
          published on GitHub under your GitHub account, under{" "}
          <ExternalLink href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub&apos;s privacy statement
          </ExternalLink>
          , and giscus keeps a sign-in token in your browser&apos;s storage for giscus.app. You can edit or delete your
          comments on GitHub at any time. Legal basis: legitimate interest in showing the discussion; posting is your
          own choice.
        </p>

        <h3>3D scene</h3>
        <p>
          The animated 3D scroll-to-top button is a Spline scene: your browser downloads it from Spline&apos;s servers
          (prod.spline.design), which therefore receive your IP address and browser information. Legal basis: legitimate
          interest in displaying the site as designed.
        </p>

        <h3>Images and activity widgets</h3>
        <p>
          Project screenshots, album covers and game images are served through the site&apos;s own image service, so
          your browser does not contact Cloudinary, Deezer or Steam. The listening and gaming activity on the activities
          page is {site.author}&apos;s own, fetched by the server; nothing about you is sent to Deezer or Steam.
        </p>

        <h3>Contacting me</h3>
        <p>
          The project request form sends nothing to the site: it opens your email app with a pre-filled message, and
          nothing leaves your device until you send that email yourself. Emails you send me, and messages through
          WhatsApp, LinkedIn or Calendly, are used only to answer you and are kept only as long as the conversation
          needs. Legal basis: steps taken at your request (Article 6(1)(b) GDPR) and legitimate interest in answering
          messages. Those services process your messages under their own privacy policies.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          The site sets no cookies and stores nothing in your browser for its own purposes, so there is no cookie
          banner. The only browser storage involved is giscus&apos;s sign-in token, and only if you sign in to comment.
        </p>

        <h2>Recipients and transfers outside the EU</h2>
        <p>
          The data above are processed by Vercel Inc. (hosting and statistics, United States), Upstash (database),
          GitHub, Inc. and giscus (comments, United States) and Spline (3D scene, United States). Transfers to the
          United States rely on the EU-U.S. Data Privacy Framework where the company is certified, and otherwise on the
          European Commission&apos;s standard contractual clauses. Nothing is sold or shared for advertising, and no
          profiling or automated decision-making takes place.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask for access to, correction or deletion of your data, restrict or object to its processing, and ask
          for a copy in a portable format, by writing to {email}. Most data described here can&apos;t be linked to you
          (daily hashes, counters, aggregated statistics), so there may be nothing to find. Comments are managed
          directly on GitHub. You can also lodge a complaint with the French data protection authority, the{" "}
          <ExternalLink href="https://www.cnil.fr/en/complaints">CNIL</ExternalLink>.
        </p>

        <h2>Changes</h2>
        <p>
          This policy describes the site as it is. When the site changes how it handles data, the policy is updated and
          the date at the top changes.
        </p>
      </div>
    </div>
  );
}
