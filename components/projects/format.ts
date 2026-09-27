import type { Project } from "@/types/project";

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

const formatMonth = (yearMonth: string) => monthYear.format(new Date(`${yearMonth}-01T00:00:00Z`));

/** "Jun 2024" or "Mar 2024 – Mar 2026". */
export function formatPeriod(period: NonNullable<Project["period"]>): string {
  const start = formatMonth(period.start);
  return period.end ? `${start} – ${formatMonth(period.end)}` : start;
}
