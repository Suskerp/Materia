import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
const entry = await readFile(new URL("../src/materia.js", import.meta.url), "utf8");
const runtimeUsesBuildToken = entry.includes('const VERSION = "__MATERIA_VERSION__"');

const versions = {
  package: packageJson.version,
  lock: lock.version,
  lockRoot: lock.packages?.[""]?.version,
};

const expected = packageJson.version;
const drift = Object.entries(versions).filter(([, version]) => version !== expected);
if (drift.length) {
  console.error("Version drift detected:", versions);
  process.exit(1);
}
if (!runtimeUsesBuildToken) {
  console.error("src/materia.js must use the build-time __MATERIA_VERSION__ token.");
  process.exit(1);
}

console.log(`Version sources agree on ${expected}.`);
