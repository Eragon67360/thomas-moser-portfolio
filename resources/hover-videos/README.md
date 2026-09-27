# Hover videos

Silent 8-second loops shown when a project card on /projects is hovered. Each project's source
(capture script, composition, captures) lives in that project's repository under `portfolio-hover/`,
or in `projects/<slug>/` here when the repository is not available. The rendered MP4 is copied to
`public/videos/projects/<slug>.mp4` and referenced by `video` in `content/projects.ts`.

## Kit (`kit/`)

- `engine.js`, `base.css`: runtime for compositions (1280x800 stage, easing, scripted cursor, typing).
  Every frame must be a pure function of time; compositions define `window.DURATION` and `window.renderAt(t)`.
- `capture.mjs`: captures real pages and interaction states at 1280x800, 1.5x density.
- `stills.mjs`: contact sheet at chosen times, to check scenes and transitions before rendering.
- `render.mjs`: renders a composition to `<name>.mp4` (silent H.264, faststart) and `<name>.jpg`.

The scripts need `playwright` and `ffmpeg-static`, which are deliberately not site dependencies.
Install them anywhere and point `HOVER_KIT_DEPS` at that folder's `package.json`:

```bash
HOVER_KIT_DEPS=/path/to/tools/package.json node render.mjs comp.html out/<slug>
```

## Rules

- Start and end on the same frame as the card screenshot, so the hover begins and loops seamlessly.
- Show the real product: captures of the live site or app, real states, no invented UI or claims.
- Use the project's own identity (colors, logo) for transitions.
