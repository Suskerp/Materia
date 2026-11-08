import { SmartEditorBase } from "../../utils/smart-editor.js";

/** Minimal: the items (name, value, card) are edited as YAML. */
class MateriaSwitcherEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Switcher",
        icon: "mdi:tab",
        fields: [
          { name: "items", label: "Items (name, value, card)", required: true, selector: { object: {} } },
          { name: "name", label: "Accessible name", selector: { text: {} } },
          { name: "remember", label: "Remember the selection on this device", selector: { boolean: {} } },
          { name: "key", label: "Storage key (needed to remember)", selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-switcher-editor", MateriaSwitcherEditor);
