/** Pure helpers for keeping visual-editor defaults honest without expanding YAML. */
export function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object || {}, key);
}

/**
 * Resolve the value shown by a selector. `data` may contain render-only defaults
 * supplied by an editor's _formData(); the persisted config remains authoritative.
 */
export function effectiveEditorValue(config, data, field) {
  if (hasOwn(data, field.name)) return data[field.name];
  if (hasOwn(field, "default")) return field.default;
  return field.selector?.boolean ? false : undefined;
}

/**
 * Some HA selector versions emit their displayed value while initialising. If
 * that value is only an implicit/render-only default, it must not be written to
 * the dashboard merely because the editor was opened.
 */
export function isImplicitDefaultEvent(config, name, value, displayedValue) {
  return !hasOwn(config, name) && Object.is(value, displayedValue);
}
