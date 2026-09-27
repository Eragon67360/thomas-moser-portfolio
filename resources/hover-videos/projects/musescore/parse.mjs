// Parses the real arrangement (Dans les yeux d'Émilie.mscz, MuseScore 4 XML) into captures/score.js,
// so the composition draws notation from the actual notes. No XML dependency: a small parser suffices
// for MuseScore's well-formed output.
// Run: node parse.mjs "<path>/Dans les yeux d'Émilie.mscz"   (needs `unzip` on PATH)
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const src = process.argv[2];
const list = execFileSync("unzip", ["-Z1", src], { encoding: "utf8" }).split("\n");
const entry = list.find((f) => f.endsWith(".mscx"));
const xml = execFileSync("unzip", ["-p", src, entry], { encoding: "utf8", maxBuffer: 64 << 20 });

function parse(s) {
  const root = { name: "#root", attrs: {}, children: [], text: "" };
  const stack = [root];
  const re = /<(\/?)([A-Za-z_][\w.-]*)([^>]*?)(\/?)>|([^<]+)|<\?[^>]*\?>|<!--[\s\S]*?-->/g;
  let m;
  while ((m = re.exec(s))) {
    const top = stack[stack.length - 1];
    if (m[5] !== undefined) { top.text += m[5]; continue; }
    if (!m[2]) continue;
    if (m[1]) { stack.pop(); continue; }
    const attrs = {};
    for (const a of m[3].matchAll(/([\w-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
    const el = { name: m[2], attrs, children: [], text: "" };
    top.children.push(el);
    if (!m[4]) stack.push(el);
  }
  return root;
}
const kids = (el, n) => el.children.filter((c) => c.name === n);
const kid = (el, n) => el.children.find((c) => c.name === n);
const txt = (el, n) => { const k = el && kid(el, n); return k ? decode(k.text.trim()) : undefined; };
const decode = (s) => s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

const score = kid(kid(parse(xml), "museScore"), "Score");
const meta = Object.fromEntries(kids(score, "metaTag").map((m) => [m.attrs.name, decode(m.text.trim())]));
const DIV = Number(txt(score, "Division"));
const DUR = { whole: 4, half: 2, quarter: 1, eighth: 0.5, "16th": 0.25, "32nd": 0.125 };

const parts = kids(score, "Part").map((p) => {
  const staff = kid(p, "Staff");
  const inst = kid(p, "Instrument");
  const tr = kid(inst, "Transpose");
  return {
    staffId: staff.attrs.id,
    name: txt(inst, "longName") ?? txt(p, "trackName"),
    short: txt(inst, "shortName"),
    // Written (transposing) clef, as shown when concert pitch is off.
    clef: txt(inst, "clef") ?? txt(inst, "transposingClef") ?? txt(staff, "defaultClef") ?? "G",
    bracketSpan: Number(kid(staff, "bracket")?.attrs.span ?? 0),
    barLineSpan: Number(txt(staff, "barLineSpan") ?? 0),
    lines: Number(txt(kid(staff, "StaffType"), "lines") ?? 5),
    drums: Object.fromEntries(kids(inst, "Drum").map((d) => [d.attrs.pitch, { head: txt(d, "head"), line: Number(txt(d, "line")) }])),
    group: kid(staff, "StaffType").attrs.group,
    transposeChromatic: Number(txt(tr ?? inst, "transposeChromatic") ?? txt(inst, "transposeChromatic") ?? 0),
  };
});

// MuseScore spanner end points are relative: +measures, +fractions of a whole note from the start.
const endOf = (sp, start) => {
  const loc = kid(kid(sp, "next") ?? { children: [] }, "location");
  if (!loc) return undefined;
  return start + Number(txt(loc, "measures") ?? 0) * 4 + eval(txt(loc, "fractions") ?? "0") * 4;
};
const lenOf = (e) => {
  const type = txt(e, "durationType"), dots = Number(txt(e, "dots") ?? 0);
  return type === "measure" ? 4 : DUR[type] * (dots ? 2 - 1 / 2 ** dots : 1);
};
const CHORDLINE = { 1: "fall", 2: "doit", 3: "plop", 4: "scoop" };

const staves = {};
const spanners = {};
for (const st of kids(score, "Staff")) {
  const measures = [];
  const spans = (spanners[st.attrs.id] = []);
  let key = 0;
  kids(st, "Measure").forEach((m, mi) => {
    const events = [], dynamics = [];
    let keyChange, timeSig, tempo;
    kids(m, "voice").forEach((v, voice) => {
      let beat = 0;
      for (const e of v.children) {
        const at = mi * 4 + beat;                    // global beat (the piece is in 4/4 throughout)
        if (e.name === "KeySig") keyChange = key = Number(txt(e, "actualKey") ?? txt(e, "concertKey"));
        if (e.name === "TimeSig") timeSig = [Number(txt(e, "sigN")), Number(txt(e, "sigD"))];
        if (e.name === "Tempo") tempo = Math.round(Number(txt(e, "tempo")) * 60);
        if (e.name === "Dynamic" && txt(e, "visible") !== "0") dynamics.push({ beat, text: txt(e, "subtype") });
        if (e.name === "Spanner" && e.attrs.type === "HairPin" && kid(e, "HairPin")) {
          spans.push({ type: "hairpin", dim: txt(kid(e, "HairPin"), "subtype") === "1", voice, start: at, end: endOf(e, at) });
        }
        if (e.name !== "Chord" && e.name !== "Rest") continue;
        const len = lenOf(e);
        const ev = { voice, beat, type: txt(e, "durationType"), dots: Number(txt(e, "dots") ?? 0), len };
        if (e.name === "Chord") {
          for (const sp of kids(e, "Spanner")) if (sp.attrs.type === "Slur" && kid(sp, "Slur")) spans.push({ type: "slur", voice, start: at, end: endOf(sp, at) });
          ev.notes = kids(e, "Note").map((n) => ({
            pitch: Number(txt(n, "pitch")),
            tpc: Number(txt(n, "tpc")),
            tpc2: txt(n, "tpc2") !== undefined ? Number(txt(n, "tpc2")) : undefined,
            tie: kids(n, "Spanner").some((s) => s.attrs.type === "Tie" && kid(s, "Tie")),
            chordLine: CHORDLINE[txt(kid(n, "ChordLine") ?? { children: [] }, "subtype")],
          }));
          ev.stem = txt(e, "StemDirection");
          ev.articulation = kids(e, "Articulation").map((a) => txt(a, "subtype"));
        }
        events.push(ev);
        beat += len;
      }
    });
    measures.push({ key, keyChange, timeSig, tempo, events, dynamics });
  });
  staves[st.attrs.id] = measures;
}

const out = { meta, division: DIV, parts, staves, spanners };
writeFileSync(new URL("./captures/score.js", import.meta.url), `// Generated by parse.mjs from the real .mscz; do not edit.\nwindow.SCORE = ${JSON.stringify(out)};\n`);
for (const p of parts) {
  const ms = staves[p.staffId];
  const used = ms.map((m, i) => (m.events.some((e) => e.notes) ? i + 1 : null)).filter(Boolean);
  console.log(p.staffId, p.name, p.clef, p.transposeChromatic, "measures with notes:", used.join(","));
}
console.log(meta.workTitle, "| measures:", staves["1"].length);
