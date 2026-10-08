import type { PostType } from "@/types/post";

/** How each kind of post is named in the blog's type menu. */
export const POST_TYPE_LABELS: Record<PostType, string> = {
  tutorial: "Tutorials",
  "build-log": "Build logs",
  "quick-lesson": "Quick lessons",
  story: "Stories",
};
