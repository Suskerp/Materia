/**
 * Imported FIRST by src/editors.js (and its `.release()` last): while the
 * editors chunk evaluates, a customElements.define for a name that is already
 * taken is skipped instead of throwing. Another bundle on the same dashboard
 * may already carry a copy of a Materia editor part (the climate scheduler
 * preview does: materia-color-picker, materia-conditions-field …); one such
 * clash used to abort the whole chunk, so no Materia editor could open.
 */
const registry = globalThis.customElements;
const define = registry.define.bind(registry);
registry.define = (name, ctor, options) => (registry.get(name) ? undefined : define(name, ctor, options));

export function releaseDefineGuard() {
  registry.define = define;
}
