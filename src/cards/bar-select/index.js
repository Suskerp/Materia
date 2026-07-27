import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Ascending-bar level picker (materia-bar-select): a label, the current value,
 * and a row of climbing bars you tap to set a level. Bars at or below the
 * current option are lit, so the shape itself reads as "how much".
 *
 * The read side mirrors materia-button-group: either an entity's state
 * (select / input_select) or an `attribute`, whose choices come from HA's
 * `<attribute>_list` convention (a vacuum's fan_speed_list, say). The write
 * side is inferred from the same pair — select_option for selects,
 * vacuum.set_fan_speed for a vacuum's fan speed — and `service` /
 * `service_key` override it for anything unusual.
 *
 * `off_option` lifts one choice (a mop's "off") out of the bars into its own
 * round button, since "off" isn't a rung on the ladder.
 */
class MateriaBarSelect extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedAccent: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-bar-select-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("select.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Bar Select: entity is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("accent", "_resolvedAccent");
    }
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  /** Current value — an attribute when configured, else the state. */
  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    const v = this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
    return v == null ? null : String(v);
  }

  /** Choices: explicit config, else the attribute's `_list`, else the
   *  entity's own `options` (the select domain's convention). */
  get _options() {
    if (this.config.options?.length) return this.config.options.map(String);
    const st = this._stateObj;
    if (!st) return [];
    if (this.config.attribute) {
      const list = st.attributes?.[`${this.config.attribute}_list`];
      if (Array.isArray(list)) return list.map(String);
      return [];
    }
    const opts = st.attributes?.options;
    return Array.isArray(opts) ? opts.map(String) : [];
  }

  /** Pretty-print a raw option ("max_plus" → "Max plus"). */
  _fmt(option) {
    const st = this._stateObj;
    // Let HA localize the real state; fall back to de-slugging the raw value.
    if (!this.config.attribute && st && String(st.state) === String(option)) {
      const localized = this.hass.formatEntityState?.(st);
      if (localized) return localized;
    }
    const s = String(option).replace(/[_-]+/g, " ");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  _set(option) {
    const st = this._stateObj;
    if (!st) return;
    const domain = st.entity_id.split(".")[0];
    this._fireHaptic?.("light");

    // Explicit override wins.
    if (this.config.service) {
      const [d, s] = String(this.config.service).split(".");
      const key = this.config.service_key || this.config.attribute || "option";
      this._callService(d, s, { entity_id: st.entity_id, [key]: option });
      return;
    }
    if (this.config.attribute) {
      // HA's setter convention for attribute-backed lists.
      const key = this.config.attribute;
      this._callService(domain, `set_${key}`, { entity_id: st.entity_id, [key]: option });
      return;
    }
    if (domain === "select" || domain === "input_select") {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    if (!st || this._isUnavailable(st)) {
      return html`<ha-card><div class="tile unavailable">
        <div class="meta"><span class="label">${this.config.label ?? this.config.entity}</span>
        <span class="value">—</span></div>
      </div></ha-card>`;
    }

    const accent = (this._isTemplate(this.config.accent) ? this._resolvedAccent : this.config.accent)
      || "var(--md-sys-cust-color-device, var(--md-sys-color-primary))";

    const current = this._current;
    const off = this.config.off_option != null ? String(this.config.off_option) : null;
    const isOff = off != null && current === off;
    // The off choice is its own button, so it never occupies a rung.
    const rungs = this._options.filter((o) => off == null || o !== off);
    const idx = rungs.indexOf(String(current));
    const n = rungs.length;

    const label = this.config.label ?? st.attributes?.friendly_name ?? this.config.entity;

    return html`
      <ha-card style="--bs-accent:${accent};">
        <div class="tile">
          <div class="meta">
            <span class="label">${label}</span>
            <span class="value">${current == null ? "—" : this._fmt(current)}</span>
          </div>

          ${off != null
            ? html`<button
                class="off ${isOff ? "on" : ""}"
                @click=${() => this._set(off)}
                aria-pressed=${isOff ? "true" : "false"}
                title=${this._fmt(off)}
              >
                <ha-icon .icon=${this.config.off_icon ?? "mdi:water"}></ha-icon>
              </button>`
            : nothing}

          <div class="bars">
            ${rungs.map((option, i) => {
              // Climb from a third of the height to full across the row, so the
              // ladder reads the same at any number of choices.
              const h = n > 1 ? 34 + (i * 66) / (n - 1) : 100;
              return html`<button
                class="bar ${idx >= i ? "lit" : ""}"
                style="height:${h}%"
                @click=${() => this._set(option)}
                aria-pressed=${idx === i ? "true" : "false"}
                title=${this._fmt(option)}
              ></button>`;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 2;
  }
}

customElements.define("materia-bar-select", MateriaBarSelect);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-bar-select",
  name: "Materia Bar Select",
  description: "Tap-a-bar level picker — climbing bars for fan speeds, mop levels, any ordered select.",
  preview: true,
});
