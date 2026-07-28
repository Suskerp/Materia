import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaVacuumHeroEditor extends SmartEditorBase {
  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config renders as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false is preserved. */
  _formData() {
    return { brand: "roborock", burst: true, alert_tints_hero: true, ...this._config };
  }

  _sectionsSignature() {
    return this._config?.brand || "";
  }

  get _sections() {
    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "vacuum" } } },
          { name: "brand", label: "Brand profile", selector: { select: { mode: "dropdown", options: [
            { value: "roborock", label: "Roborock" },
            { value: "ecovacs", label: "Ecovacs" },
            { value: "generic", label: "Generic / other" },
          ] } } },
          { name: "name", label: "Name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
        ],
      },
      {
        title: "Entity overrides",
        icon: "mdi:link-variant",
        // Discovery finds these on the vacuum's own device; pin one only when
        // it guesses wrong or the entity lives on a different device.
        fields: [
          { name: "status_entity", label: "Status / work mode", selector: { entity: {} } },
          { name: "progress_entity", label: "Cleaning progress (%)", selector: { entity: {} } },
          { name: "battery_entity", label: "Battery", selector: { entity: {} } },
          { name: "room_entity", label: "Current room", selector: { entity: {} } },
          { name: "cleaning_time_entity", label: "Elapsed cleaning time", selector: { entity: {} } },
          { name: "error_entity", label: "Vacuum error", selector: { entity: {} } },
          { name: "dock_error_entity", label: "Dock error", selector: { entity: {} } },
          { name: "mop_drying_entity", label: "Mop drying", selector: { entity: {} } },
          { name: "last_clean_entity", label: "Last clean finished", selector: { entity: {} } },
        ],
      },
      {
        title: "Behaviour",
        icon: "mdi:cog-outline",
        fields: [
          { name: "consumable_percent", label: "Warn when a % lifespan drops to (default 5)", selector: { number: { min: 0, max: 100, mode: "box" } } },
          { name: "docked_label", label: 'Label at a full battery (default "Docked")', selector: { text: {} } },
          { name: "drying_label", label: 'Drying sub-line (default "Drying the mop")', selector: { text: {} } },
          { name: "alert_tints_hero", label: "An alert colours the whole hero", selector: { boolean: {} } },
          { name: "burst", label: "Show the decorative shape", selector: { boolean: {} } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "working_color", label: "Background while working", color: true, selector: { text: {} } },
          { name: "working_color_on", label: "Text while working", color: true, selector: { text: {} } },
          { name: "color", label: "Background at rest", color: true, selector: { text: {} } },
          { name: "color_on", label: "Text at rest", color: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
      },
    ];
  }
}

customElements.define("materia-vacuum-hero-editor", MateriaVacuumHeroEditor);
