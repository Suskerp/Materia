import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClockEditor extends SmartEditorBase {
  _formData() {
    return { hand_width: 5, size: 10, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Clock",
        icon: "mdi:clock-outline",
        fields: [
          {
            name: "numbers",
            selector: { select: { mode: "dropdown", options: [
              { value: "cardinal", label: "Cardinal (12 · 3 · 6 · 9)" },
              { value: "all", label: "All (1–12)" },
              { value: "dots", label: "Hour dots" },
              { value: "none", label: "None" },
            ] } },
          },
          { name: "show_seconds", selector: { boolean: {} } },
          { name: "second_dot", label: "Second hand as rim dot", selector: { boolean: {} } },
          { name: "smooth", label: "Smooth second hand", selector: { boolean: {} } },
          { name: "cookie", label: "Cookie face (12-sided)", selector: { boolean: {} } },
          { name: "digital", label: "Digital readout (HH/MM behind hands)", selector: { boolean: {} } },
          { name: "date", label: "Show date", selector: { boolean: {} } },
          { name: "hand_width", label: "Hand thickness", selector: { number: { min: 1, max: 12, step: 0.5, mode: "slider" } } },
          { name: "size", label: "Size (10 = fill)", selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "face_color", label: "Face", color: true, template: true, selector: { text: {} } },
          { name: "number_color", label: "Numbers", color: true, template: true, selector: { text: {} } },
          { name: "hand_color", label: "Hands", color: true, template: true, selector: { text: {} } },
          { name: "second_color", label: "Second hand", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-clock-editor", MateriaClockEditor);
