// Capture helpers for hover videos: real pages and interaction states at the video
// viewport (1280x800) and 1.5x density, so zoomed-in shots stay sharp.
import { createRequire } from "node:module";

const require = createRequire(process.env.HOVER_KIT_DEPS ?? import.meta.url);
const { chromium } = require("playwright");

export async function openBrowser({ width = 1280, height = 800, scale = 1.5, mobile = false } = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    isMobile: mobile,
    hasTouch: mobile,
  });
  return { browser, page: await context.newPage() };
}

/**
 * Scroll the whole page so lazy and on-scroll content renders, then return to the top.
 * Scrolls are instant: sites with `scroll-behavior: smooth` would still be animating otherwise.
 */
export async function warmUp(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(800);
}

/** Viewport and full-page captures of the current page state. */
export async function shoot(page, dir, name, { full = true } = {}) {
  await page.screenshot({ path: `${dir}/${name}.png` });
  if (full) await page.screenshot({ path: `${dir}/${name}-full.png`, fullPage: true });
}

/** Bounding box of an element in CSS pixels, for placing the cursor in the composition. */
export async function box(page, selector) {
  const b = await page.locator(selector).first().boundingBox();
  return b && { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
}
