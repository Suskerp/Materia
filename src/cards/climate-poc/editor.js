import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaClimatePocEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
          { name: "water_heater", label: "Water heater (optional)", selector: { entity: { domain: "water_heater" } } },
          {
            name: "zones",
            label: "Zone valves",
            helper: "Per-zone names, icons and temp sensors: use zones: [{entity, name, icon, temp_entity}] in YAML.",
            selector: { entity: { domain: "switch", multiple: true } },
          },
          { name: "zone_icon", label: "Zone icon (e.g. mdi:heating-coil for underfloor)", selector: { icon: {} } },
        ],
      },
      {
        title: "Dial",
        icon: "mdi:thermostat",
        fields: [
          { name: "step", label: "Step", selector: { number: { min: 0.1, max: 2, step: 0.1, mode: "box" } } },
          { name: "min_temp", label: "Dial min (default: entity)", selector: { number: { min: -30, max: 40, step: 0.5, mode: "box" } } },
          { name: "max_temp", label: "Dial max (default: entity)", selector: { number: { min: 0, max: 60, step: 0.5, mode: "box" } } },
          { name: "steppers", label: "Stepper placement", selector: { select: { mode: "dropdown", options: [
            { value: "side", label: "Vertical, beside the dial" },
            { value: "below", label: "Below the dial" },
          ] } } },
          { name: "wave", label: "Wave animation", selector: { select: { mode: "dropdown", options: [
            { value: "auto", label: "Auto (hvac_action, or inferred from temps)" },
            { value: "always", label: "Always (whenever the mode is on)" },
            { value: "never", label: "Never" },
          ] } } },
        ],
      },
      {
        title: "Sections",
        icon: "mdi:wallet-outline",
        secondary: "Zones and Water heater appear automatically",
        fields: [
          { name: "water", label: "Water heater style", selector: { select: { mode: "dropdown", options: [
            { value: "menu", label: "Menu (tap opens operation modes)" },
            { value: "section", label: "Wallet section" },
          ] } } },
          { name: "reserve_height", label: "Keep the height of the tallest section (no reflow when cycling)", selector: { boolean: {} } },
          { name: "zones_title", label: "Zones section title", selector: { text: {} } },
          { name: "water_title", label: "Water heater section title", selector: { text: {} } },
          {
            name: "sections",
            label: "Extra sections (YAML)",
            helper: 'Each extra section is {title, icon, info_entity?, cards: [...]} — e.g. a Schedule section with any cards inside.',
            selector: { object: {} },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-climate-poc-editor", MateriaClimatePocEditor);
