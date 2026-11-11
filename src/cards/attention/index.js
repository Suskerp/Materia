import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { SheetOpenerMixin } from "../../primitives/sheet.js";
import { t } from "../../utils/i18n.js";
import { vacuumAlerts } from "../../utils/vacuum-status.js";
import { activeItems } from "./model.js";
import { styles } from "./styles.js";
import { loadEditors } from "../../utils/load-editors.js";

const LATER_KEY = "materia_attention_later";

/**
 * materia-attention — "needs attention": a list of rules, shown only while
 * they hold, most urgent first. Hidden when nothing needs attention.
 *
 *  - One item: the card is that item, with its quick action.
 *  - Several: one summary row (overlapping icons, a count, the names), tinted
 *    by the most urgent; a tap opens every item in a bottom sheet.
 *
 * Rules clear themselves: an item shows while its conditions (HA's card
 * condition editor) hold, so "water the plant" goes away when the soil is wet
 * again. Nothing is ticked off by hand. A `type: vacuum` item brings in the
 * robot-vacuum hero's own alerts (errors, water, worn parts) for that machine.
 *
 *   items[]: name, secondary (both may be templates), icon,
 *            level (urgent | warning | info), conditions, entity (tap opens
 *            it), action + action_label (a quick-action button), tap_action
 *            or { type: vacuum, entity, brand }
 *   title:   summary text; "{n}" is the count
 */
