import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaSelectHeroEditor extends SmartEditorBase {
  get _sections() {
    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: ["select", "input_select"] } } },
          { name: "name", label: "Eyebrow above the option name", selector: { text: {} } },
          {
            name: "options",
            label: "Options",
            helper: "List of { value, label, short?, secondary?, glyph? (SVG path, 48x34 grid), icon?, tap_action? }. Empty uses the select's own options, plainly.",
            selector: { object: {} },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            label: "Emphasis",
            helper: "Hero is the filled statement block; sidekick is its quiet companion for pages that already have a hero.",
            selector: { select: { mode: "dropdown", options: [
              { value: "hero", label: "Hero — filled, owns the panel" },
              { value: "sidekick", label: "Sidekick — quiet peer of the bars" },
            ] } },
          },
          { name: "color", label: "Block background", color: true, selector: { text: {} } },
          { name: "color_on", label: "Block text", color: true, selector: { text: {} } },
        ],
      },
    ];
  }
}

customElements.define("materia-select-hero-editor", MateriaSelectHeroEditor);
