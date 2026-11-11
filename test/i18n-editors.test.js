import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { STRINGS, localize, resolveLanguage, t, tr } from "../src/utils/i18n.js";
import { EDITOR_STRINGS } from "../src/utils/i18n-editor.js";

const root = fileURLToPath(new URL("..", import.meta.url));

/** Every visual editor, plus the shared editor modules. */
function editorFiles() {
  const files = [];
  for (const dir of ["src/cards", "src/elements"]) {
    for (const name of readdirSync(join(root, dir))) {
      const file = join(root, dir, name, "editor.js");
      if (existsSync(file)) files.push(file);
    }
  }
  for (const name of ["media-editors.js", "smart-editor.js", "editor-helpers.js", "card-list-editor.js", "panels-editor.js"]) {
    files.push(join(root, "src/utils", name));
  }
  return files;
}

/** Literal text that is the same in every language: units, sizes, brands. */
const LANGUAGE_NEUTRAL = /^(XS|S|M|L|XL)\b.*\d|^\d+ ?px$|^(km\/h|mph|Beaufort|Roborock|Ecovacs)$/;

/** Source with comments and css`` blocks blanked out, line numbers kept. */
function codeOf(file) {
  return readFileSync(file, "utf8")
    .replace(/css`[\s\S]*?`/g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/^\s*\/\/.*$/gm, "");
}

