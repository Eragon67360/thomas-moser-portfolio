import type { Metadata } from "next";
import { Projects } from "@/components/projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <Projects />;
}
