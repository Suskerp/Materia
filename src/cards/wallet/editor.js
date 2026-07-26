import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWalletEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Wallet",
        icon: "mdi:wallet-outline",
        fields: [
          { name: "expanded", label: "Initially large section (0 = first; one is always large)", selector: { number: { min: 0, max: 20, step: 1, mode: "box" } } },
        ],
      },
    ];
  }

  _renderExtra() {
    // Sections (title/icon/info_entity/cards) are YAML-managed in the POC.
    return null;
  }
}

customElements.define("materia-wallet-editor", MateriaWalletEditor);
