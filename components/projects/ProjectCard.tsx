import { Card } from "@heroui/react";
import Image from "next/image";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { projectScreenshot } from "@/lib/media";
import type { Project } from "@/types/project";
import { formatPeriod } from "./format";
import { HoverVideo } from "./HoverVideo";

type ScreenshotProps = { project: Project; priority?: boolean };

function Screenshot({ project, priority = false }: ScreenshotProps) {
  if (!project.screenshot) {
    return (
      <div className="flex aspect-16/10 w-full items-center justify-center rounded-lg bg-linear-to-br from-accent/20 via-surface to-surface p-6 text-center">
        <span className="text-xl font-bold text-foreground/80 md:text-2xl">{project.title}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        src={projectScreenshot(project.screenshot)}
        alt={`Screenshot of ${project.title}`}
        width={1440}
        height={900}
        sizes={project.featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
        // The first card's screenshot is the page's LCP element: preload it, lazy-load the rest.
        priority={priority}
        className="aspect-16/10 w-full rounded-lg object-cover object-top"
      />
      {project.video && <HoverVideo src={project.video} label={`Animated preview of ${project.title}`} />}
    </div>
  );
}

function Credits({ credits }: { credits: Project["credits"] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/70">
      {credits.designedBy && <p>Designed by: {credits.designedBy.join(", ")}</p>}
      {credits.designedBy && <span className="size-1 rounded-full bg-muted" aria-hidden />}
      <p>Developed by: {credits.developedBy.join(", ")}</p>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  /** True for the first card on the page: its screenshot loads eagerly with a preload hint. */
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const primaryLink = project.links.live ?? project.links.repo;

  return (
    <Card
      data-project-card
      className={`group border border-transparent bg-surface-tint p-2 hover:border-white/20 hover:bg-transparent ${
        project.featured ? "sm:col-span-2" : ""
      }`}
    >
      <Card.Content className={`flex flex-col gap-6 ${project.featured ? "lg:flex-row lg:items-stretch" : ""}`}>
        <div className={project.featured ? "lg:w-3/5" : ""}>
          <Screenshot project={project} priority={priority} />
        </div>
        <div
          className={`flex flex-col gap-4 rounded-lg bg-panel-tint px-4 py-3 group-hover:bg-panel-tint-hover ${
            project.featured ? "lg:w-2/5 lg:justify-center" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* The copy that slides in on hover is CSS-generated from `data-title` (`.project-title` in
                globals.css), so the heading holds the title once for parsers and assistants. */}
            <h2
              data-title={project.title}
              className="project-title relative overflow-hidden text-lg font-bold md:text-xl"
            >
              <span className="absolute w-full transition-transform duration-300 ease-linear group-hover:-translate-y-full">
                {project.title}
              </span>
            </h2>
            {primaryLink && (
              <ExternalLink href={primaryLink} aria-label={`Open ${project.title}`} className="-m-1 p-1">
                {/* `-m-1 p-1`: a 24x24 target around the 16px icon, icon position unchanged. */}
                <FaArrowRight className="transition-all duration-500 group-hover:-rotate-45" aria-hidden />
              </ExternalLink>
            )}
          </div>

          {(project.context || project.period) && (
            <p className="text-xs text-foreground/70">
              {[project.context, project.period && formatPeriod(project.period)].filter(Boolean).join(" · ")}
            </p>
          )}

          <p className="text-sm leading-relaxed sm:text-base">{project.summary}</p>

          {project.stack.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li key={tech} className="flex items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-accent" aria-hidden />
                  {tech}
                </li>
              ))}
            </ul>
          )}

          <Credits credits={project.credits} />

          <div className="flex flex-wrap gap-4 text-sm">
            {project.links.live && (
              <ExternalLink href={project.links.live} className="flex items-center gap-1.5 text-accent hover:underline">
                <FiExternalLink aria-hidden /> Live site
              </ExternalLink>
            )}
            {project.links.repo && (
              <ExternalLink
                href={project.links.repo}
                className="flex items-center gap-1.5 hover:text-accent hover:underline"
              >
                <FaGithub aria-hidden /> Source
              </ExternalLink>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
