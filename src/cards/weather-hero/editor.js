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
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "e_moon_phase_sensor", selector: { entity: { domain: "sensor" } } },
          { name: "temperature_entity", label: "e_real_temper_sensor", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "feels_like_entity", label: "e_feels_like_sensor", selector: { entity: { domain: "sensor" } } },
          { name: "show_condition", label: "e_show_condit_text", selector: { boolean: {} } },
          { name: "show_icon", label: "e_show_condit_glyph", selector: { boolean: {} } },
          { name: "show_feels_like", label: "e_show_feels_like", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_night_day",
        icon: "mdi:thermometer-lines",
        fields: [
          { name: "show_minmax", label: "e_show_night_day", selector: { boolean: {} } },
          { name: "low_entity", label: "e_low_sensor_option", selector: { entity: { domain: "sensor" } } },
          { name: "high_entity", label: "e_high_sensor_option", selector: { entity: { domain: "sensor" } } },
          { name: "night_label", label: "e_night_label", selector: { text: {} } },
          { name: "day_label", label: "e_day_label", selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color_on", label: "e_text_color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-hero-editor", MateriaWeatherHeroEditor);
