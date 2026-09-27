import "server-only";
import { getRedis } from "@/lib/redis";

const VIEWS_PREFIX = "pageviews:posts";
const DEDUPE_PREFIX = "deduplicate";
const DEDUPE_WINDOW_SECONDS = 24 * 60 * 60;

const viewsKey = (slug: string) => `${VIEWS_PREFIX}:${slug}`;

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Counts a view unless the same visitor already viewed the post in the last 24h. */
export async function recordPostView(slug: string, visitorIp: string): Promise<void> {
  const redis = getRedis();
  const visitor = await sha256Hex(visitorIp);
  const isNewVisit = await redis.set(`${DEDUPE_PREFIX}:${visitor}:${slug}`, true, {
    nx: true,
    ex: DEDUPE_WINDOW_SECONDS,
  });
  if (isNewVisit) {
    await redis.incr(viewsKey(slug));
  }
}

export async function getPostViews(slug: string): Promise<number> {
  return Number(await getRedis().get(viewsKey(slug))) || 0;
}

/** All recorded post view counters, most viewed first. */
export async function getAllPostViews(): Promise<{ slug: string; views: number }[]> {
  const redis = getRedis();
  const keys = new Set<string>();
  let cursor = "0";
  do {
    const [next, batch] = await redis.scan(cursor, {
      match: `${VIEWS_PREFIX}:*`,
      count: 100,
    });
    batch.forEach((key) => keys.add(key));
    cursor = next;
  } while (cursor !== "0");

  if (keys.size === 0) return [];

  const slugs = [...keys];
  const counts = await redis.mget<(string | number | null)[]>(...slugs);
  return slugs
    .map((key, i) => ({ slug: key.slice(VIEWS_PREFIX.length + 1), views: Number(counts[i]) || 0 }))
    .toSorted((a, b) => b.views - a.views);
}
