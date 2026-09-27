"use client";
import { useEffect, useState } from "react";

/** Tracks which of the given heading ids is currently on screen. */
export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0% -35% 0%" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return [activeId, setActiveId] as const;
}
