import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaForecastDailyEditor extends SmartEditorBase {
  _formData() {
    return { days: 10, show_precipitation: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "days", label: "Days shown", selector: { number: { min: 3, max: 15, step: 1, mode: "slider" } } },
          { name: "show_precipitation", label: "Show precipitation chance", selector: { boolean: {} } },
          { name: "min_precipitation", label: "Hide below (%)", selector: { number: { min: 0, max: 100, step: 5, mode: "box" } } },
          { name: "today_label", label: "Label for today", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-forecast-daily-editor", MateriaForecastDailyEditor);
