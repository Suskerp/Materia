import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClockEditor extends SmartEditorBase {
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
              { value: "none", label: "None" },
            ] } },
          },
          { name: "show_seconds", selector: { boolean: {} } },
          { name: "smooth", label: "Smooth second hand", selector: { boolean: {} } },
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
