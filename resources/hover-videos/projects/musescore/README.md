# musescore

Source of the hover preview for the MuseScore card on thomasmoserdev.com/projects. The card links to
Thomas's MuseScore profile, so there is no product to capture: the loop starts and ends on the card
screenshot (a real MuseScore Studio 4 session), pushes into its page and plays the opening of one of
his own arrangements, *Dans les yeux d'Émilie* (Joe Dassin, arr. Maxime Burkart / Thomas Moser,
orchestre d'harmonie).

- `parse.mjs`: reads the real `.mscz` (MuseScore 4 XML) and writes `captures/score.js`: title, credits,
  the 19 instruments (names, clefs, transpositions, brackets, drum map) and every bar's notes and rests.
  `node parse.mjs "<path>/Dans les yeux d'Émilie.mscz"` (needs `unzip`).
- `comp.html`: the 8s, 1280x800 loop. The notation (bars 1-4, written pitch as in a transposing score,
  146 bpm from the score's tempo marking) is drawn as SVG from `score.js`; the playback cursor and the
  blue highlight of sounding notes follow the parsed durations. Styling follows the score's own
  `score_style.mss` (A4, spatium 1.4mm, staff distance 6.5sp).
- `captures/card.png`: the card screenshot (frame 0 and the last frame). `captures/fonts/`: Noto Music,
  Noto Serif and Inter (OFL), stored locally so rendering needs no network.
- `out/`: rendered `musescore.mp4` and its first frame.

Engraving is simplified: fixed four-bar system, horizontal beams, drawn flags and flats, no hairpins
or slurs (none occur in bars 1-4), dynamics placed under each staff at their parsed beat.

Render from this folder:

```bash
HOVER_KIT_DEPS=/path/to/package.json node ../../kit/stills.mjs comp.html stills.png 0 1.3 3.5 6.3 7.2 7.99
HOVER_KIT_DEPS=/path/to/package.json node ../../kit/render.mjs comp.html out/musescore
```
