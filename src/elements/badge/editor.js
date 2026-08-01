import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANT_OPTIONS = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
  { value: "error", label: "Error" },
  { value: "device", label: "Device" },
  { value: "primary-container", label: "Primary Container" },
  { value: "secondary-container", label: "Secondary Container" },
  { value: "tertiary-container", label: "Tertiary Container" },
  { value: "error-container", label: "Error Container" },
  { value: "device-container", label: "Device Container" },
  { value: "primary-state", label: "Primary State" },
  { value: "secondary-state", label: "Secondary State" },
  { value: "tertiary-state", label: "Tertiary State" },
  { value: "error-state", label: "Error State" },
  { value: "device-state", label: "Device State" },
  { value: "battery", label: "Battery" },
];

class MateriaBadgeEditor extends SmartEditorBase {
  _formData() {
    return {
      show_state: false,
      variant: "secondary",
      layout: "badge",
      ...(this._config?.layout === "action" ? { shape: "pill" } : {}),
      ...this._config,
    };
  }

  _sectionsSignature() {
    return `${this._config?.entity ? "entity" : "none"}|${this._config?.layout || "badge"}`;
  }

  get _sections() {
    const hasEntity = !!this._config?.entity;

    const sections = [
      {
        title: "Content",
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
          {
            name: "layout",
            helper: "Badge is the navigate squircle; action is the button badge (does something); tile is the badge grown into a section card.",
            selector: { select: { mode: "dropdown", options: [
              { value: "badge", label: "Badge — navigate squircle" },
              { value: "action", label: "Action — button badge" },
              { value: "tile", label: "Tile — section card" },
            ] } },
          },
          ...(this._config?.layout === "action"
            ? [{
                name: "shape",
                helper: "Pill is the stock action shape; the asymmetric corners are M3's shape-morph corners — use the mirrored one to make a facing pair.",
                selector: { select: { mode: "dropdown", options: [
                  { value: "pill", label: "Pill" },
                  { value: "leaf", label: "Asymmetric corners" },
                  { value: "leaf-flip", label: "Asymmetric corners — mirrored" },
                ] } },
              }]
            : []),
          { name: "variant", selector: { select: { mode: "dropdown", options: VARIANT_OPTIONS } } },
          {
            name: "tag",
            label: "Gesture tag",
            template: true,
            helper: 'Leave empty for none. The word "auto" shows the configured gesture — hold when one is set, tap otherwise.',
            selector: { text: {} },
          },
          {
            name: "secondary",
            label: "Secondary line",
            template: true,
            helper: "One quiet line under the name. Left empty, a quiet badge shows its state word here instead.",
            selector: { text: {} },
          },
        ],
      },
    ];

    if (hasEntity) {
      sections.push({
        title: "State",
        icon: "mdi:state-machine",
        fields: [
          { name: "show_state", selector: { boolean: {} } },
          { name: "active_state", selector: { text: {} } },
          { name: "state_display", template: true, selector: { text: {} } },
        ],
      });
    }

    sections.push(
      {
        title: "Stages",
        icon: "mdi:chart-timeline",
        expanded: false,
        fields: [
          {
            name: "stages",
            label: "Stage track",
            helper: "List of { entity, state? } — one bar along the bottom per stage, lit while the entity matches. state may be a single value or a list; omitted, the domain's active state applies (a timer lights while running).",
            selector: { object: {} },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / icon", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
          {
            name: "hold_action",
            helper: "A hold is deliberate by construction — the right slot for actions a stray tap must never fire.",
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
