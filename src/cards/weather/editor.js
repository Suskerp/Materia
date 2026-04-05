import { BaseEditor, computeLabel } from "../../utils/editor-helpers.js";

class MateriaWeatherEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
      { name: "name", selector: { text: {} } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
    ];
  }
}

customElements.define("materia-weather-editor", MateriaWeatherEditor);
