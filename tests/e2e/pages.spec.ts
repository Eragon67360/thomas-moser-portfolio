import { CANONICAL_ORIGIN, SPLINE_SCENE, expect, test } from "./fixtures";

/** The pages a visitor can reach from the navigation, plus one post per language. */
const PAGES: { path: string; lang?: "fr" }[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/projects" },
  { path: "/blog" },
  { path: "/blog/connect-deezer-api-to-nextjs" },
  // `<html lang>` stays "en" site-wide; a French post marks its own region with `lang="fr"`.
  { path: "/blog/fr-connect-deezer-api-to-nextjs", lang: "fr" },
  { path: "/activities" },
  { path: "/privacy" },
  { path: "/legal" },
];

for (const { path, lang } of PAGES) {
  test.describe(path, () => {
    test("renders one h1, English html lang, canonical on www and valid JSON-LD", async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      if (lang) await expect(page.locator(`[lang="${lang}"]`).getByRole("heading", { level: 1 })).toHaveCount(1);

      // Next serialises the root canonical without a trailing slash.
      const canonical = path === "/" ? CANONICAL_ORIGIN : `${CANONICAL_ORIGIN}${path}`;
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);

      const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(jsonLd.length).toBeGreaterThan(0);
      for (const text of jsonLd) expect(() => JSON.parse(text)).not.toThrow();
    });

    test("contacts no origin outside the allowlist", async ({ page, unexpectedOrigins }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      expect(unexpectedOrigins()).toEqual([]);
    });

    test.describe("at 390px", () => {
      test.use({ viewport: { width: 390, height: 844 } });

      test("has no horizontal scroll", async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(390);
      });
    });
  });
}

test("the page survives a Spline outage", async ({ page }) => {
  // The scene mounts once the button has become visible on a hover-capable desktop; a failed
  // load must leave the plain button, not Next's error screen (#25).
  await page.route(SPLINE_SCENE, (route) => route.abort("failed"));
  await page.goto("/about");
  const sceneRequest = page.waitForRequest(SPLINE_SCENE);
  await page.mouse.wheel(0, 600);
  await sceneRequest;
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About me");
  await expect(page.getByRole("button", { name: "Scroll to top" })).toBeVisible();
});

/** Unknown URLs, and `notFound()` from a route with its own `generateMetadata` (an unknown post slug). */
for (const path of ["/this-page-does-not-exist", "/blog/this-post-does-not-exist"]) {
  test(`${path} answers 404 inside the layout, noindex, without canonical`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
    await expect(page.getByRole("banner").getByRole("navigation")).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" }).first()).toBeVisible();

    await expect(page).toHaveTitle(/Page not found/);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    for (const text of await page.locator('script[type="application/ld+json"]').allTextContents()) {
      expect(() => JSON.parse(text)).not.toThrow();
    }
  });
}
