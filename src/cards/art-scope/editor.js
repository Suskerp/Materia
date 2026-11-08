import { MateriaExpanderEditor } from "../expander/editor.js";

const PANEL_TIMEOUT_FIELD = {
  name: "panel_timeout",
  label: "e_return_player_after",
  selector: { number: { min: 0, max: 60, step: 1, mode: "slider", unit_of_measurement: "s" } },
};

/** Reuses the expander's card list (add / edit / reorder child cards). */
class MateriaArtScopeEditor extends MateriaExpanderEditor {
  _formData() {
    return { layout: "stack", gap: 16, background: true, panel_timeout: 10, fill: true, ...this._config };
  }

  _sectionsSignature() {
    return this._config?.layout || "stack";
  }

  get _sections() {
    const layout = this._config?.layout || "stack";
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "e_player_colours",
            required: true,
            selector: { entity: { domain: "media_player" } },
          },
        ],
      },
      {
        title: "e_layout",
        icon: "mdi:view-dashboard-outline",
        fields: [
          {
            name: "layout",
            selector: { select: { mode: "dropdown", options: [
              { value: "stack", label: "e_stack" },
              { value: "row", label: "e_row" },
              { value: "grid", label: "e_grid" },
              { value: "kiosk", label: "e_kiosk_cover_player" },
            ] } },
          },
          ...(layout === "grid"
            ? [{ name: "columns", label: "e_column_number_grid", selector: { text: {} } }]
            : []),
          { name: "gap", label: "e_gap_px", selector: { number: { min: 0, max: 64, mode: "box" } } },
          { name: "padding", label: "e_paddin_px", selector: { number: { min: 0, max: 64, mode: "box" } } },
          { name: "background", label: "e_draw_surfac", selector: { boolean: {} } },
        ],
      },
      ...(layout === "kiosk"
        ? [
            {
              title: "e_kiosk_panel",
              icon: "mdi:dock-right",
              fields: [
                { name: "fill", label: "e_fill_screen_height", selector: { boolean: {} } },
                { ...PANEL_TIMEOUT_FIELD, label: "e_close_panel_after" },
              ],
            },
          ]
        : []),
    ];
  }

  get _cardsTitle() {
    return "e_cards";
  }

  get _cardsHint() {
    return "e_kiosk_cards_hint";
  }
}

customElements.define("materia-art-scope-editor", MateriaArtScopeEditor);
