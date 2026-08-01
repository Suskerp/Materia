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
  /* Mirrors the card's role rule: the tap decides; a hold-only badge is
     judged by its hold. Only explicitly configured actions count. */
  get _actionRole() {
    if (this._config?.layout === "tile") return false;
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
      layout: this._config?.layout === "tile" ? "tile" : "auto",
    };
  }

  _sectionsSignature() {
    return `${this._config?.entity ? "entity" : "none"}|${this._config?.layout || "auto"}|${this._actionRole ? "verb" : "nav"}`;
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
            helper: "Automatic: the shape follows the job — a badge whose gesture changes something wears the asymmetric action corners; one that navigates stays the squircle. Tile is the section-card presentation.",
            selector: { select: { mode: "dropdown", options: [
              { value: "auto", label: "Automatic — shape follows the job" },
              { value: "tile", label: "Tile — section card" },
            ] } },
          },
          ...(this._actionRole
            ? [{
                name: "shape",
                helper: "The asymmetric corners rise to the right; the mirrored one makes a facing pair.",
                selector: { select: { mode: "dropdown", options: [
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
