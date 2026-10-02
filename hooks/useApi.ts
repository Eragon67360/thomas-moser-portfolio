"use client";
import useSWR from "swr";
import { fetchJson } from "@/lib/http";

/**
 * Polls one of the site's own JSON API routes. Call sites pass the interval that
 * fits their data: the routes are cached at the edge, so a poll is cheap, but a
 * widget should still not ask more often than its data can change.
 */
export function useApi<T>(path: string, refreshIntervalMs = 60_000) {
  return useSWR<T, Error>(path, (url: string) => fetchJson<T>(url), { refreshInterval: refreshIntervalMs });
}
