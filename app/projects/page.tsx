import type { Metadata } from "next";
import { Projects } from "@/components/projects/Projects";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { projectsPage } from "@/lib/seo/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Thomas Moser: websites, admin dashboards, mobile apps and AI experiments built end to end with Next.js, Supabase, Flutter and more.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsPage(projects)} />
      <Projects />
    </>
  );
}
