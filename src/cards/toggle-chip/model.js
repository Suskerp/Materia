/* Pure helpers for materia-toggle-chip (no Lit, no DOM): node-testable. */

/** chip (default) | switch */
export function chipVariant(config) {
  return config?.variant === "switch" ? "switch" : "chip";
}

/** On means the entity's state is "on" (switch / input_boolean / light …). */
export function chipIsOn(stateObj) {
  return stateObj?.state === "on";
}

/**
 * The chip's text for the current state. `resolved` holds the rendered
 * templates ({ label_on, label_off }); a plain label is used as written.
 * An unset label falls back to the name.
 */
export function chipLabel(config, on, resolved = {}, name = "") {
  const key = on ? "label_on" : "label_off";
  const v = config?.[key];
  if (v == null || v === "") return name ?? "";
  const isTpl = typeof v === "string" && (v.includes("{{") || v.includes("{%"));
  return String(isTpl ? (resolved[key] ?? "") : v).trim();
}
