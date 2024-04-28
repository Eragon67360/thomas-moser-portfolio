import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://eu1-delicate-gator-40320.upstash.io',
  token: process.env.NEXT_REDIS_TOKEN!,
})
