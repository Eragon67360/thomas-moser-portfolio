import "server-only";
import { Redis } from "@upstash/redis";
import { env } from "@/config/env";

let client: Redis | undefined;

export function getRedis(): Redis {
  // Upstash defaults to `cache: "no-store"`, which would force every page that
  // reads a counter into dynamic rendering. Its requests are POSTs, which Next
  // never caches, so "default" keeps reads fresh while pages can use ISR.
  client ??= new Redis({ ...env.redis(), cache: "default" });
  return client;
}
