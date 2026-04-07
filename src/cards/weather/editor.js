import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaWeatherEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
      { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
    ];
  }
}

customElements.define("materia-weather-editor", MateriaWeatherEditor);
