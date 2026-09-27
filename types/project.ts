export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Who it was built for or in what setting, e.g. "Built for a friend". */
  context?: string;
  stack: string[];
  credits: { designedBy?: string[]; developedBy: string[] };
  /** Year-month ("2024-06") taken from the repository history. */
  period?: { start: string; end?: string };
  links: { live?: string; repo?: string };
  /** Cloudinary id relative to the projects folder; omitted when no screenshot exists. */
  screenshot?: string;
  /** Silent looping preview shown on hover, under public/videos/projects/. */
  video?: string;
  featured?: boolean;
};
