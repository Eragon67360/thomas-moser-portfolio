# portfolio-hover

Source of the hover preview of Taylor's Secret Garden on thomasmoserdev.com/projects (moved here from the
Eragon67360/taylorssecretgarden repository, where it was `portfolio-hover/`).

- `capture.mjs`: captures the site, signed out, into `captures/`: the Home hero and a scroll down to the Eras
  herbarium, the Music journal on folklore then on The Life of a Showgirl (the page re-themes), a scroll through the
  Tours journal, and The Eras Tour's page. Scrolls are captured one screenshot per video frame, so on-scroll content
  and the paper textures stay as the site renders them (Tours sections use `content-visibility: auto`, so they only
  render once scrolled to).
- `comp.html`: the 8s, 1280x800 loop, drawn from the captures (every frame is a function of time). It starts and ends
  on the Home hero; the transitions are the journal's paper with its wine edge and the site's wordmark.
- `out/`: rendered `taylorssecretgarden.mp4` (silent H.264) and its first frame.

`comp.html` uses the kit (`../../kit`), which documents how to capture and render; `render.mjs` reads `HOVER_CRF`.
`captures/` and `out/` are git-ignored: regenerate them with the commands below.

## Re-rendering

Capture a local production build (or set `SITE` to a deployment), then render. The paper textures are costly to
encode, so the video is rendered at CRF 31 to stay under ~1.5 MB.

```bash
npm run build && npx next start -p 3190   # in the taylorssecretgarden repository, in another terminal
cd resources/hover-videos/projects/taylors-secret-garden
HOVER_KIT_DIR=../../kit HOVER_KIT_DEPS=<tools>/package.json node capture.mjs
HOVER_CRF=31 HOVER_KIT_DEPS=<tools>/package.json node ../../kit/render.mjs comp.html out/taylors-secret-garden
cp out/taylors-secret-garden.mp4 ../../../../public/videos/projects/
```

`<tools>` is any folder with `playwright` and `ffmpeg-static` installed (they are not site dependencies).
