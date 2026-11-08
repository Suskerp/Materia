import { MateriaExpanderEditor } from "../expander/editor.js";

const PANEL_TIMEOUT_FIELD = {
  name: "panel_timeout",
  label: "Return to the player after (s without a touch, 0 = never)",
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
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "Speler (kleuren, en standaard voor de kaarten erin)",
            required: true,
            selector: { entity: { domain: "media_player" } },
          },
        ],
      },
      {
        title: "Layout",
        icon: "mdi:view-dashboard-outline",
        fields: [
          {
            name: "layout",
            selector: { select: { mode: "dropdown", options: [
              { value: "stack", label: "Stack" },
              { value: "row", label: "Row" },
              { value: "grid", label: "Grid" },
              { value: "kiosk", label: "Kiosk (cover | player, side panel)" },
            ] } },
          },
          ...(layout === "grid"
            ? [{ name: "columns", label: "Columns (number or grid-template-columns)", selector: { text: {} } }]
            : []),
          { name: "gap", label: "Gap (px)", selector: { number: { min: 0, max: 64, mode: "box" } } },
          { name: "padding", label: "Padding (px)", selector: { number: { min: 0, max: 64, mode: "box" } } },
          { name: "background", label: "Draw the surface", selector: { boolean: {} } },
        ],
      },
      ...(layout === "kiosk"
        ? [
            {
              title: "Kiosk panel",
              icon: "mdi:dock-right",
              fields: [
                { name: "fill", label: "Fill the screen height", selector: { boolean: {} } },
                { ...PANEL_TIMEOUT_FIELD, label: "Close the panel after (s without a touch, 0 = never)" },
              ],
            },
          ]
        : []),
    ];
  }

  get _cardsTitle() {
    return "Cards";
  }

  get _cardsHint() {
    return "Kiosk: the first card is the cover, the rest form the player column.";
  }
}

customElements.define("materia-art-scope-editor", MateriaArtScopeEditor);
