/**
 * `Cache-Control` values for the site's JSON API routes. Pure, so a script can
 * check them without a Next.js runtime.
 */

/** Errors are never shared: a 502 cached at the edge would outlive the outage. */
export const NO_STORE = "private, no-store";

/**
 * Shared caching for a successful response: the CDN serves it for `ttlSeconds`,
 * then keeps serving the stale copy for four more TTLs while it refreshes in the
 * background, so visitors never wait on Deezer or Steam and upstream traffic is
 * bounded per edge region, however many widgets poll. `max-age=0` keeps browsers
 * out of it: the widgets' own polling decides when they re-fetch.
 */
export function publicCacheControl(ttlSeconds: number): string {
  if (!Number.isInteger(ttlSeconds) || ttlSeconds <= 0) {
    throw new RangeError(`Cache TTL must be a positive integer of seconds, got ${ttlSeconds}`);
  }
  return `public, max-age=0, s-maxage=${ttlSeconds}, stale-while-revalidate=${ttlSeconds * 4}`;
}
