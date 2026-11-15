import { expect, test } from "./fixtures";

test.describe("/", () => {
  test("shows at most four post cards, one per article, and links to the whole blog", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section", { has: page.locator("#home-posts") });
    const cards = section.locator('a[href^="/blog/"]');

    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(4);
    // A French post and its English original never share the home page.
    const hrefs = await cards.evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
    const articles = new Set(hrefs.map((href) => href.replace(/^\/blog\/fr-/, "/blog/")));
    expect(articles.size).toBe(count);

    await section.getByRole("link", { name: "All posts" }).click();
    await expect(page).toHaveURL(/\/blog$/);
  });
});
