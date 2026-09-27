// Captures Cristina Andrés' portfolio (cristinadesigns.vercel.app) for the hover video.
// Run: HOVER_KIT_DIR=<portfolio>/resources/hover-videos/kit HOVER_KIT_DEPS=<deps>/package.json node capture.mjs
import { writeFileSync } from "node:fs";
const { openBrowser, warmUp, shoot, box } = await import(`${process.env.HOVER_KIT_DIR}/capture.mjs`);

const dir = new URL("./captures", import.meta.url).pathname;
const SITE = "https://cristinadesigns.vercel.app";
const { browser, page } = await openBrowser();
const layout = {};

// The site shows a 10px white scrollbar gutter on the right edge; hide scrollbars so frame edges are clean.
await page.addInitScript(() => {
  const css = "*::-webkit-scrollbar{display:none!important} *{scrollbar-width:none!important}";
  document.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  });
});

// Home: the "Aqualung" slide of the work carousel (the card screenshot). The title letters
// animate in on load, so give them time to settle.
await page.goto(SITE, { waitUntil: "networkidle" });
await warmUp(page);
await page.mouse.move(1270, 790);
await page.waitForTimeout(2500);
await shoot(page, dir, "home", { full: false });

// Hovering the project title turns it pink; clicking it opens the case study.
const title = '[class*="font-bodoni"][class*="cursor-pointer"]';
layout.title = await box(page, title);
await page.hover(title);
await page.waitForTimeout(600);
await shoot(page, dir, "home-hover", { full: false });
await page.click(title);
await page.waitForTimeout(3500);

// Case study modal: the frame (backdrop, modal top, close button) and its whole scrolling content.
const scroller = 'div[class*="max-h-[90dvh]"][class*="overflow-y-auto"]';
await page.evaluate(async (sel) => {
  const el = document.querySelector(sel);
  for (let y = 0; y < el.scrollHeight; y += 400) { el.scrollTop = y; await new Promise((r) => setTimeout(r, 150)); }
  el.scrollTop = 0;
}, scroller);
await page.waitForTimeout(800);
await page.mouse.move(1270, 790);
await shoot(page, dir, "modal", { full: false });
layout.modal = await box(page, scroller);
layout.modalScroll = await page.evaluate((sel) => document.querySelector(sel).scrollHeight, scroller);
const close = 'button[aria-label="Close project"]';
layout.close = await box(page, close);
await page.hover(close);
await page.waitForTimeout(500);
await shoot(page, dir, "modal-close-hover", { full: false });
// Photograph the scrolling content in overlapping viewport steps; the composition tiles them back
// into one continuous column (an element screenshot of the unclamped scroller loses lazy images).
await page.mouse.move(1270, 790);
layout.pieces = [];
const maxScroll = layout.modalScroll - layout.modal.h;
for (let s = 0; ; s = Math.min(s + 700, maxScroll)) {
  await page.evaluate(([sel, y]) => { document.querySelector(sel).scrollTop = y; }, [scroller, s]);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${dir}/case-${s}.png` });
  layout.pieces.push(s);
  if (s === maxScroll) break;
}
await page.evaluate((sel) => { document.querySelector(sel).scrollTop = 0; }, scroller);
await page.waitForTimeout(300);
await page.click(close).catch(() => {});

// Carousel: one wheel step moves from Aqualung to the next project (Curefab). Record the real
// transition as a burst of frames, then the settled slide.
await page.goto(SITE, { waitUntil: "networkidle" });
await page.mouse.move(1000, 640);
await page.waitForTimeout(2500);
await page.mouse.wheel(0, 400);
for (let i = 0; i < 10; i++) {
  await page.screenshot({ path: `${dir}/next-${i}.png` });
  await page.waitForTimeout(60);
}
await page.waitForTimeout(2000);
await shoot(page, dir, "next", { full: false });

writeFileSync(`${dir}/layout.js`, `window.LAYOUT = ${JSON.stringify(layout, null, 2)};\n`);
console.log(layout);
await browser.close();
