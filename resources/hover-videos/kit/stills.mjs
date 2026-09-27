// Contact sheet of a composition at given times, to review scenes and transitions before rendering.
// Usage: HOVER_KIT_DEPS=/path/to/package.json node stills.mjs <comp.html> <sheet.png> 0 1.2 2.5 ...
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";

const require = createRequire(process.env.HOVER_KIT_DEPS ?? import.meta.url);
const { chromium } = require("playwright");

const [comp, out, ...times] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(pathToFileURL(path.resolve(comp)).href);
await page.evaluate(() => window.ready);
await page.waitForFunction(() => typeof window.renderAt === "function");

const shots = [];
for (const t of times.map(Number)) {
  await page.evaluate((tt) => window.renderAt(tt), t);
  shots.push({ t, data: (await page.screenshot({ type: "jpeg", quality: 70 })).toString("base64") });
}
const sheet = await browser.newPage({ viewport: { width: 1300, height: 800 } });
await sheet.setContent(
  `<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(3,420px);gap:8px;padding:8px;font:14px sans-serif;color:#fff">` +
    shots.map((s) => `<figure style="margin:0"><img style="width:420px;display:block" src="data:image/jpeg;base64,${s.data}"><figcaption>t=${s.t}s</figcaption></figure>`).join("") +
    "</body>",
);
await sheet.screenshot({ path: out, fullPage: true });
await browser.close();
