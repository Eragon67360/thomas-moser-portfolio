import "server-only";

/**
 * Server-side environment access. Variables are read lazily so that a missing
 * secret only fails the feature that needs it, not the whole build.
 */
function readEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing environment variable: ${names.join(" or ")}`);
}

export const env = {
  redis: () => ({
    url: readEnv("NEXT_UPSTASH_REDIS_URL"),
    token: readEnv("NEXT_UPSTASH_REDIS_TOKEN"),
  }),
  /**
   * Every Vercel environment shares the production database, so only production writes counters,
   * unless a run opts in with REDIS_ALLOW_WRITES=1. Reads work everywhere.
   */
  redisWritesAllowed: () => process.env.VERCEL_ENV === "production" || process.env.REDIS_ALLOW_WRITES === "1",
  deezer: () => ({
    // Owner's token with `offline_access` (never expires) and `listening_history`.
    accessToken: readEnv("DEEZER_TOKEN"),
  }),
  steam: () => ({
    apiKey: readEnv("NEXT_STEAM_API_KEY"),
    steamId: readEnv("NEXT_STEAM_ID"),
  }),
};
