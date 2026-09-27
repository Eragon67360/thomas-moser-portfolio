# Curefab hover video

Source of the hover preview shown on thomasmoserdev.com/projects for Curefab (www.curefab.com).
The site's repository is private, so the source lives here.

- `capture.mjs`: captures the live site and its Markets menu states into `captures/` (plus `layout.js`: element boxes and the site's teal).
- `comp.html`: the 8s, 1280x800 loop drawn from the captures (every frame is a function of time).
- `out/`: rendered `curefab.mp4` (silent H.264), its first frame, and a stills sheet.

Uses `../../kit/engine.js` and `../../kit/base.css`. From this folder:

```bash
HOVER_KIT_DIR=../../kit HOVER_KIT_DEPS=/path/to/package.json node capture.mjs
HOVER_KIT_DEPS=/path/to/package.json node ../../kit/render.mjs comp.html out/curefab
```
