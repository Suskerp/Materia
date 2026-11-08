import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaConfirmEditor extends SmartEditorBase {
  /* Every boolean, number and enum seeded at the card's REAL default. An
     option absent from config arrives as `undefined`, ha-form draws it as
     off/0/empty, and merely opening this editor and saving writes that wrong
     value for good. This bit the alarm card once with a pending timeout that
     silently halved itself, so it is checked here by assertion too. */
  _formData() {
    return {
      gesture: "hold",
      require_gesture: "activate",
      hold_ms: 800,
      threshold: 0.55,
      pending_timeout_ms: 10000,
      caption_warn: true,
      ...this._config,
    };
  }

  _sectionsSignature() {
    return [
      this._config?.entity ? "e" : "",
      this._config?.gesture || "hold",
      this._config?.require_gesture || "activate",
      this._config?.action ? "a" : "",
    ].join("|");
  }

  get _sections() {
    const hold = (this._config?.gesture ?? "hold") !== "slide";
    const hasEntity = !!this._config?.entity;
    const both = this._config?.require_gesture === "both";

    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "e_entity_reflec_drive",
            helper:
              "e_with_entity_no",
            selector: { entity: {} },
          },
          ...(hasEntity
            ? [{
                name: "active_state",
                label: "e_state_counts_as",
                helper: "e_defaul_usual_on",
                selector: { text: {} },
              }]
            : []),
          {
            name: "action",
            label: "e_action_when_commit",
            helper: "e_fired_when_gestur",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "deactivate_action",
            label: "e_action_when_switch",
            helper: "e_fired_by_active",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "e_gesture",
        icon: "mdi:gesture-tap-hold",
        fields: [
          {
            name: "gesture",
            label: "e_commit_gestur",
            selector: { select: { mode: "dropdown", options: [
              { value: "hold", label: "e_press_hold" },
              { value: "slide", label: "e_slide_across" },
            ] } },
          },
          {
            name: "require_gesture",
            label: "e_which_direct_needs",
            helper:
              "e_turnin_on_only",
            selector: { select: { mode: "dropdown", options: [
              { value: "activate", label: "e_only_turnin_on" },
              { value: "both", label: "e_both_direct" },
            ] } },
          },
          ...(hold
            ? [{
                name: "hold_ms",
                label: "e_hold_for_ms",
                helper: "e_keep_above_500ms",
                selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
              }]
            : [{
                name: "threshold",
                label: "e_fracti_track_cross",
                selector: { number: { min: 0.2, max: 1, step: 0.05, mode: "box" } },
              }]),
          ...(hasEntity
            ? [{
                name: "pending_timeout_ms",
                label: "e_give_up_waitin2",
                selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
              }]
            : []),
        ],
      },
      {
        title: "e_words",
        icon: "mdi:text-short",
        fields: [
          { name: "eyebrow", label: "e_eyebro_option", template: true, selector: { text: {} } },
          {
            name: "label",
            label: "e_gestur_label",
            helper: "e_instru_across_track",
            template: true,
            selector: { text: {} },
          },
          {
            name: "caption",
            label: "e_warnin_conseq_line",
            helper:
              "e_point_card_shown",
            template: true,
            selector: { text: {} },
          },
          { name: "caption_warn", label: "e_colour_warnin_line", selector: { boolean: {} } },
          {
            name: "active_label",
            label: "e_label_while_active",
            template: true,
            selector: { text: {} },
          },
          {
            name: "active_caption",
            label: "e_captio_while_active",
            helper: "e_falls_back_warnin",
            template: true,
            selector: { text: {} },
          },
          ...(both
            ? []
            : [{
                name: "deactivate_hint",
                label: "e_active_face_hint",
                selector: { text: {} },
              }]),
          ...(hasEntity
            ? [{ name: "busy_label", label: "e_while_waitin_defaul", selector: { text: {} } }]
            : []),
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "active_color", label: "e_backgr_while_active", color: true, selector: { text: {} } },
          { name: "active_color_on", label: "e_text_while_active", color: true, selector: { text: {} } },
          { name: "track_color", label: "e_gestur_track", color: true, selector: { text: {} } },
          { name: "track_color_on", label: "e_text_on_track", color: true, selector: { text: {} } },
          ...(hold
            ? []
            : [
                { name: "handle_color", label: "e_slide_handle", color: true, selector: { text: {} } },
                { name: "handle_color_on", label: "e_handle_glyph", color: true, selector: { text: {} } },
              ]),
          { name: "active_icon", label: "e_icon_while_active", selector: { icon: {} } },
          { name: "gesture_icon", label: "e_icon_on_gestur", selector: { icon: {} } },
        ],
      },
      {
        title: "e_disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-confirm-editor", MateriaConfirmEditor);
