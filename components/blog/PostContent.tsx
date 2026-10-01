import type { MDXContent } from "mdx/types";

export function PostContent({ Content }: { Content: MDXContent }) {
  return (
    <div className="article-prose">
      <Content />
    </div>
  );
}
