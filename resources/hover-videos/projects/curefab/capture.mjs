// Captures the real Curefab site (www.curefab.com) for the portfolio hover video.
// Run: HOVER_KIT_DIR=<portfolio>/resources/hover-videos/kit HOVER_KIT_DEPS=<deps>/package.json node capture.mjs
import { writeFileSync } from "node:fs";
const { openBrowser, warmUp, shoot, box } = await import(`${process.env.HOVER_KIT_DIR}/capture.mjs`);

const dir = new URL("./captures", import.meta.url).pathname;
const SITE = "https://www.curefab.com";
const { browser, page } = await openBrowser();
const layout = {};

// Home at the top (the card screenshot), plus the full page for the scroll beat.
await page.goto(SITE, { waitUntil: "networkidle" });
await warmUp(page);
await shoot(page, dir, "home");

// Markets menu: hover state, opened submenu, hovered "Medtech" entry.
const markets = 'a:has-text("MARKETS")';
layout.markets = await box(page, markets);
await page.hover(markets);
await page.waitForTimeout(700);
await shoot(page, dir, "markets-hover", { full: false });
await page.click(markets);
await page.waitForTimeout(1200);
await shoot(page, dir, "markets-open", { full: false });
const medtech = '.submenu a[href*="/services-2/medtech"]';
layout.medtech = await box(page, medtech);
await page.hover(medtech);
await page.waitForTimeout(700);
await shoot(page, dir, "markets-medtech", { full: false });

// The Medtech market page, full length.
await page.goto(`${SITE}/services-2/medtech`, { waitUntil: "networkidle" });
await warmUp(page);
await shoot(page, dir, "medtech");

// Brand colours, read from the page rather than guessed.
await page.goto(SITE, { waitUntil: "networkidle" });
layout.teal = await page.evaluate(() => {
  const el = [...document.querySelectorAll("div, section")].find((e) => /Bring your ideas/.test(e.innerText) && getComputedStyle(e).backgroundColor !== "rgba(0, 0, 0, 0)");
  return el && getComputedStyle(el).backgroundColor;
});

// A script, not JSON: compositions are opened from file://, where fetch() is blocked.
writeFileSync(`${dir}/layout.js`, `window.LAYOUT = ${JSON.stringify(layout, null, 2)};\n`);
console.log(layout);
await browser.close();
