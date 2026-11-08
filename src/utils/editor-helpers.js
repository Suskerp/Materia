import { html } from "lit";
import { STRINGS, t, tr } from "./i18n.js";

/**
 * Field label: the schema's own label (an i18n key or literal text), else the
 * field name's shared translation (`f_<name>`), else the name made readable.
 * SmartEditorBase calls computeLabel(field, hass); ha-form calls it as a
 * method of the form element (data as 2nd arg), so `this.hass` is the source.
 */
export function computeLabel(schema, hass) {
  const h = hass?.locale || hass?.language ? hass : this?.hass;
  if (schema.label != null) return tr(schema.label, h);
  const name = schema.name || "";
  if (STRINGS[`f_${name}`]) return t(`f_${name}`, h);
  return name.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Wrap a list of rows in HA's drag-and-drop sortable. Each row must contain a
 * `.drag-handle` element. `onMove(oldIndex, newIndex)` receives the move.
 */
export const sortableList = (onMove, rows) => html`
  <ha-sortable
    handle-selector=".drag-handle"
    @item-moved=${(e) => {
      e.stopPropagation();
      const { oldIndex, newIndex } = e.detail;
      if (oldIndex !== newIndex) onMove(oldIndex, newIndex);
    }}
  >
    <div>${rows}</div>
  </ha-sortable>
`;
