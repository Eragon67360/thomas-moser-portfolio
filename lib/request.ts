import type { NextRequest } from "next/server";

// `NextRequest.ip` and `.geo` were removed in Next.js 15; Vercel exposes both as headers.

export function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function getClientCountry(req: NextRequest): string | undefined {
  return req.headers.get("x-vercel-ip-country") ?? undefined;
}
