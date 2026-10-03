import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3220);
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Smoke suite against a production build (`npm run build` first): `npm run test:e2e`.
 * Chromium only; tests what visitors and crawlers see, not implementation details.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Flaky means a race: fix the test, don't retry it.
  retries: 0,
  workers: 2,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm start -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
    // Every environment shares the production Redis and the Deezer/Steam quotas. Next's env loader
    // never overrides a variable already present in `process.env` (even an empty one) and
    // `config/env.ts` treats "" as missing, so forcing these empty keeps a local `.env.local` from
    // writing production counters or burning API quota during a test run.
    env: {
      NEXT_UPSTASH_REDIS_URL: "",
      NEXT_UPSTASH_REDIS_TOKEN: "",
      NEXT_PUBLIC_UPSTASH_REDIS_URL: "",
      NEXT_PUBLIC_UPSTASH_REDIS_TOKEN: "",
      DEEZER_TOKEN: "",
      NEXT_STEAM_API_KEY: "",
      NEXT_STEAM_ID: "",
    },
  },
});
