import { Card } from "@heroui/react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { SectionHeader } from "@/components/ui/Typography";
import { ExternalLink } from "@/components/ui/ExternalLink";
import projects from "@/content/projects.json";

type Project = (typeof projects)[number];

const SCREENSHOT_BASE =
  "https://res.cloudinary.com/dluezegi8/image/upload/v1715078393/images/upload/thomasmoserdev.com/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group border border-transparent bg-[#ccdcff1f] p-2 hover:border-white/20 hover:bg-transparent">
      <ExternalLink href={project.link}>
        <Card.Content className="flex flex-col gap-8">
          <Image
            src={`${SCREENSHOT_BASE}/${project.screenshot}`}
            alt={`${project.title} screenshot`}
            width={1920}
            height={1080}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-video rounded-lg object-cover"
          />
          <div className="flex flex-col gap-4 rounded-lg bg-[#5757577b] px-4 py-3 group-hover:bg-[#57575733]">
            <div className="flex items-center justify-between">
              <div className="relative overflow-hidden text-lg font-bold md:text-xl">
                <div className="absolute w-full transition-transform duration-300 ease-linear group-hover:-translate-y-full">
                  {project.title}
                </div>
                <div className="w-full translate-y-full transition-transform duration-300 ease-linear group-hover:translate-y-0">
                  {project.title}
                </div>
              </div>
              <FaArrowRight className="transition-all duration-500 group-hover:-rotate-45" aria-hidden />
            </div>
            <ul className="flex flex-wrap gap-4">
              {project.code.map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-xs text-muted">
              {project.designed && <p>Designed by: {project.designed}</p>}
              {project.designed && project.developed && <span className="size-1 rounded-full bg-muted" aria-hidden />}
              {project.developed && <p>Developed by: {project.developed}</p>}
            </div>
          </div>
        </Card.Content>
      </ExternalLink>
    </Card>
  );
}

export function Projects() {
  return (
    <section id="projects" className="w-full max-w-7xl px-8 py-8">
      <SectionHeader title="Recent Work" subtitle="A small selection of my work" />
      <div className="mx-auto mt-12 grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
