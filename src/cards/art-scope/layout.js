/** Pure layout helpers of materia-art-scope (unit-tested). */

/** Kiosk side panel: below this container width the kiosk stacks and buttons open sheets. */
export const KIOSK_MIN_WIDTH = 900;

/**
 * Grid track list for `columns`: a number means that many equal columns, a
 * string is used as grid-template-columns as written.
 */
export function scopeGridColumns(columns) {
  const n = Number(columns);
  if (Number.isInteger(n) && n > 0) return `repeat(${n}, minmax(0, 1fr))`;
  return typeof columns === "string" && columns.trim() ? columns : "repeat(2, minmax(0, 1fr))";
}

/** Card config shown in kiosk panel `id`: the button's request, then the kiosk's override. */
export function panelCardConfig(requested, panels, id) {
  return { ...requested, ...(panels?.[id] ?? {}), in_panel: true };
}
