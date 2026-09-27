export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
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
