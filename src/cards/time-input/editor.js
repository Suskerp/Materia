import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaTimeInputEditor extends SmartEditorBase {
  _formData() { return { step: 60, clearable: true, ...this._config }; }

  get _sections() {
    return [{
      title: "e_time",
      icon: "mdi:clock-outline",
      fields: [
        { name: "entity", required: true, selector: { entity: { domain: "input_datetime" } } },
        { name: "name", label: "e_label", selector: { text: {} } },
        { name: "step", label: "e_step_in_second", selector: { number: { min: 60, max: 3600, step: 60, mode: "box" } } },
        { name: "clearable", label: "ed_time_clearable", selector: { boolean: {} } },
      ],
    }];
  }
}

customElements.define("materia-time-input-editor", MateriaTimeInputEditor);
