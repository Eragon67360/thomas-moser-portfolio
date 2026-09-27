import type { ReactNode } from "react";

/** A titled block on the about page. */
export function AboutSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="flex w-full flex-col gap-6">
      <h2 id={`${id}-title`} className="text-2xl font-bold md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
