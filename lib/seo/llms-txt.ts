import { cvDownloads, profile, site } from "@/config/site";
import { education, experience, intro, languages, location, stack } from "@/content/about";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { PostMeta } from "@/types/post";

/**
 * /llms.txt (https://llmstxt.org): a Markdown digest of the site for AI agents,
 * built from the same content modules as the pages so it never drifts.
 */
export function buildLlmsTxt(posts: PostMeta[]): string {
  const lines = [
    `# ${site.author}`,
    "",
    `> ${site.description}`,
    "",
    ...intro.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    "## Profile",
    "",
    `- Role: ${intro.role}`,
    `- Current position: ${experience[0]?.title}, ${experience[0]?.organization} (${experience[0]?.place}). ${experience[0]?.description}`,
    `- Location: ${location.home}; works in ${location.work}`,
    `- Spoken languages: ${languages.map(({ name, level }) => `${name} (${level})`).join(", ")}`,
    ...stack.map(({ group, items }) => `- Stack, ${group.toLowerCase()}: ${items.join(", ")}`),
    "",
    "## Experience",
    "",
    ...experience.map(({ title, organization, place, period }) => `- ${period}: ${title}, ${organization} (${place})`),
    "",
    "## Education",
    "",
    ...education.map(({ title, organization, place, period }) => `- ${period}: ${title}, ${organization} (${place})`),
    "",
    "## Pages",
    "",
    `- [About](${absoluteUrl("/about")}): career, education, stack and contact`,
    `- [Projects](${absoluteUrl("/projects")}): selected work with stack and links`,
    `- [Blog](${absoluteUrl("/blog")}): tutorials in English and French ([RSS](${absoluteUrl("/feed.xml")}))`,
    ...cvDownloads.map(({ label, href }) => `- [CV, ${label} (PDF)](${absoluteUrl(href)})`),
    "",
    "## Projects",
    "",
    ...projects.map((project) => {
      const url = project.links.live ?? project.links.repo;
      const name = url ? `[${project.title}](${url})` : project.title;
      const stackNote = project.stack.length > 0 ? ` Stack: ${project.stack.join(", ")}.` : "";
      return `- ${name}: ${project.summary}${stackNote}`;
    }),
    "",
    "## Blog posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}) (${post.lang}, ${post.date}): ${post.description}`,
    ),
    "",
    "## Contact",
    "",
    `- Email: ${profile.Email}`,
    `- GitHub: ${profile.Github}`,
    `- LinkedIn: ${profile.LinkedIn}`,
    "",
  ];
  return lines.join("\n");
}
