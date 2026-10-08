export type PostLang = "en" | "fr";

/** The four kinds of post in the weekly rotation, in display order. */
export const POST_TYPES = ["tutorial", "build-log", "quick-lesson", "story"] as const;

export type PostType = (typeof POST_TYPES)[number];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** Publication date, ISO "YYYY-MM-DD". */
  date: string;
  /** Last substantial revision, ISO "YYYY-MM-DD". */
  updated?: string;
  lang: PostLang;
  type: PostType;
  /** Slug of the same article in the other language. */
  translation?: string;
  tags: string[];
  /** Estimated reading time in minutes, from frontmatter. */
  duration?: number;
};

export type Post = PostMeta & {
  /** Raw MDX body without frontmatter. */
  body: string;
};

export type PostWithViews = PostMeta & { views: number };

export type TocHeading = { id: string; text: string; level: 2 | 3 };
