import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHeadingEditor extends SmartEditorBase {
  _formData() {
    return { heading_style: "title", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Heading",
        icon: "mdi:format-title",
        fields: [
          { name: "heading", required: true, selector: { text: {} } },
          {
            name: "heading_style",
            label: "Style",
            selector: { select: { mode: "dropdown", options: [
              { value: "title", label: "Title" },
              { value: "subtitle", label: "Subtitle" },
            ] } },
          },
          { name: "icon", selector: { icon: {} } },
          {
            name: "secondary",
            label: "Right-aligned meta line",
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
