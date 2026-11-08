import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaDoorbellEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "db_eyebrow",
        icon: "mdi:doorbell",
        fields: [
          {
            name: "entity",
            label: "e_doorbe_entity",
            helper: "e_on_ringin_countd",
            selector: { entity: { domain: ["input_boolean", "binary_sensor", "switch"] } },
          },
          {
            name: "timeout",
            label: "e_popup_timeou_second",
            helper: "e_match_popup_timeou",
            default: 30,
            selector: { number: { min: 5, max: 300, mode: "box" } },
          },
          {
            name: "ring_seconds",
            label: "e_ring_length_second",
            helper: "e_how_long_chime",
            selector: { number: { min: 1, max: 300, mode: "box" } },
          },
          { name: "name", label: "e_eyebro_while_ringin", selector: { text: {} } },
          { name: "place", label: "e_where_ring_from", selector: { text: {} } },
          {
            name: "demo",
            label: "e_previe_phase_demo",
            helper: "e_forces_card_s",
            selector: { select: { mode: "dropdown", options: [
              { value: "ringing", label: "e_ringing" },
              { value: "buzzing", label: "db_buzz_busy" },
              { value: "buzzed", label: "db_buzz_done" },
              { value: "opened", label: "e_opened" },
              { value: "lapsed", label: "e_lapsed" },
            ] } },
          },
        ],
      },
      {
        title: "e_buzz_panel",
        icon: "mdi:bullhorn",
        fields: [
          {
            name: "buzz_action",
            label: "e_tap_buzz_action",
            helper: "e_street_door_buzzer",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "buzz_entity",
            label: "e_buzzin_indica",
            helper: "e_on_buzzin_usuall",
            selector: { entity: {} },
          },
          { name: "buzz_title", label: "e_panel_title_defaul", selector: { text: {} } },
          {
            name: "buzz_sub",
            label: "e_panel_sub_line",
            helper: "e_defaul_street_door",
            selector: { text: {} },
          },
        ],
      },
      {
        title: "e_open_panel",
        icon: "mdi:lock-open-variant-outline",
        fields: [
          {
            name: "lock",
            label: "e_lock",
            helper: "e_gestur_unlock_leave",
            selector: { entity: { domain: "lock" } },
          },
          {
            name: "open_gesture",
            label: "e_open_gestur",
            selector: { select: { mode: "dropdown", options: [
              { value: "slide", label: "e_slide" },
              { value: "hold", label: "e_hold" },
            ] } },
          },
          {
            name: "open_action",
            label: "e_open_action_replac",
            helper: "e_for_let_them",
            selector: { ui_action: { default_action: "none" } },
          },
          { name: "open_title", label: "e_panel_title_defaul2", selector: { text: {} } },
          {
            name: "open_sub",
            label: "e_panel_sub_line",
            helper: "e_defaul_unlock_front",
            selector: { text: {} },
          },
        ],
      },
      {
        title: "e_bottom_row",
        icon: "mdi:dots-horizontal",
        fields: [
          {
            name: "ignore_action",
            label: "db_ignore",
            helper: "e_empty_hides_button",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "replay_action",
            label: "db_replay",
            helper: "e_empty_hides_button2",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "mute_entity",
            label: "e_mute_toggle_entity",
            helper: "e_input_boolea_silenc",
            selector: { entity: { domain: "input_boolean" } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-doorbell-editor", MateriaDoorbellEditor);
