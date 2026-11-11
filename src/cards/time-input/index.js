import { LitElement, html } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";
import { inputValue, serviceData } from "./model.js";


class MateriaTimeInput extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _pending: { state: true },
  };

  static styles = [hostStyles, haCardReset, motionTokens, styles];

  static getConfigElement() {
    return document.createElement("materia-time-input-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((id) => id.startsWith("input_datetime.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("Materia Time Input: entity is required");
    this.config = { ...config };
  }

  updated(changed) {
    if (!changed.has("hass") || !this._pending) return;
    if (this._liveValue === this._pending) {
      this._pending = null;
      clearTimeout(this._pendingTimer);
    }
  }

  get _stateObj() {
    return this.hass?.states?.[this.config.entity];
  }

  /** What the helper holds: "datetime" (date + time), "date" or "time" (the default). */
  get _kind() {
    const a = this._stateObj?.attributes || {};
    if (a.has_date && a.has_time) return "datetime";
    if (a.has_date) return "date";
    return "time";
  }

  /** The helper's value in the native input's format for its kind. */
  get _liveValue() {
    return inputValue(String(this._stateObj?.state || ""), this._kind);
  }

  get _value() {
    return this._pending || this._liveValue;
  }

  _showPicker(event) {
    const input = event.currentTarget.querySelector("input");
    if (!input || event.composedPath().includes(input)) return;
    input.focus();
    try { input.showPicker?.(); } catch (_) { /* focus is the fallback */ }
  }

  async _setTime(event) {
    const value = event.currentTarget.value;
    const data = serviceData(value, this._kind);
    if (!data) return;
    this._pending = value;
    clearTimeout(this._pendingTimer);
    // A successful service call can still be followed by a refused/normalized
    // entity state. Never pin the user's draft forever while waiting for an
    // exact value that may not arrive.
    this._pendingTimer = setTimeout(() => { this._pending = null; }, 10000);
    const result = await this._callService(
      "input_datetime",
      "set_datetime",
      data,
      { entity_id: this.config.entity }
    );
    if (!result.ok) {
      clearTimeout(this._pendingTimer);
      this._pending = null;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._pendingTimer);
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const st = this._stateObj;
    const name = this.config.name || st?.attributes?.friendly_name || this.config.entity;
    const unavailable = !st || st.state === "unavailable" || st.state === "unknown";
    return html`<ha-card>
      <label class="field ${unavailable ? "unavailable" : ""}" @click=${this._showPicker}>
        <span>${name}</span>
        <input
          class=${this._kind}
          type=${{ datetime: "datetime-local", date: "date", time: "time" }[this._kind]}
          required
          step=${String(this.config.step ?? 60)}
          aria-label=${name}
          .value=${this._value}
          ?disabled=${unavailable}
          @change=${this._setTime}
        />
      </label>
    </ha-card>`;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 4 };
  }

  getCardSize() { return 1; }
}

customElements.define("materia-time-input", MateriaTimeInput);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-time-input",
  name: "Materia Time Input",
  description: "Compact native time, date or date-and-time picker bound to an input_datetime helper.",
});
