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
  main: { size: 1_070_000, gzipSize: 266_500 },
  editors: { size: 320_000, gzipSize: 76_000 },
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
