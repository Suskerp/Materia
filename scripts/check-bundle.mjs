import { readdir, readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const dist = new URL("../dist/", import.meta.url);
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

// History of the single-file budget, kept for context: 1_050_000 / 260_000,
// raised for the expressive media family (0.72.0; material-color-utilities
// alone is ~127 KB raw / ~23 KB gzip and must not be replaced), the composable
// media parts (0.74.0, ~300 KB gzip), editor i18n with a Dutch twin plus the
// card list / panels / power-row editors (0.75, ~329 KB gzip), and the schedule
// editor without YAML (~336 KB gzip): last 1_380_000 / 345_000.
//
// The visual editors (and their editor-only strings) now load lazily from
// materia-editors-<hash>.js, so a dashboard that is only viewed downloads the
// main bundle alone. The main budget is what every page load pays; it sits
// just above the main bundle at the split (~1.05 MB raw / ~261 KB gzip).
const limits = {
  // 0.76.11: +1 KB for the attention carousel's "Later" and the shared drag helper (last 1_065_000 / 264_000).
  // and +1 KB for its put-off copy (mode: later, shared rules, live sync).
  // and +1 KB for its rules' "for at least N minutes".
  // 0.76.12: +1 KB for the attention heading and the vacuum's "due now / 3 h left".
  // 0.76.14: +1 KB for the attention detail that names what triggered a rule.
  // 0.76.17: +1.5 KB for the attention editor previewing the open rule (and its vacuum sample).
  // 0.77.0: +61 KB / +16 KB gzip for the weekly scheduler card (overview, group,
  // period/copy/preset/plan sheets) and +7 KB for its editor (last 1_071_500 / 267_000, 320_000 / 76_000).
  // and +2 KB for switching days on the overview and the group page.
  // and +6 KB for the button group's touch selection spring, equal widths and the scheduler's M3 motion.
  // and +1.5 KB for the Tabs card's selected tab, primary preset and secondary variant.
  // and +1.5 KB for the fix pack (picker examples, matching days, focus return, motion fixes).
  // and +10 KB for drag-to-edit on the day bar, swipe-to-close, the period growing into its sheet, ±15 min and Undo.
  // and +15 KB / +3 KB gzip for the motion audit fixes (shared press controller, pressed states, tokenised curves).
  // and +7.5 KB / +2.5 KB gzip for how long a manual change holds on a RoomMind room (climate panel).
  // 0.79.0: +5.5 KB / +1.5 KB gzip for a dehumidifier's water tank between the climate panel's + and − and the dial ring's tap-on-lift (last 1_181_000 / 295_000).
  // 0.80.0: +2.5 KB / +1 KB gzip for the attention card's vertical layout (a page in a swipe card) and rules from a card on another view (last 1_186_500 / 296_500).
  main: { size: 1_189_000, gzipSize: 297_500 },
  // +1.5 KB / +0.5 KB gzip for the climate panel's hold option.
  // 0.79.0: +1.5 KB / +0.5 KB gzip for its water tank fields (last 329_000 / 78_000).
  // 0.80.0: +1.5 KB / +0.5 KB gzip for the attention card's layout and rules source fields (last 330_500 / 78_500).
  editors: { size: 332_000, gzipSize: 79_000 },
};

const files = (await readdir(dist)).filter((name) => /^materia(-.+)?\.js$/.test(name)).sort();
const editorChunks = files.filter((name) => /^materia-editors-[\w-]+\.js$/.test(name));
const unknown = files.filter((name) => name !== "materia.js" && !editorChunks.includes(name));
let failed = false;
const fail = (message) => {
  console.error(message);
  failed = true;
};

if (!files.includes("materia.js")) fail("dist/materia.js is missing.");
if (editorChunks.length !== 1) fail(`Expected one dist/materia-editors-<hash>.js, found ${editorChunks.length}: ${editorChunks.join(", ") || "none"}.`);
if (unknown.length) fail(`Unexpected bundle files in dist/ (stale or a new chunk): ${unknown.join(", ")}.`);

async function measure(label, name, limit) {
  const source = await readFile(new URL(name, dist));
  const size = source.byteLength;
  const gzipSize = gzipSync(source).byteLength;
  console.log(`${label}: ${name} ${size} bytes (${gzipSize} bytes gzip); budget ${limit.size} / ${limit.gzipSize}.`);
  if (size > limit.size || gzipSize > limit.gzipSize) fail(`${label} exceeds its budget.`);
  return source;
}

if (files.includes("materia.js")) {
  const main = await measure("Main bundle", "materia.js", limits.main);
  if (!main.includes(Buffer.from(`v${packageJson.version}`))) {
    fail(`Built bundle does not contain package version ${packageJson.version}.`);
  }
  for (const chunk of editorChunks) {
    if (!main.includes(Buffer.from(`"./${chunk}"`))) fail(`materia.js does not import ./${chunk} (stale chunk?).`);
  }
}
for (const chunk of editorChunks) await measure("Editors chunk", chunk, limits.editors);

if (failed) process.exit(1);
