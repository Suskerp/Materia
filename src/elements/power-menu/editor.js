import { SmartEditorBase } from "../../utils/smart-editor.js";
import { powerEntitiesField } from "../../utils/media-editors.js";

class MateriaPowerMenuEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:power",
        fields: [
          { name: "entity", label: "e_player_in_art", selector: { entity: { domain: "media_player" } } },
          {
            name: "entities",
            render: (value) => powerEntitiesField(this, value, "entities", "e_player_menu_switch"),
          },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "e_defaul_48_px" },
              { value: "kiosk", label: "e_kiosk_44_px" },
            ] } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-power-menu-editor", MateriaPowerMenuEditor);
