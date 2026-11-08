import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANT_OPTIONS = [
  { value: "primary", label: "e_primary" },
  { value: "secondary", label: "e_secondary" },
  { value: "tertiary", label: "e_tertiary" },
  { value: "error", label: "gt_state_error" },
  { value: "device", label: "sched_device" },
  { value: "primary-container", label: "e_primar_contai" },
  { value: "secondary-container", label: "e_second_contai" },
  { value: "tertiary-container", label: "e_tertia_contai" },
  { value: "error-container", label: "e_error_contai" },
  { value: "device-container", label: "e_device_contai" },
  { value: "primary-state", label: "e_primar_state" },
  { value: "secondary-state", label: "e_second_state" },
  { value: "tertiary-state", label: "e_tertia_state" },
  { value: "error-state", label: "e_error_state" },
  { value: "device-state", label: "e_device_state" },
  { value: "battery", label: "e_battery" },
];

class MateriaBadgeEditor extends SmartEditorBase {
  /* Mirrors the card's role rule: the tap decides; a hold-only badge is
     judged by its hold. Only explicitly configured actions count. */
  get _actionRole() {
    const verbs = ["toggle", "perform-action", "call-service"];
    const tap = this._config?.tap_action?.action;
    if (tap && tap !== "none") return verbs.includes(tap);
    const hold = this._config?.hold_action?.action;
    return !!hold && hold !== "none" && verbs.includes(hold);
  }

  _formData() {
    return {
      show_state: false,
      variant: "secondary",
      ...(this._actionRole ? { shape: "leaf" } : {}),
      ...this._config,
    };
  }

  _sectionsSignature() {
    return `${this._config?.entity ? "entity" : "none"}|${this._actionRole ? "verb" : "nav"}`;
  }

  get _sections() {
    const hasEntity = !!this._config?.entity;

    const sections = [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", selector: { entity: {} } },
          { name: "name", required: true, template: true, selector: { text: {} } },
          {
            name: "icon",
            required: true,
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
          ...(this._actionRole
            ? [{
                name: "shape",
                helper: "e_asymme_corner_rise",
                selector: { select: { mode: "dropdown", options: [
                  { value: "leaf", label: "e_asymme_corner" },
                  { value: "leaf-flip", label: "e_asymme_corner_mirror" },
                ] } },
              }]
            : []),
          { name: "variant", selector: { select: { mode: "dropdown", options: VARIANT_OPTIONS } } },
          {
            name: "secondary",
            label: "e_second_line",
            template: true,
            helper: "e_one_quiet_line",
            selector: { text: {} },
          },
        ],
      },
    ];

    if (hasEntity) {
      sections.push({
        title: "e_state",
        icon: "mdi:state-machine",
        fields: [
          { name: "show_state", selector: { boolean: {} } },
          { name: "active_state", selector: { text: {} } },
          { name: "state_display", template: true, selector: { text: {} } },
          {
            name: "busy_entity",
            label: "e_also_active_while",
            helper: "e_script_automa_timer",
            selector: { entity: { domain: ["script", "automation", "timer", "input_boolean", "binary_sensor"] } },
          },
        ],
      });
    }

    sections.push(
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
          {
            name: "hold_action",
            helper: "e_hold_delibe_by",
            selector: { ui_action: { default_action: "none" } },
          },
          { name: "double_tap_action", selector: { ui_action: { default_action: "none" } } },
        ],
      }
    );

    return sections;
  }
}

customElements.define("materia-badge-editor", MateriaBadgeEditor);