const isKey = (s) => /^[a-z][a-z0-9_]*$/.test(s);
const looksLikeText = (s) => /[A-Za-z]{2}/.test(s) && !isKey(s) && !LANGUAGE_NEUTRAL.test(s) && !/^(mdi|m3o):|^var\(|^#|\{\{/.test(s);

test("every string has non-empty English and Dutch copy with the same placeholders", () => {
  for (const [key, entry] of Object.entries(STRINGS)) {
    assert.ok(entry.en?.trim(), `${key} needs English copy`);
    assert.ok(entry.nl?.trim(), `${key} needs Dutch copy`);
    const vars = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
    assert.equal(vars(entry.nl), vars(entry.en), `${key}: Dutch placeholders differ from English`);
  }
});

test("the language follows Home Assistant and falls back to English", () => {
  assert.equal(resolveLanguage({ locale: { language: "nl" } }), "nl");
  assert.equal(resolveLanguage({ language: "nl-BE" }), "nl");
  assert.equal(resolveLanguage(undefined), "en");
  assert.equal(t("cancel", { locale: { language: "fr" } }), "Cancel");
  assert.equal(t("cancel", { locale: { language: "nl" } }), "Annuleren");
});

test("localize translates keys in label slots and keeps other text and identity", () => {
  const options = [{ value: "a", label: "cancel" }, { value: "b", label: "My own words" }];
  const schema = [{ name: "x", label: "confirm", helper: "reset", selector: { select: { options } } }];
  const nl = localize(schema, "nl");
  assert.equal(nl[0].label, "Bevestigen");
  assert.equal(nl[0].helper, "Resetten");
  assert.equal(nl[0].selector.select.options[0].label, "Annuleren");
  assert.equal(nl[0].selector.select.options[1].label, "My own words");
  assert.equal(nl[0].name, "x");
  assert.equal(localize(schema, "nl"), nl, "memoised per language");
  assert.equal(tr("Not a key", "nl"), "Not a key");
});

test("every i18n key an editor or card names exists", () => {
  const walk = (d) =>
    readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
  const missing = [];
  for (const file of walk(join(root, "src")).filter((f) => f.endsWith(".js"))) {
    for (const m of readFileSync(file, "utf8").matchAll(/["'`]((?:e|f)_[a-z0-9_]+)["'`]/g)) {
      if (!STRINGS[m[1]]) missing.push(`${relative(root, file)}: ${m[1]}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("editors carry no hard-coded label text", () => {
  const hits = [];
  for (const file of editorFiles()) {
    codeOf(file).split("\n").forEach((line, i) => {
      const where = `${relative(root, file)}:${i + 1}`;
      // { label: "Some words" } — schema slots must hold i18n keys
      for (const m of line.matchAll(/\b(label|helper|title|secondary|placeholder|heading)\s*:\s*(["'])((?:\\.|(?!\2).)*)\2/g)) {
        if (looksLikeText(m[3])) hits.push(`${where}: ${m[0]}`);
      }
      // label="Some words" / .label=${"Some words"} in templates
      for (const m of line.matchAll(/\s\.?(label|title|placeholder|helper|header|secondary|aria-label)=(?:"([^"$]*)"|\$\{\s*"([^"]*)"\s*\})/g)) {
        const text = m[2] ?? m[3];
        if (looksLikeText(text)) hits.push(`${where}: ${m[0].trim()}`);
      }
      // >Some words< text nodes
      for (const m of line.matchAll(/(?<![=\-])>([^<>${}`&]*[A-Za-z]{3}[^<>${}`&]*)</g)) {
        if (looksLikeText(m[1].trim())) hits.push(`${where}: ${m[0]}`);
      }
    });
  }
  assert.deepEqual(hits, []);
});

test("a field without its own label has a shared f_<name> translation", () => {
  const unlabeled = new Set();
  for (const file of editorFiles()) {
    const src = codeOf(file);
    for (const m of src.matchAll(/\bname:\s*"([a-z0-9_]+)"/g)) {
      // the enclosing object literal: back to its "{", forward to its "}"
      let depth = 0, start = m.index;
      for (; start > 0; start--) {
        const c = src[start];
        if (c === "}") depth++;
        else if (c === "{") { if (depth === 0) break; depth--; }
      }
      depth = 0;
      let end = m.index;
      for (; end < src.length; end++) {
        const c = src[end];
        if (c === "{") depth++;
        else if (c === "}") { if (depth === 0) break; depth--; }
      }
      const body = src.slice(start, end);
      // only schema fields (they carry a selector) and only top-level label
      const flat = body.slice(1).replace(/\{[^{}]*\}/g, "").replace(/\{[^{}]*\}/g, "").replace(/\{[^{}]*\}/g, "");
      if (!/selector\s*:/.test(body) || /\b(label|render)\s*:/.test(flat)) continue;
      unlabeled.add(m[1]);
    }
  }
  const missing = [...unlabeled].filter((name) => !STRINGS[`f_${name}`]);
  assert.deepEqual(missing, []);
});

/** Every module reachable through static imports from `entry` (relative ones). */
function staticGraph(entry) {
  const seen = new Set();
  const visit = (file) => {
    if (seen.has(file)) return;
    seen.add(file);
    const src = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    for (const m of src.matchAll(/^\s*(?:import|export)\s+(?:[^"'`;]*?\sfrom\s+)?["'](\.{1,2}\/[^"']+)["']/gm)) {
      visit(join(file, "..", m[1]));
    }
  };
  visit(join(root, entry));
  return seen;
}

test("the editor-only table and the runtime table share no key", () => {
  const runtime = Object.keys(STRINGS).filter((k) => !(k in EDITOR_STRINGS));
  assert.ok(runtime.length > 100, "i18n.js keeps the runtime strings");
  // i18n-editor.js merges into STRINGS; a key defined in both files would
  // silently overwrite the runtime copy (trap 09, across two files).
  const runtimeSource = readFileSync(join(root, "src/utils/i18n.js"), "utf8");
  const dup = Object.keys(EDITOR_STRINGS).filter((k) => new RegExp(`^  ${k}:`, "m").test(runtimeSource));
  assert.deepEqual(dup, []);
});

test("the main bundle never reads a key that only the lazy editors chunk carries", () => {
  const main = staticGraph("src/materia.js");
  assert.ok(main.size > 100, "main graph resolved");
  for (const file of main) {
    assert.ok(!/\/editor\.js$|i18n-editor\.js$|\/editors\.js$/.test(file), `${relative(root, file)} is editor code in the main bundle`);
  }
  const hits = [];
  for (const file of main) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/["'`]((?:e|ed|f)_[a-z0-9_]*)/g)) {
      if (m[1] in EDITOR_STRINGS || /_$/.test(m[1])) hits.push(`${relative(root, file)}: ${m[1]}`);
    }
  }
  assert.deepEqual(hits, []);
});
