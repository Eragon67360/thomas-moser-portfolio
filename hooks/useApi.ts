"use client";
import useSWR from "swr";
import { fetchJson } from "@/lib/http";

/** Polls one of the site's own JSON API routes. */
export function useApi<T>(path: string, refreshInterval = 20_000) {
  return useSWR<T, Error>(path, (url: string) => fetchJson<T>(url), { refreshInterval });
}
