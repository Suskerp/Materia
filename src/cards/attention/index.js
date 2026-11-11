import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { vacuumAlerts } from "../../utils/vacuum-status.js";
import { activeItems } from "./model.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";
import { DragScroll } from "../../utils/drag-scroll.js";

const LATER_KEY = "materia_attention_later";

/**
 * materia-attention — "needs attention": a list of rules, shown only while
 * they hold, most urgent first. Hidden when nothing needs attention.
 *
 * A carousel: one roomy card per item, swiped sideways (or dragged with a
 * mouse), the next peeking in; the dots underneath carry each item's level,
 * so "one red, two yellow" reads without swiping. One item fills the card.
 *
 * Rules clear themselves: an item shows while its conditions (HA's card
 * condition editor) hold, so "water the plant" goes away when the soil is wet
 * again. Nothing is ticked off by hand. A `type: vacuum` item brings in the
 * robot-vacuum hero's own alerts (errors, water, worn parts) for that machine.
 *
 *   items[]: name, secondary (both may be templates), icon,
 *            level (urgent | warning | info), conditions, entity (tap opens
 *            it), action + action_label (a quick-action button), tap_action
 *            later + later_hours (a "Later" button: hidden for a while, per
 *            person), or { type: vacuum, entity, brand }
 *   later_hours: the card's default for Later (4)
 */
class MateriaAttention extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    preview: { type: Boolean },
    _later: { state: true },
    _page: { state: true },
  };

  static styles = styles;

  static async getConfigElement() {
    await loadEditors();
    return document.createElement("materia-attention-editor");
  }

  static getStubConfig() {
    return { items: [] };
  }

  setConfig(config) {
    this.config = { items: [], ...config };
  }

  get _items() {
    const later = this._later ?? {};
    const now = Date.now();
    return activeItems(this.config.items, this.hass, (entity, brand) => vacuumAlerts(this.hass, entity, brand)).filter(
      (i) => !(later[this._laterKey(i)] > now)
    );
  }

  /* ---- "Later": hidden for a while, per person, without helpers. Kept in
     Home Assistant's own per-user frontend store (frontend/set_user_data),
     so it follows the person across their devices and clears itself. ---- */

  _laterKey(item) {
    return String(item.key[0] === "r" ? this.config.items[item.index]?.name ?? item.key : item.name);
  }

  async _loadLater() {
    if (this._laterLoaded || !this.hass?.connection) return;
    this._laterLoaded = true;
    try {
      const r = await this.hass.connection.sendMessagePromise({ type: "frontend/get_user_data", key: LATER_KEY });
      this._later = r?.value ?? {};
    } catch (_) {
      this._later = {};
    }
    this._wakeLater();
  }

  _snooze(e, item) {
    e.stopPropagation();
    this._fireHaptic("light");
    const now = Date.now();
    const later = Object.fromEntries(Object.entries(this._later ?? {}).filter(([, until]) => until > now));
    later[this._laterKey(item)] = now + (Number(item.later_hours) || Number(this.config.later_hours) || 4) * 3600e3;
    this._later = later;
    this.hass.connection.sendMessagePromise({ type: "frontend/set_user_data", key: LATER_KEY, value: later }).catch(() => {});
    this._wakeLater();
  }

  /** Re-render when the first hidden item is due back. */
  _wakeLater() {
    clearTimeout(this._laterTimer);
    const next = Math.min(...Object.values(this._later ?? {}).filter((u) => u > Date.now()));
    if (Number.isFinite(next)) this._laterTimer = setTimeout(() => this.requestUpdate(), Math.min(next - Date.now() + 500, 2 ** 31 - 1));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._laterTimer);
  }

  updated(changed) {
    super.updated?.(changed);
    if (!this.hass || !this.config) return;
    if ((this.config.items || []).some((i) => i?.later)) this._loadLater();
    (this.config.items || []).forEach((item, i) => {
      this._resolveTemplateValue(`n${i}`, item?.name);
      this._resolveTemplateValue(`s${i}`, item?.secondary);
    });
    const count = this._items.length;
    const hide = !this.preview && count === 0;
    if (hide !== this.hidden) {
      this.hidden = hide;
      this.dispatchEvent(new Event("card-visibility-changed", { bubbles: true, composed: true }));
    }
  }

  _text(item, field) {
    if (item.key[0] !== "r") return field === "n" ? item.name : item.secondary;
    const raw = field === "n" ? item.name : item.secondary;
    const text = this._isTemplate(raw) ? this._tplResults?.[`${field}${item.index}`] ?? "" : raw;
    // No text of its own: the entity's name, so entity + test is already a working rule.
    return text || (field === "n" ? this.hass.states[item.entity]?.attributes?.friendly_name ?? "" : text);
  }

  _tap(item) {
    const action = item.tap_action ?? (item.entity ? { action: "more-info", entity: item.entity } : null);
    if (action) this._handleAction(action);
  }

  _quick(e, item) {
    e.stopPropagation();
    if (item.reset) {
      this._fireHaptic("light");
      this._callService("button", "press", {}, { entity_id: item.reset });
    } else this._handleAction(item.action);
  }

  _laterBtn(item) {
    return html`<button class="act later" @click=${(e) => this._snooze(e, item)}>${t("attention_later", this.hass)}</button>`;
  }

  _label(item) {
    return item.reset ? t("reset", this.hass) : item.action ? item.action_label || t("attention_do", this.hass) : null;
  }

  get _dragger() {
    return (this.__drag ??= new DragScroll({ snap: true }));
  }

  render() {
    if (!this.hass || !this.config) return nothing;
    const items = this._items;
    if (!items.length)
      return this.preview
        ? html`<ha-card><div class="empty"><ha-icon icon="mdi:check-circle-outline"></ha-icon>${t("attention_none", this.hass)}</div></ha-card>`
        : nothing;
    const page = Math.min(this._page ?? 0, items.length - 1);
    return html`<ha-card>
      <div class="pages" @pointerdown=${this._dragger.down} @pointermove=${this._dragger.move} @pointerup=${this._dragger.up} @pointercancel=${this._dragger.up} @scroll=${(e) => {
        const el = e.currentTarget;
        const p = Math.round(el.scrollLeft / (el.firstElementChild?.offsetWidth + 8 || 1));
        if (p !== this._page) this._page = p;
      }}>
        ${items.map((i) => {
          const label = this._label(i);
          const secondary = this._text(i, "s");
          return html`<div class="page item ${i.level} ${items.length === 1 ? "only" : ""}" @click=${() => !this._dragger.didDrag() && this._tap(i)}>
            <span class="badge"><ha-icon .icon=${i.icon || this.hass.states[i.entity]?.attributes?.icon || "mdi:alert-circle-outline"}></ha-icon></span>
            <span class="body"><span class="name">${this._text(i, "n")}</span>${secondary ? html`<span class="detail">${secondary}</span>` : nothing}</span>
            <div class="acts">${label ? html`<button class="act" @click=${(e) => this._quick(e, i)}>${label}</button>` : nothing}${i.later ? this._laterBtn(i) : nothing}</div>
          </div>`;
        })}
      </div>
      ${items.length > 1
        ? html`<div class="dots" aria-hidden="true">${items.map((i, n) => html`<span class="pip ${i.level} ${n === page ? "on" : ""}"></span>`)}</div>`
        : nothing}
    </ha-card>`;
  }

  getCardSize() {
    return 1;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }
}

customElements.define("materia-attention", MateriaAttention);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-attention",
  name: "Materia Needs attention",
  description: "Rules that show only while they hold, most urgent first, as a carousel; hides itself when nothing needs attention.",
  preview: true,
});
