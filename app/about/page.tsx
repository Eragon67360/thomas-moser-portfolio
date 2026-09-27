import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { Competencies } from "@/components/about/Competencies";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <About />
      <hr className="h-px w-full border-0 bg-gray-500/30" />
      <Competencies />
    </div>
  );
}
