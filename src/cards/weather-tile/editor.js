import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherTileEditor extends SmartEditorBase {
  /* Every slider MUST be seeded with the card's own default. A number field
     whose key is absent from config arrives as `undefined`, which ha-form
     draws as 0 — so the slider would claim "temperature at dead centre" when
     the card actually renders it at -18, and merely opening the editor and
     saving would write that 0 for real. The spread of this._config last means
     a value the user has actually set still wins.

     text_size / icon_size defaults depend on show_minmax exactly as the card's
     do, so the seeded value matches what is on screen either way. */
  _formData() {
    // show_minmax is a plain truthy check in the card, so a card without the
    // key hides the range — even though getStubConfig hands new cards `true`.
    const mm = !!this._config?.show_minmax;
    return {
      show_minmax: false,
      mirror: false,
      size: 10,
      tilt: -45,
      pill_scale: 86,
      width: 115,
      height: 85,
      temp_x: 0,
      temp_y: -18,
      icon_x: 0,
      icon_y: 18,
      text_size: mm ? 26 : 30,
      icon_size: mm ? 34 : 36,
      minmax_size: 5.5,
      ...this._config,
    };
  }

  /* text_size / icon_size seeds move with show_minmax, so the form has to be
     rebuilt when it flips — otherwise the two sliders keep the old seed. */
  _sectionsSignature() {
    return this._config?.show_minmax ? "mm" : "plain";
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "Moon phase sensor (default: sensor.moon)", selector: { entity: { domain: "sensor" } } },
          { name: "temperature_entity", label: "Temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          {
            name: "icon",
            label: "Custom icon (overrides the colored glyph)",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
        ],
      },
      {
        title: "Min / Max",
        icon: "mdi:thermometer-lines",
        fields: [
          { name: "show_minmax", label: "Show min / max", selector: { boolean: {} } },
          { name: "high_entity", label: "High sensor (optional)", selector: { entity: { domain: "sensor" } } },
          { name: "low_entity", label: "Low sensor (optional)", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Position",
        icon: "mdi:arrow-all",
        // Every value here is applied verbatim — nothing is clamped to the
        // pill or auto-fitted, so pieces CAN be pushed outside the shape on
        // purpose. Ranges are deliberately wider than the tile.
        fields: [
          {
            name: "temp_x",
            label: "Temperature — horizontal",
            helper: "% of the tile's width from centre. Negative = left. Same unit on both axes, so 10 across moves exactly as far as 10 down.",
            selector: { number: { min: -60, max: 60, step: 1, mode: "slider" } },
          },
          { name: "temp_y", label: "Temperature — vertical (negative = up)", selector: { number: { min: -60, max: 60, step: 1, mode: "slider" } } },
          { name: "icon_x", label: "Glyph — horizontal", selector: { number: { min: -60, max: 60, step: 1, mode: "slider" } } },
          { name: "icon_y", label: "Glyph — vertical (negative = up)", selector: { number: { min: -60, max: 60, step: 1, mode: "slider" } } },
          {
            name: "text_size",
            label: "Temperature size",
            helper: "Also in % of the tile's width, so the whole tile scales together.",
            selector: { number: { min: 5, max: 70, step: 1, mode: "slider" } },
          },
          { name: "icon_size", label: "Glyph size", selector: { number: { min: 5, max: 90, step: 1, mode: "slider" } } },
          { name: "minmax_size", label: "Min / max text size", selector: { number: { min: 2, max: 20, step: 0.5, mode: "slider" } } },
        ],
      },
      {
        title: "Pill shape",
        icon: "mdi:shape-outline",
        fields: [
          {
            name: "tilt",
            label: "Tilt (degrees)",
            helper: "The pill alone rotates — the temperature and glyph always stay upright, so tilting never moves or clips them.",
            selector: { number: { min: -90, max: 90, step: 1, mode: "slider" } },
          },
          {
            name: "pill_scale",
            label: "Pill scale (%)",
            helper: "Grow the pill to meet the content instead of shrinking the content to meet the pill. Above ~100 it spills past the card, which is allowed.",
            selector: { number: { min: 40, max: 160, step: 1, mode: "slider" } },
          },
          { name: "width", label: "Pill width (% of the cell)", selector: { number: { min: 50, max: 220, step: 1, mode: "slider" } } },
          {
            name: "height",
            label: "Pill height (% of its width)",
            helper: "100 = a circle before the tilt; lower is a flatter stadium.",
            selector: { number: { min: 30, max: 160, step: 1, mode: "slider" } },
          },
          { name: "mirror", label: "Mirror (tilt the pill the other way)", selector: { boolean: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "size", label: "Size (10 = fill)", selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } } },
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / temperature", color: true, template: true, selector: { text: {} } },
          { name: "minmax_color", label: "Min / max color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-tile-editor", MateriaWeatherTileEditor);
