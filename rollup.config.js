import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { gzipSync } from "zlib";

/**
 * Copy the canonical custom_colors.json (source of truth: src/) into the
 * build output on every build, so it's always present at
 * /local/community/materia/custom_colors.json for material-you-utilities.
 */
const copyCustomColors = {
  name: "copy-custom-colors",
  writeBundle() {
    copyFileSync("src/custom_colors.json", "dist/custom_colors.json");
  },
};

/**
 * Deploy straight to the Home Assistant server when the config share is
 * mounted (no-op otherwise, so builds on other machines still work).
 * Regenerates materia.js.gz too — HA serves the precompressed file when
 * present, so a stale .gz would otherwise mask new code.
 */
const HA_DIR = "/Volumes/config/www/community/Materia";
const deployToHA = {
  name: "deploy-to-ha",
  writeBundle() {
    if (!existsSync(HA_DIR)) return;
    const js = readFileSync("dist/materia.js");
    writeFileSync(`${HA_DIR}/materia.js`, js);
    writeFileSync(`${HA_DIR}/materia.js.gz`, gzipSync(js, { level: 9 }));
    copyFileSync("src/custom_colors.json", `${HA_DIR}/custom_colors.json`);
    console.log(`→ deployed to ${HA_DIR}`);
  },
};

export default {
  input: "src/materia.js",
  output: {
    file: "dist/materia.js",
    format: "es",
  },
  plugins: [resolve(), terser(), copyCustomColors, deployToHA],
};