class MateriaAttention extends SheetOpenerMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    preview: { type: Boolean },
    _open: { state: true },
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

  get _list() {
    return this.config.display === "list";
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
    if (this._list) {
      // The sheet's copy: when the last item clears, close the sheet.
      if (count === 0 && this._hadItems) this.dispatchEvent(new Event("materia-dismiss", { bubbles: true, composed: true }));
      this._hadItems = count > 0;
      return;
    }
    const hide = !this.preview && count === 0;
    if (hide !== this.hidden) {
      this.hidden = hide;
      this.dispatchEvent(new Event("card-visibility-changed", { bubbles: true, composed: true }));
    }
  }

  _text(item, field) {
    if (item.key[0] !== "r") return field === "n" ? item.name : item.secondary;
    const raw = field === "n" ? item.name : item.secondary;
    return this._isTemplate(raw) ? this._tplResults?.[`${field}${item.index}`] ?? "" : raw;
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

  /** B: the most urgent item on top with room for its action and "Later"; the rest peek out below. */
  _stack(items) {
    const top = items[0];
    const label = this._label(top);
    const secondary = this._text(top, "s");
    return html`<ha-card><div class="pile">
      ${items.slice(1, 3).map((i, n) => html`<div class="peek ${i.level}" style="--n:${n + 1}"></div>`)}
      <div class="item top ${top.level}">
        <button class="main" @click=${() => this._tap(top)}>
          <span class="badge"><ha-icon .icon=${top.icon || "mdi:alert-circle-outline"}></ha-icon></span>
          <span class="body"><span class="name">${this._text(top, "n")}</span>${secondary ? html`<span class="detail">${secondary}</span>` : nothing}</span>
          ${items.length > 1 ? html`<span class="count">1 / ${items.length}</span>` : nothing}
        </button>
        <div class="acts" ?hidden=${!label && !top.later}>
          ${label ? html`<button class="act" @click=${(e) => this._quick(e, top)}>${label}</button>` : nothing}
          ${top.later ? this._laterBtn(top) : nothing}
        </div>
      </div>
    </div></ha-card>`;
  }

  /** C: one roomy card per item, swiped sideways; the dots carry the levels. */
  _carousel(items) {
    const page = Math.min(this._page ?? 0, items.length - 1);
    return html`<ha-card>
      <div class="pages" @scroll=${(e) => {
        const el = e.currentTarget;
        const p = Math.round(el.scrollLeft / (el.firstElementChild?.offsetWidth + 8 || 1));
        if (p !== this._page) this._page = p;
      }}>
        ${items.map((i) => {
          const label = this._label(i);
          const secondary = this._text(i, "s");
          return html`<div class="page item ${i.level}" @click=${() => this._tap(i)}>
            <span class="badge round"><ha-icon .icon=${i.icon || "mdi:alert-circle-outline"}></ha-icon></span>
            <span class="body"><span class="name big">${this._text(i, "n")}</span>${secondary ? html`<span class="detail">${secondary}</span>` : nothing}</span>
            <div class="acts">${label ? html`<button class="act" @click=${(e) => this._quick(e, i)}>${label}</button>` : nothing}${i.later ? this._laterBtn(i) : nothing}</div>
          </div>`;
        })}
      </div>
      ${items.length > 1
        ? html`<div class="dots" aria-hidden="true">${items.map((i, n) => html`<span class="pip ${i.level} ${n === page ? "on" : ""}"></span>`)}</div>`
        : nothing}
    </ha-card>`;
  }

  _row(item) {
    const name = this._text(item, "n");
    const secondary = this._text(item, "s");
    const label = this._label(item);
    return html`<div class="item ${item.level}">
      <button class="main" @click=${() => this._tap(item)}>
        <span class="badge"><ha-icon .icon=${item.icon || "mdi:alert-circle-outline"}></ha-icon></span>
        <span class="body">
          <span class="name">${name}</span>
          ${secondary ? html`<span class="detail">${secondary}</span>` : nothing}
        </span>
      </button>
      ${item.later ? this._laterBtn(item) : nothing}
      ${label ? html`<button class="act" @click=${(e) => this._quick(e, item)}>${label}</button>` : nothing}
    </div>`;
  }

  _openList() {
    this._fireHaptic("light");
    // `open: inline` unfolds the list in the card itself instead of a sheet.
    if (this.config.open === "inline") return (this._open = !this._open);
    this._openSheet(this, { ...this.config, type: "custom:materia-attention", display: "list" }, t("attention_heading", this.hass));
  }

  render() {
    if (!this.hass || !this.config) return nothing;
    const items = this._items;
    if (this._list) return html`<div class="list">${items.map((i) => this._row(i))}</div>`;
    if (!items.length)
      return this.preview
        ? html`<ha-card><div class="empty"><ha-icon icon="mdi:check-circle-outline"></ha-icon>${t("attention_none", this.hass)}</div></ha-card>`
        : nothing;
    if (this.config.layout === "stack") return this._stack(items);
    if (this.config.layout === "carousel") return this._carousel(items);
    if (items.length === 1) return html`<ha-card>${this._row(items[0])}</ha-card>`;

    const title = this.config.title
      ? String(this.config.title).replace("{n}", items.length)
      : t("attention_count", this.hass, { n: items.length });
    if (this._open && this.config.open === "inline")
      return html`<ha-card><div class="panel">
        <button class="phead" aria-expanded="true" @click=${this._openList}>
          <span class="name">${title}</span><ha-icon class="chev" icon="mdi:chevron-up"></ha-icon>
        </button>
        <div class="list">${items.map((i) => this._row(i))}</div>
      </div></ha-card>`;
    const inline = this.config.open === "inline";
    return html`<ha-card>
      <button class="summary ${items[0].level}" aria-haspopup=${inline ? nothing : "dialog"} aria-expanded=${inline ? "false" : nothing} @click=${this._openList}>
        <span class="stack">
          ${items.slice(0, 3).map((i, n) => html`<span class="dot ${i.level}" style="z-index:${3 - n}"><ha-icon .icon=${i.icon || "mdi:alert-circle-outline"}></ha-icon></span>`)}
        </span>
        <span class="body">
          <span class="name">${title}</span>
          <span class="detail">${items.map((i) => this._text(i, "n")).filter(Boolean).join(" · ")}</span>
        </span>
        <ha-icon class="chev" icon=${inline ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
      </button>
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
  description: "Rules that show only while they hold, most urgent first; one item in full, several as a summary that opens a sheet.",
  preview: true,
});
