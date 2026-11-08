import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClockEditor extends SmartEditorBase {
  _formData() {
    return { hand_width: 5, size: 10, show_seconds: true, numbers: "cardinal", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_clock",
        icon: "mdi:clock-outline",
        fields: [
          {
            name: "numbers",
            selector: { select: { mode: "dropdown", options: [
              { value: "cardinal", label: "e_cardin_12_3" },
              { value: "all", label: "e_all_1_12" },
              { value: "dots", label: "e_hour_dots" },
              { value: "none", label: "level_none" },
            ] } },
          },
          { name: "show_seconds", selector: { boolean: {} } },
          { name: "second_dot", label: "e_second_hand_as", selector: { boolean: {} } },
          { name: "smooth", label: "e_smooth_second_hand", selector: { boolean: {} } },
          { name: "cookie", label: "e_cookie_face_12", selector: { boolean: {} } },
          { name: "digital", label: "e_digita_readou_hh", selector: { boolean: {} } },
          { name: "date", label: "e_show_date", selector: { boolean: {} } },
          { name: "hand_width", label: "e_hand_thickn", selector: { number: { min: 1, max: 12, step: 0.5, mode: "slider" } } },
          { name: "size", label: "e_size_10_fill", selector: { number: { min: 1, max: 10, step: 1, mode: "slider" } } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "face_color", label: "e_face", color: true, template: true, selector: { text: {} } },
          { name: "number_color", label: "e_numbers", color: true, template: true, selector: { text: {} } },
          { name: "hand_color", label: "e_hands", color: true, template: true, selector: { text: {} } },
          { name: "second_color", label: "e_second_hand", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-clock-editor", MateriaClockEditor);
