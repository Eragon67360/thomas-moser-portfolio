import "server-only";
import { getRedis, redisWritesAllowed } from "@/lib/redis";

const VIEWS_PREFIX = "pageviews:posts";
const DEDUPE_PREFIX = "deduplicate";
const DEDUPE_WINDOW_SECONDS = 24 * 60 * 60;
const DAY_MS = DEDUPE_WINDOW_SECONDS * 1000;

const viewsKey = (slug: string) => `${VIEWS_PREFIX}:${slug}`;
const saltKey = (day: string) => `${DEDUPE_PREFIX}:salt:${day}`;
const utcDay = (time: number) => new Date(time).toISOString().slice(0, 10);

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
}

/**
 * Today's and yesterday's random salts. Each lives 48 h, long enough to cover a
 * 24 h dedupe window that started the day before; once it expires, the visitor
 * hashes made with it can no longer be linked back to an IP address.
 */
async function dedupeSalts(now: number): Promise<{ today: string; yesterday: string | null }> {
  const redis = getRedis();
  const today = saltKey(utcDay(now));
  await redis.set(today, toHex(crypto.getRandomValues(new Uint8Array(32))), {
    nx: true,
    ex: 2 * DEDUPE_WINDOW_SECONDS,
  });
  // Upstash parses stored values as JSON when it can: an all-digit salt would come back as a number.
  const [todaySalt, yesterdaySalt] = await redis.mget<(string | number | null)[]>(today, saltKey(utcDay(now - DAY_MS)));
  if (todaySalt === null) throw new Error("View dedupe salt is missing");
  return { today: String(todaySalt), yesterday: yesterdaySalt === null ? null : String(yesterdaySalt) };
}

/**
 * Counts a view unless the same visitor already viewed the post in the last 24h.
 * The visitor is identified by a hash of a rotating daily salt, their IP and the
 * slug: no IP is stored, and one visitor's keys can't be linked across posts or days.
 */
export async function recordPostView(slug: string, visitorIp: string): Promise<void> {
  if (!redisWritesAllowed()) return;
  const redis = getRedis();
  const salts = await dedupeSalts(Date.now());
  const visitKey = async (salt: string) => `${DEDUPE_PREFIX}:${await sha256Hex(`${salt}:${visitorIp}:${slug}`)}`;

  // A visit late yesterday is still inside today's 24 h window.
  if (salts.yesterday && (await redis.exists(await visitKey(salts.yesterday)))) return;

  const isNewVisit = await redis.set(await visitKey(salts.today), true, { nx: true, ex: DEDUPE_WINDOW_SECONDS });
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
