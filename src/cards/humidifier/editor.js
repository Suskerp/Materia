import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHumidifierEditor extends SmartEditorBase {
  _formData() {
    return { show_modes: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:air-humidifier",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "humidifier" } } },
          { name: "name", label: "e_name_option", template: true, selector: { text: {} } },
          { name: "humidity_entity", label: "e_extern_humidi_sensor", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "e_behavior",
        icon: "mdi:tune",
        fields: [
          { name: "step", label: "e_humidi_step_option", selector: { number: { min: 1, max: 20, step: 1, mode: "box" } } },
          { name: "show_modes", label: "e_show_device_modes", default: true, selector: { boolean: {} } },
          { name: "tap_action", label: "e_card_action", selector: { ui_action: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-humidifier-editor", MateriaHumidifierEditor);
