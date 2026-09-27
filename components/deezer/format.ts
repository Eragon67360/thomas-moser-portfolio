const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
];

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "5 minutes ago", "yesterday", "just now". */
export function formatTimeAgo(timestampMs: number, now = Date.now()): string {
  const elapsed = Math.max(0, now - timestampMs);
  for (const [unit, size] of UNITS) {
    if (elapsed >= size) return relative.format(-Math.floor(elapsed / size), unit);
  }
  return "just now";
}
