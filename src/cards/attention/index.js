import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { vacuumAlerts } from "../../utils/vacuum-status.js";
import { activeItems } from "./model.js";
import { triggeringEntities } from "../../utils/conditions.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";
import { DragScroll } from "../../utils/drag-scroll.js";

const LATER_KEY = "materia_attention_later";
const SYNC = "materia-attention-sync";

/** Rules by card name, so a copy elsewhere on the page can use them (`rules_from`). */
export const RULES = new Map();

/** The person's put-off list, once loaded on this page: later cards (and a
 *  return to the view) start from it instead of from "nothing put off". */
let laterCache = null;

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
 *            action2 + action2_label (a second button, e.g. "Cameras"),
 *            later + later_hours (a "Later" button: hidden for a while, per
 *            person), or { type: vacuum, entity, brand }
 *   later_hours: the card's default for Later (24, a day)
 *   heading:     optional title above the carousel ("{n}" = the count), shown
 *                and hidden together with the card
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
    // Until the put-off list is known, a card that uses it shows nothing,
    // or everything would flash up for a moment on every page load.
    if (this._usesLater && !this._later) return [];
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

  get _usesLater() {
    return this._laterMode || this._rules.some((i) => i?.later);
  }

  async _loadLater() {
    if (this._laterLoaded || !this.hass?.connection) return;
    this._laterLoaded = true;
    if (laterCache) this._later = laterCache;
    try {
      const r = await this.hass.connection.sendMessagePromise({ type: "frontend/get_user_data", key: LATER_KEY });
      this._later = laterCache = r?.value ?? {};
    } catch (_) {
      this._later ??= {};
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
    else later[this._laterKey(item)] = now + (Number(item.later_hours) || Number(this.config.later_hours) || 24) * 3600e3;
    this._later = laterCache = later;
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
      clearTimeout(this._forTimer);
      window.removeEventListener(SYNC, this._onSync);
    }
  }

  updated(changed) {
    super.updated?.(changed);
    if (!this.hass || !this.config) return;
    const rules = this._rules;
    if (this._usesLater) this._loadLater();
    // "For at least N minutes" turns true with time, not with a state change: look again every 30 s.
    clearTimeout(this._forTimer);
    if (rules.some((i) => i?.for_minutes > 0)) this._forTimer = setTimeout(() => this.requestUpdate(), 30000);
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
    if (text) return text;
    // No text of its own. Name: the entity's name. Detail: what triggered it,
    // its value for one entity ("12 %"), name and value for several
    // ("Spots remote 18 % · Lamps remote 15 %").
    if (field === "n") return this.hass.states[item.entity]?.attributes?.friendly_name ?? "";
    const ids = triggeringEntities(item.conditions, this.hass);
    const value = (id) => {
      const st = this.hass.states[id];
      return st ? this.hass.formatEntityState?.(st) ?? st.state : "";
    };
    // One watched entity: just its value. Several: always say which one, even when only one matches.
    if (ids.length === 1 && triggeringEntities(item.conditions, this.hass, true).length === 1) return value(ids[0]);
    return ids.map((id) => `${this.hass.states[id]?.attributes?.friendly_name ?? id} ${value(id)}`).join(" · ");
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
    const lang = this.hass.locale?.language;
    const d = new Date(this._later?.[this._laterKey(item)]);
    const clock = d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
    // Today: just the time. Tomorrow: "tomorrow 15:18". Later: "Thu 15:18".
    const days = Math.round((new Date(d).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 864e5);
    const time =
      days <= 0 ? clock
      : days === 1 ? t("attention_tomorrow", this.hass, { time: clock })
      : `${d.toLocaleDateString(lang, { weekday: "short" })} ${clock}`;
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
    // An optional heading lives inside the card, so it disappears with it.
    const heading = this.config.heading ? String(this.config.heading).replace("{n}", items.length) : "";
    return html`<ha-card>
      ${heading ? html`<div class="heading">${heading}</div>` : nothing}
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
            <div class="acts">${label ? html`<button class="act" @click=${(e) => this._quick(e, i)}>${label}</button>` : nothing}${i.action2 ? html`<button class="act second" @click=${(e) => { e.stopPropagation(); this._handleAction(i.action2); }}>${i.action2_label || t("attention_do", this.hass)}</button>` : nothing}${i.later || i.off ? this._laterBtn(i) : nothing}</div>
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
