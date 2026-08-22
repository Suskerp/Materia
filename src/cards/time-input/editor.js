import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaTimeInputEditor extends SmartEditorBase {
  _formData() { return { step: 60, ...this._config }; }

  _sections() {
    return [{
      title: "Time",
      icon: "mdi:clock-outline",
      fields: [
        { name: "entity", required: true, selector: { entity: { domain: "input_datetime" } } },
        { name: "name", label: "Label", selector: { text: {} } },
        { name: "step", label: "Step in seconds", selector: { number: { min: 60, max: 3600, step: 60, mode: "box" } } },
      ],
    }];
  }
}

customElements.define("materia-time-input-editor", MateriaTimeInputEditor);
