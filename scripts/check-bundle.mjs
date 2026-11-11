import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const path = new URL("../dist/materia.js", import.meta.url);
const source = await readFile(path);
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const { size } = await stat(path);
const gzipSize = gzipSync(source).byteLength;
// Raised from 1_050_000 / 260_000 for the expressive media family (0.72.0):
// @material/material-color-utilities alone is ~127 KB raw / ~23 KB gzip, and
// it is the one library that must not be replaced (art colours have to match
// the Material You theme, which ships the same build).
// 0.74.0: the composable media parts (volume, switcher, toggle chip, stack, tile grid,
// power menu, media source, panel host) bring the bundle to ~300 KB gzip.
// 0.75: every visual-editor label, helper and option lives in i18n.js with a
// Dutch twin, plus the new visual editors (card list, panels, power rows):
// ~329 KB gzip after the merge; the limit keeps ~5 KB headroom.
// Schedule editor without YAML (one-moment card, list editors for steps,
// quick picks, triggers, devices and plans, en + nl): ~336 KB gzip; the
// limit keeps ~4 KB headroom.
const limits = { size: 1_360_000, gzipSize: 340_000 };

console.log(`Bundle: ${size} bytes (${gzipSize} bytes gzip).`);
if (size > limits.size || gzipSize > limits.gzipSize) {
  console.error(`Bundle exceeds budget (${limits.size} raw / ${limits.gzipSize} gzip).`);
  process.exit(1);
}
if (!source.includes(Buffer.from(`v${packageJson.version}`))) {
  console.error(`Built bundle does not contain package version ${packageJson.version}.`);
  process.exit(1);
}
