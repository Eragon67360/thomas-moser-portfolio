import "server-only";
import { Redis } from "@upstash/redis";
import { env } from "@/config/env";

let client: Redis | undefined;

let loggedReadOnly = false;

/** Whether this run may write counters; logs once when it may not (local and preview runs). */
export function redisWritesAllowed(): boolean {
  const allowed = env.redisWritesAllowed();
  if (!allowed && !loggedReadOnly) {
    loggedReadOnly = true;
    console.warn("Redis counters are read-only outside production (set REDIS_ALLOW_WRITES=1 to write).");
  }
  return allowed;
}

export function getRedis(): Redis {
  // Upstash defaults to `cache: "no-store"`, which would force every page that
  // reads a counter into dynamic rendering. Its requests are POSTs, which Next
  // never caches, so "default" keeps reads fresh while pages can use ISR.
  client ??= new Redis({ ...env.redis(), cache: "default" });
  return client;
}
