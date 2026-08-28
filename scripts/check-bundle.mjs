import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const path = new URL("../dist/materia.js", import.meta.url);
const source = await readFile(path);
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const { size } = await stat(path);
const gzipSize = gzipSync(source).byteLength;
const limits = { size: 1_050_000, gzipSize: 260_000 };

console.log(`Bundle: ${size} bytes (${gzipSize} bytes gzip).`);
if (size > limits.size || gzipSize > limits.gzipSize) {
  console.error(`Bundle exceeds budget (${limits.size} raw / ${limits.gzipSize} gzip).`);
  process.exit(1);
}
if (!source.includes(Buffer.from(`v${packageJson.version}`))) {
  console.error(`Built bundle does not contain package version ${packageJson.version}.`);
  process.exit(1);
}
