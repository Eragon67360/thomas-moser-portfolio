import "server-only";
import { evaluate } from "@mdx-js/mdx";
import type { Element, ElementContent, Root } from "hast";
import type { MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { TocHeading } from "@/types/post";

export type CompiledMdx = { Content: MDXContent; headings: TocHeading[] };

const textOf = (node: ElementContent): string =>
  node.type === "text" ? node.value : "children" in node ? node.children.map(textOf).join("") : "";

function findHeadings(node: Root | Element, into: TocHeading[]): void {
  for (const child of node.children) {
    if (child.type !== "element") continue;
    const level = child.tagName === "h2" ? 2 : child.tagName === "h3" ? 3 : null;
    const id = child.properties.id;
    if (level && typeof id === "string") {
      into.push({ id, level, text: child.children.map(textOf).join("").trim() });
    } else {
      findHeadings(child, into);
    }
  }
}

/** Rehype plugin: records h2/h3 headings (after rehype-slug has assigned ids). */
function collectHeadings(into: TocHeading[]) {
  return () => (tree: Root) => findHeadings(tree, into);
}

/** Compiles an MDX string (without frontmatter) into a component and its outline. */
export async function compileMdx(source: string): Promise<CompiledMdx> {
  const headings: TocHeading[] = [];
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      collectHeadings(headings),
      rehypeAutolinkHeadings,
      rehypeCodeTitles,
      rehypePrism,
      rehypeAccessibleEmojis,
    ],
  });
  return { Content, headings };
}
