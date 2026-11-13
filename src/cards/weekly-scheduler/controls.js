/**
 * What a period does to one device, drawn from that device's own settings
 * schema (targets.js): an On/Off or mode choice becomes a connected button
 * group, a lone temperature becomes the big stepper with quick picks, other
 * numbers a compact stepper or an M3 slider, and anything else (a select, an
 * action) falls back to HA's own selector. So a light, a thermostat, a fan or
 * a script all get the right control without a per-domain screen.
 */
import { html, nothing } from "lit";
import { settingsSchema } from "./targets.js";

const SLIDERS = new Set(["brightness_pct", "percentage", "color_temp_kelvin"]);
const STEPPED = new Set(["temperature", "target_temp_low", "target_temp_high", "humidity", "value"]);

const round = (value, step) => {
  const decimals = String(step).split(".")[1]?.length || 0;
  return Number((Math.round(value / step) * step).toFixed(decimals));
};
const fmt = (value, hass) => (value == null || value === "" ? "–" : Number(value).toLocaleString(hass?.locale?.language || undefined));

/** Quick picks under a lone temperature: four common targets inside the device's range. */
export function quickTemperatures(member, min, max, unit) {
  const list = Array.isArray(member.quick) && member.quick.length ? member.quick : unit === "°F" ? [61, 64, 68, 72] : [16, 18, 20, 22];
  return list.map(Number).filter((v) => Number.isFinite(v) && v >= min && v <= max);
}

/** A connected M3 button group for a state the sheet owns. */
export function choiceGroup(host, options, selected, change, { multi = false, label = "" } = {}) {
  // A multi-select wraps by default; a row of days stays one row.
  const value = multi ? selected.join(",") : String(selected ?? "");
  return html`<materia-button-group
    .hass=${host.hass}
    .value=${value}
    .config=${{ group: "connected", size: "s", preset: "primary", variant: "tonal", multi_select: multi, active_shape: multi ? "square" : undefined, columns: multi ? options.length : undefined, equal_width: options.length > 4, aria_label: label, options }}
    @option-selected=${(e) => {
      e.stopPropagation();
      change(e.detail.option.value);
    }}
  ></materia-button-group>`;
}

function stepper(host, field, value, set, big) {
  const { min = 0, max = 100, step = 1, unit_of_measurement: unit = "" } = field.selector.number;
  const n = Number.isFinite(Number(value)) ? Number(value) : min;
  const go = (delta) => set(round(Math.min(max, Math.max(min, n + delta)), step));
  const label = host._label("lower"), raise = host._label("raise");
  return html`<div class="stepper ${big ? "big" : ""}">
    ${big ? nothing : html`<span class="stepper-label">${field.label}</span>`}
    <button class="tonal-icon" aria-label=${`${label} ${field.label}`} ?disabled=${n <= min} @click=${() => go(-step)}><ha-icon icon="mdi:minus"></ha-icon></button>
    <output class="stepper-value" aria-live="polite">${fmt(n, host.hass)}<span>${unit}</span></output>
    <button class="tonal-icon" aria-label=${`${raise} ${field.label}`} ?disabled=${n >= max} @click=${() => go(step)}><ha-icon icon="mdi:plus"></ha-icon></button>
  </div>`;
}

function slider(host, field, value, set) {
  const { min = 0, max = 100, step = 1, unit_of_measurement: unit = "" } = field.selector.number;
  const n = Number.isFinite(Number(value)) ? Number(value) : min;
  const pct = ((n - min) / (max - min || 1)) * 100;
  return html`<label class="slider-field">
    <span class="field-label">${field.label} · ${fmt(n, host.hass)}${unit === "%" ? "%" : ` ${unit}`}</span>
    <input type="range" class="m3-slider" min=${min} max=${max} step=${step} .value=${String(n)} style=${`--pct:${pct}%`}
      @input=${(e) => { e.target.style.setProperty("--pct", `${((Number(e.target.value) - min) / (max - min || 1)) * 100}%`); }}
      @change=${(e) => set(Number(e.target.value))}>
  </label>`;
}

/**
 * The controls for one device in one phase. `settings` is that phase's data;
 * `change(next)` receives the whole updated settings object.
 */
export function renderSettings(host, member, settings, change) {
  const label = (key) => host._label(key);
  const schema = settingsSchema(member, host.hass, settings, label);
  const set = (name, value) => change({ ...settings, [name]: value });
  const numeric = schema.filter((f) => f.selector.number && STEPPED.has(f.name));
  const lone = numeric.length === 1 && numeric[0].name === "temperature";
  return html`${schema.map((field) => {
    const value = settings[field.name];
    if (field.name === "state" || (field.name === "hvac_mode" && field.selector.select.options.length <= 4)) {
      return html`<div class="field">${field.name === "hvac_mode" ? html`<span class="field-label">${field.label}</span>` : nothing}
        ${choiceGroup(host, field.selector.select.options.map((o) => ({ label: o.label, value: o.value, active: value === o.value })), value, (v) => set(field.name, v), { label: field.label })}</div>`;
    }
    if (field.selector.number && SLIDERS.has(field.name)) return html`<div class="field">${slider(host, field, value, (v) => set(field.name, v))}</div>`;
    if (field.selector.number && STEPPED.has(field.name)) {
      const big = lone;
      const { min = 5, max = 35, unit_of_measurement: unit } = field.selector.number;
      const quick = big && member.entity?.startsWith("climate.") ? quickTemperatures(member, min, max, unit) : [];
      return html`<div class="field ${big ? "field-big" : ""}">
        ${big ? html`<span class="field-label">${field.label}</span>` : nothing}
        ${stepper(host, field, value, (v) => set(field.name, v), big)}
        ${quick.length ? html`<div class="quick" role="group" aria-label=${field.label}>${quick.map((q) => html`<button class="filter-chip" aria-pressed=${String(Number(value) === q)} @click=${() => set(field.name, q)}>${Number(value) === q ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}${fmt(q, host.hass)} ${unit}</button>`)}</div>` : nothing}
      </div>`;
    }
    return html`<div class="field"><ha-selector .hass=${host.hass} .selector=${field.selector} .value=${value} .label=${field.label} @value-changed=${(e) => { e.stopPropagation(); set(field.name, e.detail.value); }}></ha-selector></div>`;
  })}`;
}
