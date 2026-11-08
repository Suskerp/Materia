import { SmartEditorBase } from "../../utils/smart-editor.js";
import { alertsField } from "../../utils/media-editors.js";

class MateriaVacuumHeroEditor extends SmartEditorBase {
  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config renders as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false is preserved. */
  _formData() {
    return { brand: "roborock", burst: true, alert_tints_hero: true, variant: "hero", ...this._config };
  }

  _sectionsSignature() {
    return `${this._config?.brand || ""}|${this._config?.variant || ""}`;
  }

  get _sections() {
    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "vacuum" } } },
          { name: "brand", label: "e_brand_profil", selector: { select: { mode: "dropdown", options: [
            { value: "roborock", label: "Roborock" },
            { value: "ecovacs", label: "Ecovacs" },
            { value: "generic", label: "e_generi_other" },
          ] } } },
          { name: "name", label: "e_name", selector: { text: {} } },
          { name: "icon", selector: { icon: {} } },
        ],
      },
      {
        title: "e_entity_overri",
        icon: "mdi:link-variant",
        // Discovery finds these on the vacuum's own device; pin one only when
        // it guesses wrong or the entity lives on a different device.
        fields: [
          { name: "status_entity", label: "e_status_work_mode", selector: { entity: {} } },
          { name: "progress_entity", label: "e_cleani_progre", selector: { entity: {} } },
          { name: "battery_entity", label: "e_battery", selector: { entity: {} } },
          { name: "room_entity", label: "e_curren_room", selector: { entity: {} } },
          { name: "cleaning_time_entity", label: "e_elapse_cleani_time", selector: { entity: {} } },
          { name: "error_entity", label: "vh_vacuum_error", selector: { entity: {} } },
          { name: "dock_error_entity", label: "vh_dock_error", selector: { entity: {} } },
          { name: "mop_drying_entity", label: "e_mop_drying", selector: { entity: {} } },
          { name: "last_clean_entity", label: "e_last_clean_finish", selector: { entity: {} } },
        ],
      },
      {
        title: "e_behaviour",
        icon: "mdi:cog-outline",
        fields: [
          { name: "consumable_hours", label: "e_warn_when_consum", selector: { number: { min: 0, max: 200, mode: "box" } } },
          { name: "consumable_percent", label: "e_warn_when_lifesp", selector: { number: { min: 0, max: 100, mode: "box" } } },
          { name: "docked_label", label: "e_label_at_full", selector: { text: {} } },
          { name: "drying_label", label: "e_drying_sub_line", selector: { text: {} } },
          { name: "alert_tints_hero", label: "e_error_colour_whole", selector: { boolean: {} } },
          { name: "alerts", render: (value) => alertsField(this, value) },
          // The shell hides the burst on sidekicks unconditionally — the
          // decoration is the hero's statement mark — so on a sidekick this
          // toggle is a no-op and offering it just breaks trust in the form.
          ...(this._config?.variant === "sidekick"
            ? []
            : [{ name: "burst", label: "e_show_decora_shape", selector: { boolean: {} } }]),
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            label: "e_emphasis",
            helper: "e_hero_owns_panel2",
            selector: { select: { mode: "dropdown", options: [
              { value: "hero", label: "e_hero_filled_owns" },
              { value: "sidekick", label: "e_sideki_quiet_peer" },
            ] } },
          },
          { name: "working_color", label: "e_backgr_while_workin", color: true, selector: { text: {} } },
          { name: "working_color_on", label: "e_text_while_workin", color: true, selector: { text: {} } },
          { name: "color", label: "e_backgr_at_rest", color: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_at_rest", color: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
      },
    ];
  }
}

customElements.define("materia-vacuum-hero-editor", MateriaVacuumHeroEditor);
