import { BaseEditor, computeLabel } from "../../utils/editor-helpers.js";

class MateriaRoomEditor extends BaseEditor {
  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
      {
        name: "entity_type",
        selector: { select: { options: ["light", "cover"] } },
      },
      { name: "columns", selector: { number: { min: 1, max: 6 } } },
      { name: "color_on", selector: { template: {} } },
    ];
  }
}

customElements.define("materia-room-editor", MateriaRoomEditor);
