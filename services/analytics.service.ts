import "server-only";
import { getRedis } from "@/lib/redis";

const RETENTION_SECONDS = 7 * 24 * 60 * 60;

/** `dd/MM/yyyy` in UTC — matches the key format of already-stored events. */
function dayKey(date = new Date()): string {
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getUTCFullYear()}`;
}

/** Increments a per-day counter for `event`, kept for one week. */
export async function trackEvent(namespace: string, event: Record<string, unknown>): Promise<void> {
  const redis = getRedis();
  const key = `analytics::${namespace}::${dayKey()}`;
  await redis.hincrby(key, JSON.stringify(event), 1);
  await redis.expire(key, RETENTION_SECONDS);
}
