import { html } from "lit";
import { MateriaExpanderEditor } from "../expander/editor.js";
import { VOLUME_STYLE_SELECTOR } from "../../utils/media-editors.js";

const PANEL_STYLE_LABEL = "Stijl van het volumepaneel (kiosk)";

const PANEL_TIMEOUT_FIELD = {
  name: "panel_timeout",
  label: "Return to the player after (s without a touch, 0 = never)",
  selector: { number: { min: 0, max: 60, step: 1, mode: "slider", unit_of_measurement: "s" } },
};

/** Reuses the expander's card list (add / edit / reorder child cards). */
class MateriaArtScopeEditor extends MateriaExpanderEditor {
  _formData() {
    return { layout: "stack", gap: 16, background: true, panel_timeout: 10, fill: true, panel_mode: "sheet", ...this._config };
  }

  _sectionsSignature() {
    return `${this._config?.layout || "stack"}|${this._config?.panel_mode || "sheet"}`;
  }

  /** panels.volume.style, edited as one select; other panel overrides are kept. */
  _setPanelStyle(style) {
    const panels = { ...(this._config.panels ?? {}) };
    const volume = { ...(panels.volume ?? {}) };
    if (style) volume.style = style;
    else delete volume.style;
    if (Object.keys(volume).length) panels.volume = volume;
    else delete panels.volume;
    this._setField("panels", Object.keys(panels).length ? panels : undefined);
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
        title: "Volume",
        icon: "mdi:volume-high",
        expanded: false,
        fields: [
          {
            name: "volume",
            render: (value, data) => html`<materia-volume-editor
              .hass=${this.hass}
              .value=${value}
              .defaultEntity=${data.entity}
              @value-changed=${(e) => {
                e.stopPropagation();
                this._setField("volume", e.detail.value);
              }}
            ></materia-volume-editor>`,
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
          ...(layout === "kiosk"
            ? []
            : [
                {
                  name: "panel_mode",
                  label: "Volume / stations open",
                  selector: { select: { mode: "dropdown", options: [
                    { value: "sheet", label: "In a bottom sheet" },
                    { value: "inline", label: "In place of the cards (with back)" },
                  ] } },
                },
                ...(this._config?.panel_mode === "inline" ? [PANEL_TIMEOUT_FIELD] : []),
              ]),
        ],
      },
      ...(layout === "kiosk"
        ? [
            {
              title: "Kiosk panel",
              icon: "mdi:dock-right",
              fields: [
                { name: "fill", label: "Vul het scherm (hoogte)", selector: { boolean: {} } },
                { ...PANEL_TIMEOUT_FIELD, label: "Close the panel after (s without a touch, 0 = never)" },
                {
                  name: "panels",
                  render: (value) => html`<ha-selector
                    .hass=${this.hass}
                    .selector=${VOLUME_STYLE_SELECTOR}
                    .label=${PANEL_STYLE_LABEL}
                    .value=${value?.volume?.style ?? this._config.volume?.style ?? "knob"}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      this._setPanelStyle(e.detail.value);
                    }}
                  ></ha-selector>`,
                },
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
