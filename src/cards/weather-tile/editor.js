import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherTileEditor extends SmartEditorBase {
  /* Switches and sliders must be seeded with the card's own defaults, or a key
     absent from config arrives as `undefined`, ha-form draws it as off/0, and
     merely opening the editor and saving writes that wrong value for real. */
  _formData() {
    // show_minmax is a plain truthy check in the card, so a card without the
    // key hides the range — even though getStubConfig hands new cards `true`.
    return { show_minmax: false, mirror: false, size: 10, ...this._config };
  }

  /* NO POSITION OR GEOMETRY FIELDS, deliberately.

     This card briefly exposed temp_x/temp_y/icon_x/icon_y, text_size,
     icon_size, minmax_size, tilt, pill_scale, width and height as sliders, to
     hand-tune the layout against the tilted pill. That tuning is done and its
     result is now the card's defaults — a weather tile should look right out
     of the box, not ask its owner to nudge glyphs around.

     Every one of those keys still WORKS in YAML for anyone who wants to
     re-shape the pill; they are simply not advertised, the same way
     materia-lock keeps shape_style without offering a picker. See the note in
     index.js for why the offsets are the values they are. */
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
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "size", label: "Size (10 = fill)", selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } } },
          { name: "mirror", label: "Mirror (tilt the pill the other way)", selector: { boolean: {} } },
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
