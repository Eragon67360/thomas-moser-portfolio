import type { MDXContent } from "mdx/types";
import { AdBanner } from "@/components/ads/AdBanner";

/** Components available to article authors inside MDX. */
const MDX_COMPONENTS = { AdBanner };

export function PostContent({ Content }: { Content: MDXContent }) {
  return (
    <div className="article-prose">
      <Content components={MDX_COMPONENTS} />
    </div>
  );
}
