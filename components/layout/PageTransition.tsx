"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const CONTAINED = "mx-auto my-8 w-full max-w-7xl px-0 sm:px-6 md:my-12 md:px-24 lg:my-16 lg:px-8 xl:my-24";

/**
 * Fades each page in with a CSS animation (visible without JavaScript, unlike an
 * inline `opacity: 0` start state). Blog posts render full-bleed.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const layout = pathname.startsWith("/blog/") ? "w-full" : CONTAINED;

  return (
    <main key={pathname} className={`animate-in fade-in duration-400 ease-in-out ${layout}`}>
      {children}
    </main>
  );
}
