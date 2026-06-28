import { html } from "lit";

export const computeLabel = (schema) =>
  schema.label ??
  schema.name
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

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
