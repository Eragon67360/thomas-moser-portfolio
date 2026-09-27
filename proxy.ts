import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { getClientCountry } from "@/lib/request";
import { trackEvent } from "@/services/analytics.service";

/** Counts home page views per country without delaying the response. */
export function proxy(req: NextRequest, event: NextFetchEvent) {
  event.waitUntil(
    trackEvent("pageview", { page: "/", country: getClientCountry(req) }).catch((error: unknown) =>
      console.error(error),
    ),
  );
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
