import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaListEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "title", label: "Title", selector: { text: {} } },
          { name: "icon", label: "Header icon", selector: { icon: {} } },
          { name: "entities", label: "Entities (rows)", selector: { entity: { multiple: true } } },
        ],
      },
    ];
  }
}

customElements.define("materia-list-editor", MateriaListEditor);
