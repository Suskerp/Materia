import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaHeroEditor extends SmartEditorBase {
  /* Switches must be seeded with the card's own defaults. An option that
     defaults to TRUE but is absent from config renders as `undefined`, which
     ha-form draws as OFF — so the toggle claims the feature is disabled when it
     is actually on, and merely opening the editor and saving would turn it off
     for real. Config still wins, so an explicit false is preserved. */
  _formData() {
    return { burst: true, variant: "hero", alert_tints_hero: true, ...this._config };
  }

  _sectionsSignature() {
    // The burst toggle exists only on the hero tier — rebuild when it flips.
    return this._config?.variant || "";
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", label: "e_eyebro_text", selector: { text: {} } },
          { name: "icon", label: "e_eyebro_icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "title", label: "e_big_title_defaul", template: true, selector: { text: {} } },
          { name: "value", label: "e_headli_number_defaul", template: true, selector: { text: {} } },
          { name: "unit", label: "e_unit_after_number", selector: { text: {} } },
          { name: "caption", label: "e_captio_beside_number", template: true, selector: { text: {} } },
          { name: "secondary", label: "e_sub_line", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            label: "e_emphasis",
            helper: "e_hero_owns_panel",
            selector: { select: { mode: "dropdown", options: [
              { value: "hero", label: "e_hero_filled_owns" },
              { value: "sidekick", label: "e_sideki_quiet_peer" },
            ] } },
          },
          { name: "active_state", label: "e_state_s_count", selector: { text: {} } },
          // The shell hides the burst on sidekicks unconditionally — the
          // decoration is the hero's statement mark — so on a sidekick this
          // toggle is a no-op and offering it just breaks trust in the form.
          ...(this._config?.variant === "sidekick"
            ? []
            : [{ name: "burst", label: "e_show_turnin_burst", selector: { boolean: {} } }]),
          { name: "active_color", label: "e_backgr_while_active", color: true, template: true, selector: { text: {} } },
          { name: "active_color_on", label: "e_text_while_active", color: true, template: true, selector: { text: {} } },
          { name: "color", label: "e_backgr_at_rest", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_at_rest", color: true, template: true, selector: { text: {} } },
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

customElements.define("materia-hero-editor", MateriaHeroEditor);
