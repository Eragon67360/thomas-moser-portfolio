import { SectionHeader } from "@/components/ui/Typography";
import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="w-full max-w-7xl px-8 py-8">
      <SectionHeader
        as="h1"
        title="Recent Work"
        subtitle="A selection of what I have built, for clients, friends and myself"
      />
      <div className="mx-auto mt-12 grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
