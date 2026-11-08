import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHeadingEditor extends SmartEditorBase {
  _formData() {
    return { heading_style: "title", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_heading",
        icon: "mdi:format-title",
        fields: [
          { name: "heading", required: true, selector: { text: {} } },
          {
            name: "heading_style",
            label: "e_style",
            selector: { select: { mode: "dropdown", options: [
              { value: "title", label: "e_title" },
              { value: "subtitle", label: "e_subtitle" },
            ] } },
          },
          { name: "icon", selector: { icon: {} } },
          {
            name: "secondary",
            label: "e_right_aligne_meta",
            template: true,
            selector: { text: {} },
          },
          { name: "tap_action", selector: { ui_action: { default_action: "none" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-heading-editor", MateriaHeadingEditor);
