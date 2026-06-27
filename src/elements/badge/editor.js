import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANT_OPTIONS = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
  { value: "error", label: "Error" },
  { value: "device", label: "Device" },
  { value: "primary-container", label: "Primary Container" },
  { value: "secondary-container", label: "Secondary Container" },
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
  _sectionsSignature() {
    return this._config?.entity ? "entity" : "none";
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
          { name: "variant", selector: { select: { mode: "dropdown", options: VARIANT_OPTIONS } } },
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
          { name: "double_tap_action", selector: { ui_action: { default_action: "none" } } },
        ],
      }
    );

    return sections;
  }
}

customElements.define("materia-badge-editor", MateriaBadgeEditor);
