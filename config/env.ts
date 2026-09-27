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
    // NEXT_PUBLIC_* names are legacy fallbacks; prefer the server-only names.
    url: readEnv("NEXT_UPSTASH_REDIS_URL", "NEXT_PUBLIC_UPSTASH_REDIS_URL"),
    token: readEnv("NEXT_UPSTASH_REDIS_TOKEN", "NEXT_PUBLIC_UPSTASH_REDIS_TOKEN"),
  }),
  spotify: () => ({
    clientId: readEnv("NEXT_SPOTIFY_CLIENT_ID"),
    clientSecret: readEnv("NEXT_SPOTIFY_CLIENT_SECRET"),
    refreshToken: readEnv("NEXT_SPOTIFY_REFRESH_TOKEN"),
  }),
  deezer: () => ({
    // Owner's token with `offline_access` (never expires) and `listening_history`.
    accessToken: readEnv("DEEZER_TOKEN"),
  }),
  steam: () => ({
    apiKey: readEnv("NEXT_STEAM_API_KEY"),
    steamId: readEnv("NEXT_STEAM_ID"),
  }),
};
