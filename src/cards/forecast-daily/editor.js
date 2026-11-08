import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaForecastDailyEditor extends SmartEditorBase {
  _formData() {
    // Booleans + the days slider only; today_label is i18n'd at runtime and
    // min_precipitation is a plain box — seeding either writes it into config.
    return {
      days: 10,
      show_hourly: true,
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
          { name: "days", label: "e_days_shown", selector: { number: { min: 3, max: 15, step: 1, mode: "slider" } } },
          { name: "show_hourly", label: "e_tap_day_expand", selector: { boolean: {} } },
          { name: "show_precipitation", label: "e_show_precip_chance", selector: { boolean: {} } },
          { name: "min_precipitation", default: 10, label: "e_hide_below", selector: { number: { min: 0, max: 100, step: 5, mode: "box" } } },
          { name: "today_label", label: "e_label_for_today", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-forecast-daily-editor", MateriaForecastDailyEditor);
