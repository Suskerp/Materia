import { BaseEditor } from "../../utils/editor-helpers.js";

class MateriaCardEditor extends BaseEditor {
  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find(e => e.startsWith("light.")) || "light.example";
    return { entity };
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "variant", selector: { select: { options: ["filled", "tonal"] } } },
      { name: "show_slider", selector: { boolean: {} } },
      { name: "show_sub_buttons", selector: { boolean: {} } },
      { name: "show_stop", selector: { boolean: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
    ];
  }
}

customElements.define("materia-card-editor", MateriaCardEditor);
