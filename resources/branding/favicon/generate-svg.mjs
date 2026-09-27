// Builds the TM monogram as pure vector paths (favicons cannot load web fonts).
import opentype from "opentype.js";
import { readFileSync, writeFileSync } from "node:fs";
const [fontPath, outDir] = process.argv.slice(2);
const bytes = readFileSync(fontPath);
const font = opentype.parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));

const SIZE = 512, BG = "#16181d", FG = "#ffbf00";

/** "TM" path laid out with tightened tracking, scaled so its ink box is `inkWidth` wide, centred on its ink. */
function monogram(inkWidth) {
  // Natural monospace advance: tighter tracking made the T and M touch.
  const fontSize = 100, tracking = 0;
  let x = 0; const parts = [];
  for (const ch of "TM") {
    const g = font.charToGlyph(ch);
    parts.push(g.getPath(x, 0, fontSize));
    x += (g.advanceWidth / font.unitsPerEm) * fontSize + tracking;
  }
  const path = new opentype.Path();
  parts.forEach((p) => path.extend(p));
  const bb = path.getBoundingBox();
  const s = inkWidth / (bb.x2 - bb.x1);
  const tx = SIZE / 2 - ((bb.x1 + bb.x2) / 2) * s, ty = SIZE / 2 - ((bb.y1 + bb.y2) / 2) * s;
  return `<path fill="${FG}" transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})" d="${path.toPathData(2)}"/>`;
}

const svg = (bg, glyph) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">${bg}${glyph}</svg>\n`;
// Standard icon: rounded square (browser tabs, bookmarks).
writeFileSync(`${outDir}/icon.svg`, svg(`<rect width="${SIZE}" height="${SIZE}" rx="${SIZE * 0.22}" fill="${BG}"/>`, monogram(SIZE * 0.66)));
// Full-bleed square: iOS applies its own rounded mask.
writeFileSync(`${outDir}/apple.svg`, svg(`<rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>`, monogram(SIZE * 0.6)));
// Maskable (Android adaptive icons): ink stays inside the central 80% safe circle.
writeFileSync(`${outDir}/maskable.svg`, svg(`<rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>`, monogram(SIZE * 0.5)));
console.log("ok");
