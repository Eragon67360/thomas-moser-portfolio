import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/** Post cards on /blog: each one is a link holding an article with an h2 title. */
const cards = (page: Page) => page.locator("main article");

test.describe("/blog filters", () => {
  test("lists every post before any filter runs", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();
    expect(total).toBeGreaterThan(0);
    await expect(page.getByText(`${total} posts`, { exact: true })).toBeVisible();
  });

  test("the type filter keeps only posts of that type", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();

    await page.getByRole("row", { name: "Tutorials" }).click();
    const tutorials = cards(page);
    await expect(page.getByText(new RegExp(`^\\d+ of ${total} posts$`))).toBeVisible();
    for (const card of await tutorials.all()) await expect(card).toContainText("Tutorial");

    await page.getByRole("row", { name: "All posts" }).click();
    await expect(cards(page)).toHaveCount(total);
  });

  test("the language filter keeps only posts in that language", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("row", { name: "Français" }).click();
    await expect(cards(page).first()).toBeVisible();
    for (const card of await cards(page).all()) await expect(card).toHaveAttribute("lang", "fr");
  });

  test("a search with no match offers to clear the filters", async ({ page }) => {
    await page.goto("/blog");
    const total = await cards(page).count();

    await page.getByRole("searchbox", { name: "Search posts" }).fill("no post is about this zzqx");
    await expect(page.getByText("No post matches your search.")).toBeVisible();
    await expect(cards(page)).toHaveCount(0);

    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect(cards(page)).toHaveCount(total);
    await expect(page.getByRole("searchbox", { name: "Search posts" })).toHaveValue("");
  });
});
