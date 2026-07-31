import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANTS = [
  { value: "percent", label: "Percent (filling cookie)" },
  { value: "battery", label: "Battery (vertical bar)" },
  { value: "temperature", label: "Temperature (thermometer)" },
  { value: "power", label: "Power (load bars)" },
  { value: "energy", label: "Energy" },
  { value: "binary", label: "On/off (spinning star)" },
  { value: "plain", label: "Plain value" },
  { value: "vacuum", label: "Robot vacuum (state + room + battery bar)" },
];

class MateriaGlanceTileEditor extends SmartEditorBase {
  /* The threshold/label defaults belong to the soil-moisture scale the percent
     tile draws, and the full-load watts to the power tile — both scoped to the
     variant, exactly like the fields they sit next to. The temperature scale is
     deliberately absent: its default depends on the entity's unit (10–30 °C,
     50–86 °F), so the field labels state it instead. */
  _formData() {
    const v = this._config?.variant;
    const perVariant =
      v === "percent"
        ? {
            critical_dry: 10,
            dry_below: 20,
            soggy_above: 60,
            dry_label: "Needs water now",
            soon_label: "Water soon",
            optimal_label: "Optimal",
            wet_label: "Overwatered",
          }
        : v === "power"
          ? { max: 3000 }
          : {};
    return { variant: "percent", ...perVariant, ...this._config };
  }

  _sectionsSignature() {
    return this._config?.variant || "";
  }

  get _sections() {
    const v = this._config?.variant;

    const content = {
      title: "Content",
      icon: "mdi:card-text-outline",
      fields: [
        { name: "entity", required: true, selector: { entity: {} } },
        { name: "variant", label: "Category", required: true, selector: { select: { mode: "dropdown", options: VARIANTS } } },
        { name: "name", label: "Title", selector: { text: {} } },
        { name: "icon", label: "Icon (overrides entity icon)", selector: { icon: {} } },
        { name: "label", label: "Subtitle", selector: { text: {} } },
      ],
    };

    const extras = { title: "Options", icon: "mdi:tune", fields: [] };
    if (v === "temperature") {
      extras.fields.push(
        { name: "min", label: "Scale min (default 10°)", selector: { number: { mode: "box" } } },
        { name: "max", label: "Scale max (default 30°)", selector: { number: { mode: "box" } } },
      );
    }
    if (v === "power") {
      extras.fields.push({ name: "max", label: "Full-load watts (default 3000)", selector: { number: { mode: "box" } } });
    }
    if (v === "plain") {
      extras.fields.push({ name: "battery_entity", label: "Paired battery sensor (adds the vertical bar)", selector: { entity: { domain: "sensor" } } });
    }
    if (v === "vacuum") {
      extras.fields.push(
        { name: "status_entity", label: "Detailed status sensor (shown as the state)", selector: { entity: { domain: "sensor" } } },
        { name: "room_entity", label: "Current room sensor (shown while cleaning)", selector: { entity: { domain: "sensor" } } },
        { name: "battery_entity", label: "Battery sensor (adds the vertical bar)", selector: { entity: { domain: "sensor" } } },
      );
    }
    // Only meaningful for device_class: moisture (soil sensors) — harmless
    // no-ops for battery/humidity/other percent entities.
    if (v === "percent") {
      extras.fields.push(
        { name: "critical_dry", label: "Critical dry, ≤% (default 10 — red)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_below", label: "Water soon, ≤% (default 20 — orange)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "soggy_above", label: "Overwatered, >% (default 60 — blue)", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_label", label: '"Needs water now" label', selector: { text: {} } },
        { name: "soon_label", label: '"Water soon" label', selector: { text: {} } },
        { name: "optimal_label", label: '"Optimal" label', selector: { text: {} } },
        { name: "wet_label", label: '"Overwatered" label', selector: { text: {} } },
      );
    }

    const appearance = {
      title: "Appearance",
      icon: "mdi:palette-outline",
      fields: [
        { name: "accent", label: "Accent color (fill / bars / star)", color: true, selector: { text: {} } },
        { name: "color", label: "Tile color", color: true, template: true, selector: { text: {} } },
        { name: "color_on", label: "Text color", color: true, template: true, selector: { text: {} } },
      ],
    };

    const actions = {
      title: "Actions",
      icon: "mdi:gesture-tap",
      fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
    };

    return extras.fields.length
      ? [content, extras, appearance, actions]
      : [content, appearance, actions];
  }
}

customElements.define("materia-glance-tile-editor", MateriaGlanceTileEditor);
