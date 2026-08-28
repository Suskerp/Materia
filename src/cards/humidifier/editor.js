import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHumidifierEditor extends SmartEditorBase {
  _formData() {
    return { show_modes: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:air-humidifier",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "humidifier" } } },
          { name: "name", label: "Name (optional)", template: true, selector: { text: {} } },
          { name: "humidity_entity", label: "External humidity sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Behavior",
        icon: "mdi:tune",
        fields: [
          { name: "step", label: "Humidity step (optional)", selector: { number: { min: 1, max: 20, step: 1, mode: "box" } } },
          { name: "show_modes", label: "Show device modes", default: true, selector: { boolean: {} } },
          { name: "tap_action", label: "Card action", selector: { ui_action: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-humidifier-editor", MateriaHumidifierEditor);
