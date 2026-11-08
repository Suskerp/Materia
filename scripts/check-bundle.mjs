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
// gzip raised from 300_000 while materia-volume-knob still ships beside the composable
// volume parts (materia-volume, materia-switcher, materia-toggle-chip). Lower it again once
// the old card is removed.
const limits = { size: 1_250_000, gzipSize: 305_000 };

console.log(`Bundle: ${size} bytes (${gzipSize} bytes gzip).`);
if (size > limits.size || gzipSize > limits.gzipSize) {
  console.error(`Bundle exceeds budget (${limits.size} raw / ${limits.gzipSize} gzip).`);
  process.exit(1);
}
if (!source.includes(Buffer.from(`v${packageJson.version}`))) {
  console.error(`Built bundle does not contain package version ${packageJson.version}.`);
  process.exit(1);
}
