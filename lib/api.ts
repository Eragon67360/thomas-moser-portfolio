import "server-only";
import { NextResponse } from "next/server";

/**
 * Wraps a data loader in a JSON route handler. Failures are logged server-side
 * and surface to clients as a generic 502, never leaking upstream details.
 */
export function jsonRoute<T>(load: () => Promise<T>) {
  return async (): Promise<NextResponse> => {
    try {
      return NextResponse.json(await load());
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Upstream request failed" }, { status: 502 });
    }
  };
}
