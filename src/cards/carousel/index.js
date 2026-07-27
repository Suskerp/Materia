import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Horizontal tile carousel (materia-carousel): a scroll-snapping row of
 * selectable tiles — icon top-left, check top-right, name and a secondary line
 * at the bottom. The alternative to materia-chips when each option deserves
 * more than a label (a room's size, a scene's preview, a zone's status).
 *
 * Shares materia-chips' selection contract exactly, so the two are drop-in
 * swaps for one another: read from a tracked entity's state, or from a
 * comma-separated list when `multi_select` is on.
 */
class MateriaCarousel extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-carousel-editor");
  }

  static getStubConfig() {
    return { items: [{ label: "Item 1", value: "one" }, { label: "Item 2", value: "two" }] };
  }

  setConfig(config) {
    if (!config.items?.length) throw new Error("Materia Carousel: at least one item is required");
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

  get _current() {
    const st = this._stateObj;
    if (!st) return null;
    return this.config.attribute ? st.attributes?.[this.config.attribute] : st.state;
  }

  /** Selected values as a list — same contract as materia-chips. */
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

  _items() {
    return (this.config.items || []).map((i) => (typeof i === "string" ? { label: i, value: i } : i));
  }

  _tap(item) {
    this._fireHaptic?.("light");
    if (item.tap_action) {
      this._handleAction(item.tap_action);
      return;
    }
    const st = this._stateObj;
    const domain = st?.entity_id?.split(".")[0];
    const value = item.value ?? item.label;
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

    return html`
      <ha-card style="--mcar-bg:${bg};--mcar-fg:${fg};">
        <div class="rail">
          ${this._items().map((item) => {
            const value = item.value ?? item.label;
            const on = selected.some((s) => s === String(value));
            return html`
              <button class="tile ${on ? "on" : ""}" @click=${() => this._tap(item)} aria-pressed=${on ? "true" : "false"}>
                <div class="top">
                  ${item.icon ? html`<ha-icon class="glyph" .icon=${item.icon}></ha-icon>` : html`<span></span>`}
                  <ha-icon class="check" icon="m3of:check-circle"></ha-icon>
                </div>
                <div class="bottom">
                  <span class="name">${item.label ?? value}</span>
                  ${item.secondary ? html`<span class="sub">${item.secondary}</span>` : nothing}
                </div>
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
    return 3;
  }
}

customElements.define("materia-carousel", MateriaCarousel);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-carousel",
  name: "Materia Carousel",
  description: "Scroll-snapping row of selectable tiles — the richer alternative to a chip row.",
  preview: true,
});
