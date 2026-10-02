import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { getClientCountry } from "@/lib/request";
import { trackEvent } from "@/services/analytics.service";

/** Counts home page views per country without delaying the response. */
export function proxy(req: NextRequest, event: NextFetchEvent) {
  if (req.method !== "GET") return NextResponse.next();
  event.waitUntil(
    trackEvent("pageview", { page: "/", country: getClientCountry(req) }).catch((error: unknown) =>
      console.error(error),
    ),
  );
  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/",
      // Only browser page loads count (no curl, HEAD probes or most bots), and every page links
      // to "/", so router prefetches are skipped too.
      has: [{ type: "header", key: "sec-fetch-dest", value: "document" }],
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-router-segment-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
