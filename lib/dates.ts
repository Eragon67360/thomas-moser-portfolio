import type { PostLang } from "@/types/post";

const LOCALES: Record<PostLang, string> = { en: "en-US", fr: "fr-FR" };

/** "Apr 29, 2024" / "29 avr. 2024" from an ISO date, independent of the server's time zone. */
export function formatPostDate(iso: string, lang: PostLang): string {
  return new Intl.DateTimeFormat(LOCALES[lang], { dateStyle: "medium", timeZone: "UTC" }).format(new Date(iso));
}
