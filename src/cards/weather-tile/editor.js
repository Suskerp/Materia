import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaWeatherTileEditor extends SmartEditorBase {
  _formData() {
    return {
      show_minmax: true,
      tilt: -26,
      icon_size: 27,
      text_size: 24,
      width: 100,
      height: 64,
      temp_x: 16,
      temp_y: 17,
      icon_x: 16,
      icon_y: 20,
      ...this._config,
    };
  }

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: { domain: "weather" } } },
          { name: "temperature_entity", label: "Temperature sensor (optional)", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
          {
            name: "icon",
            label: "Custom icon (overrides the colored glyph)",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
        ],
      },
      {
        title: "Min / Max",
        icon: "mdi:thermometer-lines",
        fields: [
          { name: "show_minmax", label: "Show min / max", selector: { boolean: {} } },
          { name: "high_entity", label: "High sensor (optional)", selector: { entity: { domain: "sensor" } } },
          { name: "low_entity", label: "Low sensor (optional)", selector: { entity: { domain: "sensor" } } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "tilt", label: "Pill tilt (° — negative rises to the right)", selector: { number: { min: -45, max: 45, step: 1, mode: "slider" } } },
          { name: "width", label: "Width (% of cell)", selector: { number: { min: 40, max: 100, step: 1, mode: "slider" } } },
          { name: "height", label: "Height (% of width)", selector: { number: { min: 40, max: 100, step: 1, mode: "slider" } } },
          { name: "icon_size", label: "Weather icon size", selector: { number: { min: 14, max: 46, step: 1, mode: "slider" } } },
          { name: "text_size", label: "Temperature text size", selector: { number: { min: 12, max: 42, step: 1, mode: "slider" } } },
          { name: "temp_x", label: "Temperature X (% from edge)", selector: { number: { min: 0, max: 60, step: 1, mode: "slider" } } },
          { name: "temp_y", label: "Temperature Y (% from top)", selector: { number: { min: 0, max: 70, step: 1, mode: "slider" } } },
          { name: "icon_x", label: "Icon X (% from edge)", selector: { number: { min: 0, max: 70, step: 1, mode: "slider" } } },
          { name: "icon_y", label: "Icon Y (% from bottom)", selector: { number: { min: 0, max: 70, step: 1, mode: "slider" } } },
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / temperature", color: true, template: true, selector: { text: {} } },
          { name: "minmax_color", label: "Min / max color", color: true, template: true, selector: { text: {} } },
          { name: "cycle_icons", label: "Cycle icons (preview alignment)", selector: { boolean: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
    ];
  }
}

customElements.define("materia-weather-tile-editor", MateriaWeatherTileEditor);
