import "server-only";
import { NextResponse } from "next/server";
import { NO_STORE, publicCacheControl } from "@/lib/cache-control";

type JsonRouteOptions = {
  /** Seconds the CDN may serve a successful response before refreshing it. */
  ttl: number;
};

/**
 * Wraps a data loader in a JSON route handler. A successful response is shared
 * at the edge for `ttl` seconds (see `lib/cache-control.ts`); failures are
 * logged server-side, surface to clients as a generic 502 that never leaks
 * upstream details, and are never cached.
 */
export function jsonRoute<T>(load: () => Promise<T>, { ttl }: JsonRouteOptions) {
  const cacheControl = publicCacheControl(ttl);
  return async (): Promise<NextResponse> => {
    try {
      return NextResponse.json(await load(), { headers: { "Cache-Control": cacheControl } });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Upstream request failed" },
        { status: 502, headers: { "Cache-Control": NO_STORE } },
      );
    }
  };
}
