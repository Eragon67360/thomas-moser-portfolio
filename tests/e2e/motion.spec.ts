import { SPLINE_SCENE, expect, test } from "./fixtures";

/** Motion and pointer guards: the signature touches stay, but only where they help (#25, #26, #36). */

test.describe("skip link", () => {
  test("is first in the tab order and moves focus to the content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#content")).toBeFocused();
  });
});

test.describe("scroll-to-top button", () => {
  test("stays out of the tab order while hidden, and loads no scene before scrolling", async ({ page }) => {
    const sceneRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".splinecode")) sceneRequests.push(request.url());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(sceneRequests).toEqual([]);

    // Hidden means out of the accessibility tree too (`aria-hidden`, `inert`).
    await expect(page.getByRole("button", { name: "Scroll to top" })).toHaveCount(0);

    // Tabbing down the page scrolls it, which rightly reveals the button: it may take focus only then.
    for (let i = 0; i < 60; i++) {
      await page.keyboard.press("Tab");
      const { onButton, scrollY, atBody } = await page.evaluate(() => ({
        onButton: document.activeElement?.getAttribute("aria-label") === "Scroll to top",
        scrollY: window.scrollY,
        atBody: document.activeElement === document.body,
      }));
      if (onButton) expect(scrollY).toBeGreaterThan(100);
      if (atBody) break;
    }
  });

  test("appears after scrolling on a desktop, with the scene", async ({ page }) => {
    await page.goto("/about");
    const sceneRequest = page.waitForRequest(SPLINE_SCENE);
    await page.mouse.wheel(0, 600);
    await sceneRequest;
    await expect(page.getByRole("button", { name: "Scroll to top" })).toBeVisible();
  });

  test.describe("at 390px on touch", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

    test("requests no scene, even after scrolling", async ({ page }) => {
      const sceneRequests: string[] = [];
      page.on("request", (request) => {
        if (request.url().endsWith(".splinecode")) sceneRequests.push(request.url());
      });
      await page.goto("/about");
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(1500);
      expect(sceneRequests).toEqual([]);
      // The custom cursor never hides the system cursor on touch.
      expect(await page.evaluate(() => getComputedStyle(document.body).cursor)).toBe("auto");
    });
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("disables the page fade, smooth scrolling, the custom cursor, the progress bar and the scene", async ({
    page,
  }) => {
    const sceneRequests: string[] = [];
    page.on("request", (request) => {
      if (request.url().endsWith(".splinecode")) sceneRequests.push(request.url());
    });
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const state = await page.evaluate(() => ({
      mainAnimation: getComputedStyle(document.querySelector("main")!).animationName,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      bodyCursor: getComputedStyle(document.body).cursor,
      progressBars: document.querySelectorAll(".bprogress").length,
    }));
    expect(state).toEqual({ mainAnimation: "none", scrollBehavior: "auto", bodyCursor: "auto", progressBars: 0 });

    await page.mouse.wheel(0, 600);
    await expect(page.getByRole("button", { name: "Scroll to top" })).toBeVisible();
    await page.waitForTimeout(1000);
    expect(sceneRequests).toEqual([]);
  });
});

test.describe("desktop with a mouse", () => {
  test("keeps the custom cursor and the page fade", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    const state = await page.evaluate(() => ({
      mainAnimation: getComputedStyle(document.querySelector("main")!).animationName,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      bodyCursor: getComputedStyle(document.body).cursor,
    }));
    expect(state).toEqual({ mainAnimation: "enter", scrollBehavior: "smooth", bodyCursor: "none" });
  });
});
