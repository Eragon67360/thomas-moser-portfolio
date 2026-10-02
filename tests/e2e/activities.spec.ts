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

  // The footer's "last played" card also settles (it says nothing was played rather than erroring).
  await expect(page.getByText("Nothing played recently")).toBeVisible();
  await expect(page.locator("main .skeleton, footer .skeleton")).toHaveCount(0);
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
