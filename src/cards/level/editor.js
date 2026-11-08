import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaLevelEditor extends SmartEditorBase {
  _formData() {
    return { variant: "filled", slider_size: "xs", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "label", label: "e_label", template: true, selector: { text: {} } },
          {
            name: "attribute",
            label: "e_attrib_holdin_level",
            helper:
              "e_defaul_per_domain",
            selector: { text: {} },
          },
          { name: "icon", label: "e_leadin_icon", template: true, selector: { icon: {} } },
          {
            name: "control_entity",
            label: "e_traili_contro_entity",
            helper: "e_adds_aligne_circul",
            selector: { entity: {} },
          },
          { name: "control_icon", label: "e_traili_contro_icon", selector: { icon: {} } },
          { name: "control_label", label: "e_traili_contro_access", selector: { text: {} } },
          { name: "control_action", label: "e_traili_contro_action", selector: { ui_action: { default_action: "toggle" } } },
        ],
      },
      {
        title: "e_range",
        icon: "mdi:ruler",
        secondary: "e_left_empty_these",
        expanded: false,
        fields: [
          {
            name: "min",
            label: "e_minimu_entity_units",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "max",
            label: "e_maximu_entity_units",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "max_entity",
            label: "e_maximu_from_helper",
            helper: "e_option_number_input",
            selector: { entity: { domain: ["number", "input_number", "sensor"] } },
          },
          {
            name: "max_entity_factor",
            label: "e_maximu_helper_scale",
            helper: "e_for_exampl_0",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "step",
            label: "e_step_entity_units",
            selector: { number: { mode: "box", step: "any" } },
          },
          {
            name: "unit",
            label: "e_unit_shown_after",
            helper: "e_defaul_entity_s",
            selector: { text: {} },
          },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        expanded: false,
        fields: [
          {
            name: "variant",
            label: "e_container",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "filled", label: "e_filled_card" },
                  { value: "flat", label: "e_flat_no_backgr" },
                ],
              },
            },
          },
          {
            name: "slider_size",
            label: "e_slider_size",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "xs", label: "XS · 16 dp" },
                  { value: "s", label: "S · 24 dp" },
                  { value: "m", label: "M · 40 dp" },
                ],
              },
            },
          },
          { name: "color", label: "e_tile_backgr", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_conten_color_on", color: true, template: true, selector: { text: {} } },
          { name: "slider_color", label: "e_active_track_handle", color: true, template: true, selector: { text: {} } },
          { name: "slider_track_color", label: "e_inacti_track", color: true, template: true, selector: { text: {} } },
          {
            name: "hide_stops",
            label: "e_hide_stop_indica",
            helper: "e_small_m3_dots",
            selector: { boolean: {} },
          },
        ],
      },
      {
        title: "e_advanced",
        icon: "mdi:tune",
        expanded: false,
        fields: [
          { name: "service", label: "e_overri_servic_domain", selector: { text: {} } },
          { name: "service_key", label: "e_overri_servic_data", selector: { text: {} } },
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

customElements.define("materia-level-editor", MateriaLevelEditor);
