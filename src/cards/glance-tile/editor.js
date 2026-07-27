import { SmartEditorBase } from "../../utils/smart-editor.js";

const VARIANTS = [
  { value: "auto", label: "Auto (from device class)" },
  { value: "percent", label: "Percent (filling cookie)" },
  { value: "temperature", label: "Temperature (thermometer)" },
  { value: "power", label: "Power (load bars)" },
  { value: "energy", label: "Energy" },
  { value: "binary", label: "On/off (spinning star)" },
  { value: "plain", label: "Plain value" },
];

class MateriaGlanceTileEditor extends SmartEditorBase {
  _formData() {
    return { variant: "auto", ...this._config };
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
        { name: "variant", label: "Visualization", selector: { select: { mode: "dropdown", options: VARIANTS } } },
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
    // Only applies to device_class: moisture (soil sensors) — harmless
    // no-ops elsewhere, so shown whenever the variant COULD resolve there.
    if (!v || v === "auto" || v === "percent") {
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
