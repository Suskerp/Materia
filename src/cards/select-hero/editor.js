import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaSelectHeroEditor extends SmartEditorBase {
  /* Mirror the card's own defaults so the form shows what it is ACTUALLY
     doing. Absent-means-true options are the dangerous ones: ha-form draws
     `undefined` as OFF, so the toggle would claim a live feature is disabled
     and merely opening the editor and saving would turn it off for real.
     Config still wins, so an explicit false survives. */
  _formData() {
    return { variant: "hero", burst: true, alert_tints_hero: true, ...this._config };
  }

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
          { name: "burst", label: "Show the decorative shape", selector: { boolean: {} } },
          { name: "color", label: "Block background", color: true, selector: { text: {} } },
          { name: "color_on", label: "Block text", color: true, selector: { text: {} } },
        ],
      },
      {
        // Inherited from the hero shell, so a mode card can carry the same
        // connected strip as its hero — e.g. "Mop pad still drying".
        title: "Alerts",
        icon: "mdi:alert-circle-outline",
        expanded: false,
        fields: [
          {
            name: "alerts",
            label: "Alert strip",
            helper: "List of { entity?, state?, text (template), icon?, color?, tap_action? }. First match wins. A template that renders empty means no alert.",
            selector: { object: {} },
          },
          { name: "alert_tints_hero", label: "An alert recolours the whole block", selector: { boolean: {} } },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-select-hero-editor", MateriaSelectHeroEditor);
