import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaPillEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      {
        name: "tap_action",
        type: "expandable",
        schema: [
          {
            name: "action",
            selector: {
              select: {
                options: [
                  { value: "none", label: "None" },
                  { value: "more-info", label: "More info" },
                  { value: "navigate", label: "Navigate" },
                  { value: "toggle", label: "Toggle" },
                  { value: "call-service", label: "Call service" },
                ],
              },
            },
          },
          { name: "navigation_path", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-pill-editor", MateriaPillEditor);
