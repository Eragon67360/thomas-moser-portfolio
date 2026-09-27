import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const dir = process.argv[2];
const jobs = [
  ["icon.svg", 16, "icon-16.png"], ["icon.svg", 32, "icon-32.png"], ["icon.svg", 48, "icon-48.png"],
  ["icon.svg", 192, "icon-192.png"], ["icon.svg", 512, "icon-512.png"],
  ["apple.svg", 180, "apple-icon.png"], ["maskable.svg", 512, "icon-maskable-512.png"],
];
const b = await chromium.launch();
for (const [src, size, out] of jobs) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  const data = `data:image/svg+xml;base64,${readFileSync(`${dir}/${src}`).toString("base64")}`;
  await p.setContent(`<body style="margin:0;background:transparent"><img src="${data}" style="width:${size}px;height:${size}px;display:block"></body>`);
  await p.screenshot({ path: `${dir}/${out}`, omitBackground: true });
  await p.close();
}
await b.close();

// ICO container with PNG-encoded entries (supported by all current browsers and Windows Vista+).
const entries = [16, 32, 48].map((s) => ({ s, png: readFileSync(`${dir}/icon-${s}.png`) }));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = 6 + 16 * entries.length;
const dirs = entries.map(({ s, png }) => {
  const d = Buffer.alloc(16);
  d.writeUInt8(s, 0); d.writeUInt8(s, 1); d.writeUInt8(0, 2); d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(png.length, 8); d.writeUInt32LE(offset, 12);
  offset += png.length; return d;
});
writeFileSync(`${dir}/favicon.ico`, Buffer.concat([header, ...dirs, ...entries.map((e) => e.png)]));
console.log("rendered");
