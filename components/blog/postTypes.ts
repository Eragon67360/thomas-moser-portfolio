import type { PostType } from "@/types/post";

/** How each kind of post is named on its card (singular) and in the blog filter (plural). */
export const POST_TYPE_LABELS: Record<PostType, { one: string; many: string }> = {
  tutorial: { one: "Tutorial", many: "Tutorials" },
  "build-log": { one: "Build log", many: "Build logs" },
  "quick-lesson": { one: "Quick lesson", many: "Quick lessons" },
  story: { one: "Story", many: "Stories" },
};
