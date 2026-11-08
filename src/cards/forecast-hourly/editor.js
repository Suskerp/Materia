import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaForecastHourlyEditor extends SmartEditorBase {
  _formData() {
    // Booleans + the hours slider only — see forecast-daily.
    return {
      hours: 24,
      show_header: true,
      show_precipitation: true,
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
          { name: "name", label: "e_header_title", selector: { text: {} } },
          { name: "show_header", label: "e_show_header", selector: { boolean: {} } },
          { name: "hours", label: "e_hours_shown", selector: { number: { min: 6, max: 48, step: 1, mode: "slider" } } },
          { name: "show_precipitation", label: "e_show_precip_chance", selector: { boolean: {} } },
          { name: "min_precipitation", default: 10, label: "e_hide_below", selector: { number: { min: 0, max: 100, step: 5, mode: "box" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-forecast-hourly-editor", MateriaForecastHourlyEditor);
