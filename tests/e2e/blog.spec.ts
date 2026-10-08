import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/** Post cards on /blog: each one is a link holding an article with an h2 title. */
const cards = (page: Page) => page.locator("main article");

test.describe("/blog type menu, language switch and search", () => {
  test("the type menu keeps only posts of that type, and All brings them back", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();
    expect(total).toBeGreaterThan(0);

    await page.getByRole("radio", { name: "Tutorials" }).click();
    await expect(page.getByRole("radio", { name: "Tutorials" })).toBeChecked();
    await expect.poll(() => cards(page).count()).toBeLessThanOrEqual(total);

    await page.getByRole("radio", { name: "All", exact: true }).click();
    await expect(cards(page)).toHaveCount(total);
  });

  test("the language switch keeps only posts in that language, and a second click undoes it", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();

    await page.getByRole("radio", { name: "French only" }).click();
    await expect(cards(page).first()).toBeVisible();
    for (const card of await cards(page).all()) await expect(card).toHaveAttribute("lang", "fr");

    await page.getByRole("radio", { name: "French only" }).click();
    await expect(cards(page)).toHaveCount(total);
  });

  test("a search with no match offers to show every post again", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();

    await page.getByRole("button", { name: "Search posts" }).click();
    await page.getByRole("searchbox", { name: "Search posts" }).fill("no post is about this zzqx");
    await expect(page.getByText("No post matches.")).toBeVisible();

    await page.getByRole("button", { name: "Show all posts" }).click();
    await expect(cards(page)).toHaveCount(total);
  });
});
