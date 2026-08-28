import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { extname, join } from "node:path";

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(path) : [path];
  }));
  return nested.flat();
}

const files = (await Promise.all([filesBelow("src"), filesBelow("test"), filesBelow("scripts")]))
  .flat()
  .filter((file) => [".js", ".mjs"].includes(extname(file)));

for (const file of files) {
  const source = await readFile(file, "utf8");
  if (/^(<<<<<<<|=======|>>>>>>>)/m.test(source)) {
    console.error(`Merge marker found in ${file}`);
    process.exit(1);
  }
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Syntax checked ${files.length} source files.`);
