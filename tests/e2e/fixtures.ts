import { test as base } from "@playwright/test";

/** Canonical host: every `<link rel="canonical">` points here. */
export const CANONICAL_ORIGIN = "https://www.thomasmoserdev.com";

/** The scroll-to-top button's 3D scene, the one third party every page loads (230 KB). */
export const SPLINE_SCENE = "https://prod.spline.design/**";

/**
 * Origins a page may contact besides the site itself (always allowed, so a scene served from
 * `/spline/…` on the site needs no entry). Anything else is a regression.
 * Spline is fetched for real: a stubbed or failed scene currently takes the whole page down
 * (see the fixme in pages.spec.ts), so stubbing it would turn every test red.
 */
const ALLOWED_ORIGINS = new Set([
  "https://prod.spline.design",
  // Vercel Analytics (same-origin `/_vercel/insights` in production, these in debug mode).
  "https://va.vercel-scripts.com",
  "https://vitals.vercel-insights.com",
  // Giscus comments, only when the public Giscus ids were inlined into the build.
  "https://giscus.app",
  "https://avatars.githubusercontent.com",
  "https://github.com",
]);

type Fixtures = {
  /** Origins the page contacted that are neither the site nor allowlisted. */
  unexpectedOrigins: () => string[];
};

export const test = base.extend<Fixtures>({
  // Playwright calls the second argument `use`; it is named `provide` here because the React
  // Hooks lint rule treats any `use(...)` call outside a component as a misplaced hook.
  unexpectedOrigins: async ({ page, baseURL }, provide) => {
    const self = new URL(baseURL ?? "http://localhost").origin;
    const seen = new Set<string>();
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (url.protocol.startsWith("http") && url.origin !== self) seen.add(url.origin);
    });
    await provide(() => [...seen].filter((origin) => !ALLOWED_ORIGINS.has(origin)).toSorted());
  },
});

export { expect } from "@playwright/test";
