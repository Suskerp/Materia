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
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "moon_entity", label: "Moon phase sensor (default: sensor.moon)", selector: { entity: { domain: "sensor" } } },
          { name: "days", label: "Days shown", selector: { number: { min: 3, max: 15, step: 1, mode: "slider" } } },
          { name: "show_hourly", label: "Tap a day to expand its hourly detail", selector: { boolean: {} } },
          { name: "show_precipitation", label: "Show precipitation chance", selector: { boolean: {} } },
          { name: "min_precipitation", default: 10, label: "Hide below (%)", selector: { number: { min: 0, max: 100, step: 5, mode: "box" } } },
          { name: "today_label", label: "Label for today", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-forecast-daily-editor", MateriaForecastDailyEditor);
