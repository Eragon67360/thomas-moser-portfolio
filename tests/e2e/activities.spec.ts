import { expect, test } from "./fixtures";

/**
 * The suite runs without Deezer or Steam credentials (see `webServer.env` in playwright.config.ts),
 * so every widget must settle on its error message instead of an endless skeleton.
 */
test("activity widgets end in an error message, not a skeleton, without credentials", async ({ page }) => {
  await page.goto("/activities");

  for (const message of [
    "Could not load the Steam profile.",
    "Could not load recently played games.",
    "Could not load top artists.",
    "Could not load top tracks.",
    "Could not load recently played tracks.",
  ]) {
    await expect(page.getByText(message)).toBeVisible();
  }

  // The footer's "last played" card settles on its own error message.
  await expect(page.getByText("Could not load the last played track.")).toBeVisible();
  // Error messages keep a hidden copy of their skeleton for its size; none may stay visible.
  await expect(page.locator("main .skeleton:visible, footer .skeleton:visible")).toHaveCount(0);
});

test("the page does not jump when the widgets fail (CLS < 0.1)", async ({ page }) => {
  // Hold the API answers so the skeletons paint first, as on a slow network; headless Chromium only
  // scores layout shifts on painted frames, so a rAF loop keeps it rendering.
  await page.route("**/api/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.continue();
  });
  await page.addInitScript(() => {
    type LayoutShift = PerformanceEntry & { value: number; hadRecentInput: boolean };
    let cls = 0;
    new PerformanceObserver((list) => {
      const shifts = list.getEntries().filter((entry): entry is LayoutShift => entry.entryType === "layout-shift");
      for (const entry of shifts) {
        if (!entry.hadRecentInput) cls += entry.value;
        document.documentElement.dataset["cls"] = cls.toFixed(4);
      }
    }).observe({ type: "layout-shift", buffered: true });
    requestAnimationFrame(function keepPainting() {
      requestAnimationFrame(keepPainting);
    });
  });

  await page.goto("/activities");
  await expect(page.getByText("Could not load recently played tracks.")).toBeVisible();
  await page.waitForTimeout(1000);
  expect(Number((await page.locator("html").getAttribute("data-cls")) ?? 0)).toBeLessThan(0.1);
});

test("activity API routes answer a generic 502 without credentials", async ({ request }) => {
  for (const path of [
    "/api/deezer/recently-played",
    "/api/deezer/top-artists",
    "/api/deezer/top-tracks",
    "/api/steam/games",
    "/api/steam/player",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(502);
    expect(await response.json(), path).toEqual({ error: "Upstream request failed" });
  }
});
