import { Redis } from '@upstash/redis'


if (!process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL) {
  throw new Error("Missing NEXT_PUBLIC_UPSTASH_REDIS_URL");
}

if (!process.env.NEXT_PUBLIC_UPSTASH_REDIS_TOKEN) {
  throw new Error("Missing NEXT_PUBLIC_UPSTASH_REDIS_TOKEN");
}


export const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_TOKEN,
})
