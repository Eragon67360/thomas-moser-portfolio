export type PostLang = "en" | "fr";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** Publication date, ISO "YYYY-MM-DD". */
  date: string;
  /** Last substantial revision, ISO "YYYY-MM-DD". */
  updated?: string;
  lang: PostLang;
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
