import { LitElement, html } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";
import { inputValue, serviceData, CLEARED_DATETIME } from "./model.js";

/** Now as a datetime-local value (YYYY-MM-DDTHH:MM): the earliest pickable moment. */
const nowLocalInput = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
};


class MateriaTimeInput extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _pending: { state: true },
  };

  static styles = [hostStyles, haCardReset, motionTokens, styles];

  static async getConfigElement() {
    await loadEditors();
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

  /** A date-time already in the past reads as "nothing set" (e.g. an arrival that happened). */
  get _passed() {
    if (this._pending || this._kind !== "datetime" || !this._liveValue) return false;
    const t = new Date(this._liveValue).getTime();
    return Number.isFinite(t) && t < Date.now();
  }

  /** Any tap on the row opens the picker: desktop browsers only open it from
   *  their (hidden) calendar icon, so a click on the field itself must ask too.
   *  Touch browsers open it natively on the field; asking again is harmless. */
  _showPicker(event) {
    const input = event.currentTarget.querySelector("input");
    if (!input || input.disabled) return;
    if (event.composedPath().some((el) => el?.classList?.contains?.("clear"))) return;
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

  /**
   * Clear a date-time. An input_datetime can't be empty, so it goes to a fixed
   * moment far in the past (2000-01-01 00:00): it reads as "Not set", and no
   * automation that triggers on the helper, with any offset, can fire from it.
   */
  async _clear(event) {
    event.preventDefault();
    event.stopPropagation();
    this._fireHaptic?.("light");
    await this._callService(
      "input_datetime",
      "set_datetime",
      { datetime: CLEARED_DATETIME },
      { entity_id: this.config.entity }
    );
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
        ${this._passed ? html`<span class="unset">${t("sched_not_set", this.hass)}</span>` : ""}
        <input
          class="${this._kind} ${this._passed ? "hidden" : ""}"
          type=${{ datetime: "datetime-local", date: "date", time: "time" }[this._kind]}
          required
          step=${String(this.config.step ?? 60)}
          aria-label=${name}
          .value=${this._passed ? "" : this._value}
          min=${this._kind === "datetime" ? nowLocalInput() : ""}
          ?disabled=${unavailable}
          @change=${this._setTime}
        />
        ${this._kind === "datetime" && this.config.clearable !== false && this._liveValue && !this._passed && !this._pending
          ? html`<button class="clear" type="button" aria-label=${t("sched_clear", this.hass)} @click=${this._clear}><ha-icon icon="mdi:close"></ha-icon></button>`
          : ""}
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
