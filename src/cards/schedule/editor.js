import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaScheduleEditor extends SmartEditorBase {
  /* Mirror runtime defaults without persisting them merely by opening the
     editor. SmartEditor gives otherwise-unspecified booleans a visible `false`;
     true defaults must be declared here because they are semantic choices. */
  _formData() {
    // presentation is a closed select; the three strings are runtime
    // (i18n-translated) defaults that must not be frozen into config.
    return {
      presentation: "inline",
      editor_presentation: "inline",
      schedule_types: ["window"],
      show_triggers: true,
      ...this._config,
    };
  }

  get _sections() {
    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        expanded: true,
        fields: [
          {
            name: "name",
            label: "e_eyebro_above_chosen",
            helper: "e_what_being_schedu",
            selector: { text: {} },
          },
          {
            name: "presentation",
            label: "e_presentation",
            helper: "e_sheet_drops_collap",
            selector: { select: { mode: "dropdown", options: [
              { value: "inline", label: "e_inline_collap_strip" },
              { value: "sheet", label: "e_sheet_always_open" },
              { value: "manager", label: "e_manage_list_add" },
            ] } },
          },
          { name: "empty_label", label: "e_strip_title_when", selector: { text: {} } },
          { name: "empty_sub", label: "e_strip_sub_line", selector: { text: {} } },
        ],
      },
      {
        title: "e_wiring",
        icon: "mdi:transit-connection-variant",
        expanded: false,
        // $placeholders are substituted by the card before the service is
        // called — see the note in index.js on why this is not Jinja.
        fields: [
          {
            name: "confirm_action",
            label: "e_on_confir",
            helper: "e_use_dateti_date",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "trigger_action",
            label: "e_on_confir_trigge",
            helper: "e_falls_back_confir",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "close_action",
            label: "e_how_dismis_modal",
            helper: "e_sheet_presen_only",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "e_shortcuts",
        icon: "mdi:clock-fast",
        expanded: false,
        fields: [
          {
            name: "presets",
            label: "e_at_time_shortc",
            helper: "e_list_label_offset",
            selector: { object: {} },
          },
          { name: "minutes", label: "e_minute_option_defaul", selector: { object: {} } },
        ],
      },
      {
        title: "e_manage_schedu",
        icon: "mdi:clock-start",
        expanded: false,
        // Turns the clock tab into a recurring start+stop range instead of a
        // single moment. schedule_entity both seeds the picker from what is
        // already live and is what gets written back to on save.
        fields: [
          {
            name: "schedule_types",
            label: "e_schedu_people_may",
            helper: "e_choose_recurr_window",
            selector: { select: { multiple: true, options: [
              { value: "window", label: "e_recurr_start_end" },
              { value: "once", label: "e_one_time_action" },
              { value: "plan", label: "e_multi_step_plan" },
            ] } },
          },
          {
            name: "manager_tag",
            label: "e_schedu_group",
            helper: "e_friend_intern_tag",
            selector: { text: {} },
          },
          {
            name: "plans",
            label: "e_multi_step_plans",
            helper: "e_advanc_list_key",
            selector: { object: {} },
          },
          {
            name: "manage_schedules",
            label: "e_manage_multip_schedu",
            helper: "e_shows_parent_friend",
            selector: { boolean: {} },
          },
          {
            name: "editor_presentation",
            label: "e_open_schedu_editor",
            helper: "e_popup_keeps_dashbo",
            selector: { select: { mode: "dropdown", options: [
              { value: "popup", label: "e_popup" },
              { value: "inline", label: "e_expand_inline" },
            ] } },
          },
          {
            name: "targets",
            label: "e_device_friend_action",
            helper: "e_list_entity_name",
            selector: { object: {} },
          },
          {
            name: "schedule_entities",
            label: "e_additi_schedu_entiti",
            helper: "e_option_explic_switch",
            selector: { entity: { domain: "switch", multiple: true } },
          },
          {
            name: "schedule_entity",
            label: "e_schedu_entity",
            helper: "e_switch_schedu_entity",
            selector: { entity: { domain: "switch" } },
          },
          {
            name: "show_stop",
            label: "e_start_stop_window",
            helper: "e_for_drivin_custom",
            selector: { boolean: {} },
          },
          {
            name: "actions",
            label: "e_start_action",
            helper: "e_action_perfor_when",
            selector: { object: {} },
          },
          {
            name: "end_actions",
            label: "e_end_action",
            helper: "e_action_perfor_when2",
            selector: { object: {} },
          },
        ],
      },
      {
        title: "e_triggers",
        icon: "mdi:sensors",
        expanded: false,
        // The "When..." tab's list. Left as raw objects rather than a managed
        // list UI: this is a mocked POC, and the shape will change as soon as
        // there is a real backend deciding what a trigger even is.
        fields: [
          {
            name: "show_triggers",
            label: "e_show_when_tab",
            helper: "e_disabl_for_straig",
            selector: { boolean: {} },
          },
          {
            name: "triggers",
            label: "e_non_clock_trigge",
            helper: "e_list_key_name",
            selector: { object: {} },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-schedule-editor", MateriaScheduleEditor);
