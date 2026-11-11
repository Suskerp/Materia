import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { vacuumAlerts } from "../../utils/vacuum-status.js";
import { activeItems } from "./model.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";
import { DragScroll } from "../../utils/drag-scroll.js";

const LATER_KEY = "materia_attention_later";
const SYNC = "materia-attention-sync";

/** Rules by card name, so a copy elsewhere on the page can use them (`rules_from`). */
export const RULES = new Map();

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
 *   id:          a name, so a second copy can use these rules
 *   Put-off items stay at the end of the carousel, in neutral colours with
 *   "Show now", as long as anything is still active.
 *   mode: later  the second copy (rules_from: <id>), placed lower on the page:
 *                it shows only when everything has been put off (the main card
 *                then hides), and hides again when something comes up.
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
    if (config.id) {
      RULES.set(config.id, this.config.items);
      window.dispatchEvent(new Event(SYNC));
    }
  }

  /** Its own rules, or (the later copy) those of the card it names. */
  get _rules() {
    return this.config.rules_from ? RULES.get(this.config.rules_from) ?? [] : this.config.items ?? [];
  }

  get _laterMode() {
    return this.config.mode === "later";
  }

  /** Active items first; put-off ones at the end (marked `off`) while anything is
   *  still active. Everything put off: the main card hides and the later copy
   *  shows them instead. */
  get _items() {
    const later = this._later ?? {};
    const now = Date.now();
    const all = activeItems(this._rules, this.hass, (entity, brand) => vacuumAlerts(this.hass, entity, brand));
    const isOff = (i) => later[this._laterKey(i)] > now;
    const on = all.filter((i) => !isOff(i));
    const off = all.filter(isOff).map((i) => ({ ...i, off: true }));
    if (this._laterMode) return on.length ? [] : off;
    return on.length ? [...on, ...off] : [];
  }

  /* ---- "Later": hidden for a while, per person, without helpers. Kept in
     Home Assistant's own per-user frontend store (frontend/set_user_data),
     so it follows the person across their devices and clears itself. ---- */

  _laterKey(item) {
    return String(item.key[0] === "r" ? this._rules[item.index]?.name ?? item.key : item.name);
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

  /** Put an item off (`back` false) or bring it back now (`back` true); every copy on the page follows. */
  _snooze(e, item, back = false) {
    e.stopPropagation();
    this._fireHaptic("light");
    const now = Date.now();
    const later = Object.fromEntries(Object.entries(this._later ?? {}).filter(([, until]) => until > now));
    if (back) delete later[this._laterKey(item)];
    else later[this._laterKey(item)] = now + (Number(item.later_hours) || Number(this.config.later_hours) || 4) * 3600e3;
    this._later = later;
    this.hass.connection.sendMessagePromise({ type: "frontend/set_user_data", key: LATER_KEY, value: later }).catch(() => {});
    window.dispatchEvent(new CustomEvent(SYNC, { detail: later }));
    this._wakeLater();
  }

  connectedCallback() {
    super.connectedCallback();
    this._onSync ??= (e) => {
      if (e.detail) {
        this._later = e.detail;
        this._wakeLater();
      } else this.requestUpdate();
    };
    window.addEventListener(SYNC, this._onSync);
  }

  /** Re-render when the first hidden item is due back. */
  _wakeLater() {
    clearTimeout(this._laterTimer);
    const next = Math.min(...Object.values(this._later ?? {}).filter((u) => u > Date.now()));
    if (Number.isFinite(next)) this._laterTimer = setTimeout(() => this.requestUpdate(), Math.min(next - Date.now() + 500, 2 ** 31 - 1));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Home Assistant takes a card that hid itself out of the page. Such a card
    // must keep listening, or it never hears that it should come back (the
    // put-off copy, the main card once something is shown again).
    if (!this.hidden) {
      clearTimeout(this._laterTimer);
      window.removeEventListener(SYNC, this._onSync);
    }
  }

  updated(changed) {
    super.updated?.(changed);
    if (!this.hass || !this.config) return;
    const rules = this._rules;
    if (this._laterMode || rules.some((i) => i?.later)) this._loadLater();
    rules.forEach((item, i) => {
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
    return item.off
      ? html`<button class="act later" @click=${(e) => this._snooze(e, item, true)}>${t("attention_show_now", this.hass)}</button>`
      : html`<button class="act later" @click=${(e) => this._snooze(e, item)}>${t("attention_later", this.hass)}</button>`;
  }

  /** "Put off until 18:00" (the later copy's detail line). */
  _until(item) {
    const until = this._later?.[this._laterKey(item)];
    const time = new Date(until).toLocaleTimeString(this.hass.locale?.language, { hour: "2-digit", minute: "2-digit" });
    return t("attention_later_until", this.hass, { time });
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
          const secondary = i.off ? this._until(i) : this._text(i, "s");
          return html`<div class="page item ${i.off ? "off" : i.level} ${items.length === 1 ? "only" : ""}" @click=${() => !this._dragger.didDrag() && this._tap(i)}>
            <span class="badge"><ha-icon .icon=${i.icon || this.hass.states[i.entity]?.attributes?.icon || "mdi:alert-circle-outline"}></ha-icon></span>
            <span class="body"><span class="name">${this._text(i, "n")}</span>${secondary ? html`<span class="detail">${secondary}</span>` : nothing}</span>
            <div class="acts">${label && !i.off ? html`<button class="act" @click=${(e) => this._quick(e, i)}>${label}</button>` : nothing}${i.later || i.off ? this._laterBtn(i) : nothing}</div>
          </div>`;
        })}
      </div>
      ${items.length > 1
        ? html`<div class="dots" aria-hidden="true">${items.map((i, n) => html`<span class="pip ${i.off ? "off" : i.level} ${n === page ? "on" : ""}"></span>`)}</div>`
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
