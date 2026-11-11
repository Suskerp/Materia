import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { copyFileSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { gzipSync } from "zlib";

const packageVersion = JSON.parse(readFileSync("package.json", "utf8")).version;

/** package.json is the release version source of truth. */
const injectVersion = {
  name: "inject-version",
  transform(code, id) {
    if (!id.endsWith("/src/materia.js")) return null;
    return { code: code.replaceAll("__MATERIA_VERSION__", packageVersion), map: null };
  },
};

/** materia.js plus every hashed chunk the build writes next to it. */
const isBundleFile = (name) => /^materia(-.+)?\.js(\.gz)?$/.test(name);

/**
 * Chunk names carry a content hash, so every editor change writes a new
 * file. Clear the previous build's chunks first, or stale ones pile up in
 * dist/ (and in the repo, which is what the Marketplace ships).
 */
const cleanDist = {
  name: "clean-dist",
  buildStart() {
    if (!existsSync("dist")) return;
    for (const name of readdirSync("dist")) if (isBundleFile(name)) rmSync(`dist/${name}`);
  },
};

/**
 * The lazy editors chunk imports its shared code (Lit, i18n …) from the main
 * bundle, which Rollup writes as `import { … } from "./materia.js"`. Home
 * Assistant loads the main bundle as materia.js?v=<version>, and a module's
 * identity is its full URL: that plain import would evaluate a SECOND copy of
 * the library (every customElements.define throwing, editors bound to a
 * different Lit and i18n table). So the import becomes a dynamic import of the
 * URL the running main bundle recorded (src/utils/load-editors.js), which
 * returns the module that is already loaded. Runs before terser, on Rollup's
 * own canonical import syntax; anything else fails the build.
 *
 * The bindings become constants, not live bindings, so the main bundle must
 * not export a top-level `let`/`var` to the chunk: checked below as well.
 */
const ENTRY = "materia.js";
const linkEditorsToEntry = {
  name: "link-editors-to-entry",
  renderChunk(code, chunk) {
    if (chunk.isEntry) {
      const exported = code.match(/^export \{([^}]*)\};?$/m)?.[1] ?? "";
      for (const spec of exported.split(",").map((s) => s.trim()).filter(Boolean)) {
        const local = spec.split(/\s+as\s+/)[0];
        if (new RegExp(`^(?:let|var)\\s+(?:[\\w$]+\\s*(?:=[^,;]*)?,\\s*)*${local.replace(/\$/g, "\\$")}\\b`, "m").test(code)) {
          this.error(`main bundle exports mutable binding "${local}" to the editors chunk; make it const`);
        }
      }
      return null;
    }
    const importRe = new RegExp(`^import \\{([^}]*)\\} from '\\./${ENTRY.replace(".", "\\.")}';$`, "gm");
    const found = [...code.matchAll(importRe)];
    if (found.length !== 1 || chunk.imports.length !== 1 || chunk.imports[0] !== ENTRY) {
      this.error(`chunk ${chunk.fileName} must import exactly one named list from ${ENTRY}; got ${JSON.stringify(chunk.imports)}`);
    }
    const bindings = found[0][1]
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => s.replace(/\s+as\s+/, ": "))
      .join(", ");
    const url = `globalThis[Symbol.for("materia.entry-url")] ?? new URL("./${ENTRY}", import.meta.url).href`;
    return { code: code.replace(found[0][0], `const { ${bindings} } = await import(${url});`), map: null };
  },
  generateBundle(_, bundle) {
    const chunks = Object.values(bundle).filter((f) => f.type === "chunk");
    const lazy = chunks.filter((c) => !c.isEntry);
    if (lazy.length !== 1 || !lazy[0].isDynamicEntry || !lazy[0].facadeModuleId?.endsWith("/src/editors.js")) {
      this.error(`expected exactly one lazy chunk (src/editors.js), got ${chunks.map((c) => c.fileName).join(", ")}`);
    }
  },
};

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
 * Optional direct deploy to a mounted Home Assistant share. OFF by default —
 * the HACS flow (build → commit → push → HACS update) is the source of truth.
 * Opt in for local testing with: MATERIA_DEPLOY=1 npm run build
 * Copies materia.js and the hashed chunks and regenerates a .gz for each — HA
 * serves the precompressed file when present, so a stale .gz would otherwise
 * mask new code. Older hashed chunks there are left alone: a tab still
 * running the previous main bundle may yet ask for its own chunk.
 */
const HA_DIR = "/Volumes/config/www/community/Materia";
const deployToHA = {
  name: "deploy-to-ha",
  writeBundle() {
    if (!process.env.MATERIA_DEPLOY) return;
    if (!existsSync(HA_DIR)) return;
    for (const name of readdirSync("dist").filter((n) => n.endsWith(".js"))) {
      const js = readFileSync(`dist/${name}`);
      writeFileSync(`${HA_DIR}/${name}`, js);
      writeFileSync(`${HA_DIR}/${name}.gz`, gzipSync(js, { level: 9 }));
    }
    copyFileSync("src/custom_colors.json", `${HA_DIR}/custom_colors.json`);
    console.log(`→ deployed to ${HA_DIR}`);
  },
};

export default {
  input: "src/materia.js",
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: ENTRY,
    // Content-hashed: HA and browsers cache /local/ for weeks, and only the
    // entry carries the ?v= cache-buster, so a new release must never reuse
    // a chunk's name.
    chunkFileNames: "materia-[name]-[hash].js",
  },
  plugins: [cleanDist, injectVersion, resolve(), linkEditorsToEntry, terser(), copyCustomColors, deployToHA],
};
