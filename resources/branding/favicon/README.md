# Favicon

"TM" monogram in JetBrains Mono ExtraBold, amber `#ffbf00` on `#16181d` (the site's palette).

- `generate-svg.mjs <JetBrainsMono-ExtraBold.ttf> <dir>`: writes `icon.svg` (rounded, browser tabs), `apple.svg`
  (full-bleed; iOS applies its own mask) and `maskable.svg` (letters inside Android's 80% safe zone). Glyphs are
  converted to paths because favicons cannot load web fonts. Needs `opentype.js`.
- `render.mjs <dir>`: renders the PNG sizes in Chromium and packs `favicon.ico` (16/32/48, PNG-encoded). Needs `playwright`.

Installed files: `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`, `public/icons/*` and `app/manifest.ts`.
