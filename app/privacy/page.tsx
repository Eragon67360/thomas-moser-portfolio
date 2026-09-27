import type { Metadata } from "next";
import { SectionTitle } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <SectionTitle>Privacy policy</SectionTitle>;
}
