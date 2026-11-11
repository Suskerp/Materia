/**
 * The visual card editors live in their own lazy chunk (src/editors.js →
 * dist/materia-editors-<hash>.js). A dashboard that is only viewed never
 * downloads them; the first getConfigElement() call does.
 *
 *   static async getConfigElement() {
 *     await loadEditors();
 *     return document.createElement("materia-thing-editor");
 *   }
 *
 * The chunk imports its shared code (Lit, i18n, palette …) from the main
 * bundle. Home Assistant loads materia.js WITH a cache-busting query
 * (?v=…), and a module's identity is its full URL, so a plain
 * `import "./materia.js"` from the chunk would run a second copy of the
 * whole library. The build rewrites that import to load the URL recorded
 * here instead, which is the already-running module. See rollup.config.js.
 */
globalThis[Symbol.for("materia.entry-url")] = import.meta.url;

let pending = null;

/** Resolves once every materia-*-editor element is defined. */
export function loadEditors() {
  pending ??= import("../editors.js").catch((error) => {
    // A failed fetch (offline, a release swapped mid-session) must not stick:
    // the next editor that opens tries again.
    pending = null;
    throw error;
  });
  return pending;
}
