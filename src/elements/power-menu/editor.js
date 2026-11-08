import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaPowerMenuEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:power",
        fields: [
          { name: "entity", label: "Player (in an art scope: the scope's)", selector: { entity: { domain: "media_player" } } },
          {
            name: "entities",
            label: "Players the menu switches (empty: the player)",
            selector: { entity: { domain: "media_player", multiple: true } },
          },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "Default (48 px)" },
              { value: "kiosk", label: "Kiosk (44 px)" },
            ] } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-power-menu-editor", MateriaPowerMenuEditor);
