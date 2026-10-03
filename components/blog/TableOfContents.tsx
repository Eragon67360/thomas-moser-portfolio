"use client";
import { useMemo } from "react";
import { useActiveHeading } from "@/hooks/useActiveHeading";
import type { TocHeading } from "@/types/post";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const ids = useMemo(() => headings.map(({ id }) => id), [headings]);
  const [activeId, setActiveId] = useActiveHeading(ids);
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm"
    >
      <p className="px-4 py-3 font-medium">Table of Contents</p>
      <hr className="border-white/15" />
      <ul className="flex flex-col gap-1 p-4">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${id}`}
              onClick={() => setActiveId(id)}
              className={`text-sm hover:text-accent ${
                activeId === id ? "text-accent" : level === 2 ? "text-foreground" : "text-muted"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
