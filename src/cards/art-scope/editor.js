import { MateriaExpanderEditor } from "../expander/editor.js";

/** Reuses the expander's card list (add / edit / reorder child cards). */
class MateriaArtScopeEditor extends MateriaExpanderEditor {
  _formData() {
    return { layout: "stack", gap: 16, background: true, panel_timeout: 10, ...this._config };
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
          { name: "entity", label: "Colours from (media player)", required: true, selector: { entity: { domain: "media_player" } } },
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
          ...(layout === "kiosk"
            ? [
                { name: "panel_timeout", label: "Close the side panel after (s, 0 = never)", selector: { number: { min: 0, max: 120, mode: "box" } } },
                { name: "panels", label: "Panel overrides (per panel id)", selector: { object: {} } },
              ]
            : []),
        ],
      },
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
