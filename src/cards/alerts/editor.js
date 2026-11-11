import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaAlertsEditor extends SmartEditorBase {
  _formData() {
    return { show: "all", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:alert-outline",
        fields: [
          { name: "entity", required: true, label: "ed_alerts_entity", selector: { entity: { domain: ["binary_sensor", "sensor"] } } },
          { name: "show", label: "ed_alerts_show", selector: { select: { mode: "dropdown", options: [
            { value: "all", label: "ed_alerts_show_all" },
            { value: "active", label: "ed_alerts_show_active" },
          ] } } },
          { name: "max", label: "ed_alerts_max", selector: { number: { min: 1, max: 10, step: 1, mode: "box" } } },
          { name: "expanded", label: "ed_alerts_expanded", selector: { boolean: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-alerts-editor", MateriaAlertsEditor);
