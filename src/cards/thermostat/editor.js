import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaThermostatEditor extends SmartEditorBase {
  _formData() {
    return { step: 0.5, show_modes: true, show_current: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "temperature_entity", label: "Current-temp sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          { name: "step", label: "Step", selector: { number: { min: 0.1, max: 2, step: 0.1, mode: "box" } } },
          { name: "show_current", label: "Show current temperature", selector: { boolean: {} } },
          { name: "current_label", label: '"Currently" label', selector: { text: {} } },
          { name: "wave", label: "Wave animation", selector: { select: { mode: "dropdown", options: [
            { value: "auto", label: "Auto (hvac_action, or inferred from temps)" },
            { value: "always", label: "Always (whenever the mode is on)" },
            { value: "never", label: "Never" },
          ] } } },
        ],
      },
      {
        title: "Modes",
        icon: "mdi:sun-snowflake-variant",
        fields: [
          { name: "show_modes", label: "Show mode buttons", selector: { boolean: {} } },
          { name: "mode_size", label: "Mode button size", selector: { select: { mode: "dropdown", options: [
            { value: "s", label: "S" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
            { value: "xl", label: "XL" },
          ] } } },
        ],
      },
    ];
  }
}

customElements.define("materia-thermostat-editor", MateriaThermostatEditor);
