# Designer Portfolio hover video

Source of the hover preview shown on thomasmoserdev.com/projects for Cristina Andrés' portfolio
(cristinadesigns.vercel.app). The repository belongs to her, so the source lives here.

- `capture.mjs`: captures the live site into `captures/`: the Aqualung slide, its title hover, the case-study modal
  (in overlapping scroll steps, tiled back together by the composition), the close-button hover, and a burst of
  real frames of the carousel moving to the next project.
- `comp.html`: the 8s, 1280x800 loop drawn from the captures (every frame is a function of time).
- `out/`: rendered `cristina-designs.mp4` (silent H.264), its first frame, and a stills sheet.

Scrollbars are hidden during capture (the site shows a white 10px gutter). The live case study ends with a broken image ("visual 4"), so the scroll stops above it.

Uses `../../kit/engine.js` and `../../kit/base.css`. From this folder:

```bash
HOVER_KIT_DIR=../../kit HOVER_KIT_DEPS=/path/to/package.json node capture.mjs
HOVER_KIT_DEPS=/path/to/package.json node ../../kit/render.mjs comp.html out/cristina-designs
```
