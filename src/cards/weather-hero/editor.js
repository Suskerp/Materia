import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherHeroEditor extends SmartEditorBase {
  _formData() {
    // Booleans only — Night/Day are i18n'd runtime defaults.
    return {
      show_condition: true,
      show_icon: true,
      show_feels_like: true,
      show_minmax: true,
      ...this._config,
    };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "Moon phase sensor (default: sensor.moon)", selector: { entity: { domain: "sensor" } } },
          { name: "temperature_entity", label: "Real temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "feels_like_entity", label: "Feels-like sensor (optional)", selector: { entity: { domain: "sensor" } } },
          { name: "show_condition", label: "Show condition text", selector: { boolean: {} } },
          { name: "show_icon", label: "Show condition glyph", selector: { boolean: {} } },
          { name: "show_feels_like", label: "Show feels-like", selector: { boolean: {} } },
        ],
      },
      {
        title: "Night / Day",
        icon: "mdi:thermometer-lines",
        fields: [
          { name: "show_minmax", label: "Show night / day range", selector: { boolean: {} } },
          { name: "low_entity", label: "Low sensor (optional)", selector: { entity: { domain: "sensor" } } },
          { name: "high_entity", label: "High sensor (optional)", selector: { entity: { domain: "sensor" } } },
          { name: "night_label", label: "Night label", selector: { text: {} } },
          { name: "day_label", label: "Day label", selector: { text: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
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

customElements.define("materia-weather-hero-editor", MateriaWeatherHeroEditor);
