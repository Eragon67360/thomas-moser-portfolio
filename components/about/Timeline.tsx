import type { TimelineEntry } from "@/content/about";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="flex flex-col gap-8 border-l border-white/15 pl-6">
      {entries.map((entry) => (
        <li key={`${entry.organization}-${entry.period}`} className="relative">
          <span className="absolute top-1.5 -left-[1.95rem] size-3 rounded-full bg-accent" aria-hidden />
          <p className="text-sm text-muted">{entry.period}</p>
          <h3 className="text-lg font-semibold">{entry.title}</h3>
          <p className="text-muted">
            {entry.organization} · {entry.place}
          </p>
          {entry.description && <p className="mt-2 leading-relaxed">{entry.description}</p>}
        </li>
      ))}
    </ol>
  );
}
