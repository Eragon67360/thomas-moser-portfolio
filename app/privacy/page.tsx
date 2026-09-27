import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/Typography";
import { pageMetadata } from "@/lib/seo/metadata";

// The policy text is still to be written: keep this page out of search results until then.
export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "Privacy policy of thomasmoserdev.com.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return <SectionTitle as="h1">Privacy policy</SectionTitle>;
}
