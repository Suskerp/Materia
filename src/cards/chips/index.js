import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * M3 filter chips (materia-chips): a wrapping row of selectable chips. The
 * selected chip fills with the accent pair, tightens its corners from a full
 * pill toward a rounded square, and slides a check in from zero width.
 *
 * Selection is read from a tracked entity, never held locally, so the card
 * always mirrors real state:
 *   multi_select: false — a chip is on when its `value` equals the state
 *                 (an input_select / select / any single-value entity).
 *   multi_select: true  — the state is a comma-separated list and a chip is on
 *                 when its `value` appears in it (the input_text + toggle-script
 *                 pattern), so several chips can be lit at once.
 *
 * Each chip carries its own `tap_action`; without one, a select-like entity is
 * driven with select_option so the common case needs no wiring.
 */
class MateriaChips extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-chips-editor");
  }

  static getStubConfig() {
    return { chips: [{ label: "Chip 1", value: "one" }, { label: "Chip 2", value: "two" }] };
  }

  setConfig(config) {
    if (!config.chips?.length) throw new Error("Materia Chips: at least one chip is required");
    this.config = { ...config };
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this.hass) {
      this._resolveField("color", "_resolvedColor");
      this._resolveField("color_on", "_resolvedColorOn");
    }
  }

  get _stateObj() {
    return this.config.entity ? this.hass?.states[this.config.entity] : null;
  }

  /** The tracked value — an attribute when asked for, else the state. */
  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    return this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
  }

  /** Selected values as a list, so single and multi share one code path. */
  get _selected() {
    const cur = this._current;
    if (cur == null || cur === "unknown" || cur === "unavailable") return [];
    if (Array.isArray(cur)) return cur.map((v) => String(v).trim());
    if (this.config.multi_select) {
      return String(cur)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return [String(cur)];
  }

  /** Chips accept plain strings as shorthand for {label, value}. */
  _chips() {
    return (this.config.chips || []).map((c) => (typeof c === "string" ? { label: c, value: c } : c));
  }

  _tap(chip) {
    // Picking from a set is a SELECTION change, not an impact.
    this._fireHaptic?.("selection");
    if (chip.tap_action) {
      this._handleAction(chip.tap_action);
      return;
    }
    // No explicit action: drive a select-like entity directly.
    const st = this._stateObj;
    const domain = st?.entity_id?.split(".")[0];
    const value = chip.value ?? chip.label;
    if ((domain === "select" || domain === "input_select") && value != null) {
      this._callService(domain, "select_option", { entity_id: st.entity_id, option: String(value) });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const selected = this._selected;
    const bg = (this._isTemplate(this.config.color) ? this._resolvedColor : this.config.color)
      || "var(--md-sys-cust-color-device, var(--md-sys-color-secondary-container))";
    const fg = (this._isTemplate(this.config.color_on) ? this._resolvedColorOn : this.config.color_on)
      || "var(--md-sys-cust-color-on-device, var(--md-sys-color-on-secondary-container))";
    const showCheck = this.config.show_check !== false;

    return html`
      <ha-card style="--mc-bg:${bg};--mc-fg:${fg};">
        <div class="chips">
          ${this._chips().map((chip) => {
            const value = chip.value ?? chip.label;
            const on = selected.some((s) => s === String(value));
            return html`
              <button class="chip ${on ? "on" : ""}" @click=${() => this._tap(chip)} aria-pressed=${on ? "true" : "false"}>
                ${showCheck
                  ? html`<ha-icon class="check" icon="m3of:check"></ha-icon>`
                  : chip.icon
                    ? html`<ha-icon class="lead" .icon=${chip.icon}></ha-icon>`
                    : nothing}
                <span class="text">${chip.label ?? value}</span>
              </button>
            `;
          })}
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

customElements.define("materia-chips", MateriaChips);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-chips",
  name: "Materia Chips",
  description: "M3 filter chips — wrapping, single or multi-select, with a check that slides in when chosen.",
  preview: true,
});
