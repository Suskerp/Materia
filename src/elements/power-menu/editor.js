import { SmartEditorBase } from "../../utils/smart-editor.js";

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
            label: "e_player_menu_switch",
            selector: { entity: { domain: "media_player", multiple: true } },
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
