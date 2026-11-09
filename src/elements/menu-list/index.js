import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { scopeContext } from "../../primitives/sheet.js";
import { powerTransition } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { menuRows, entityRows, allRows, rowOn, anyOn, allTargets, switchService, menuPlacement, segClass } from "./model.js";
import { menuButtonStyles } from "./styles.js";

/**
 * A media header button that opens a popover menu (top layer, so no
 * transformed or clipping ancestor can hide or shift it). Shared by
 * materia-menu (list mode) and materia-media-source.
 *
 * Set by materia-media-header, not config: `seg` ("first", "last", …) makes
 * the button a member of the header's connected pair; `owner` widens the
 * element a click may land in without closing the menu.
 */
export class MenuButton extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    seg: { attribute: false },
    owner: { attribute: false },
    /** Viewport position of the open menu, or null when closed. */
    _menu: { state: true },
  };

  static styles = menuButtonStyles;

  setConfig(config) {
    this.config = { ...config };
  }

  connectedCallback() {
    super.connectedCallback();
    // (Re)attached, e.g. inside an art scope: ask its entity again.
    this.requestUpdate();
  }

  /** `entity`, else the enclosing materia-art-scope's player. */
  get _entityId() {
    return this.config?.entity || (this.isConnected ? scopeContext(this).entity : undefined);
  }

  _toggleMenu(e, align) {
    this._fireHaptic("light");
    if (this._menu) return this._closeMenu();
    this._menu = menuPlacement(e.currentTarget.getBoundingClientRect(), window.innerWidth, undefined, align);
    this._onOutside ??= (ev) => {
      if (!ev.composedPath().includes(this.owner ?? this)) this._closeMenu();
    };
    this._onKey ??= (ev) => ev.key === "Escape" && this._closeMenu();
    this._onMove ??= () => this._closeMenu();
    window.addEventListener("pointerdown", this._onOutside, true);
    window.addEventListener("keydown", this._onKey);
    window.addEventListener("scroll", this._onMove, true);
    window.addEventListener("resize", this._onMove);
  }

  _closeMenu() {
    this._menu = null;
    window.removeEventListener("pointerdown", this._onOutside, true);
    window.removeEventListener("keydown", this._onKey);
    window.removeEventListener("scroll", this._onMove, true);
    window.removeEventListener("resize", this._onMove);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._closeMenu();
  }

  updated(changed) {
    super.updated?.(changed);
    const menu = this.renderRoot.querySelector(".pmenu");
    if (menu && !menu.matches(":popover-open")) {
      try {
        menu.showPopover();
      } catch {
        /* no popover support: it stays a fixed element */
      }
    }
  }

  _popover(rows, cls = "") {
    if (!this._menu) return nothing;
    const { top, left, width } = this._menu;
    return html`<div class="pmenu ${cls}" popover="manual" role="menu" style="top:${top}px;left:${left}px;width:${width}px;">
      ${rows}
    </div>`;
  }

  getGridOptions() {
    return { columns: 2, rows: 1, min_columns: 1 };
  }

  getCardSize() {
    return 1;
  }
}

/**
 * materia-menu-list — materia-menu's list mode (rendered by materia-menu
 * when it has `items`): an icon button that opens a menu of rows.
 *
 *   items: an entity id or { entity, name, in_all } is a row with a switch
 *          (players, switches, input booleans, lights …); { type: divider }
 *          a separator; { type: all } "All off" while any row is on, else
 *          "All on", over the rows without `in_all: false`. Without items,
 *          `entity` (or the art scope's player) alone.
 *   icon, color (`error` = the red power colour, or any CSS colour),
 *   variant: kiosk (the kiosk header's 44 px round button).
 *
 * The button lights up while a row is on and pulses while a player turns on
 * or off. A media header's power button is one of these.
 */
class MateriaMenuList extends MenuButton {
  get _rows() {
    return menuRows(this.config?.items, this._entityId);
  }

  _switch(entities, on) {
    this._fireHaptic("light");
    const byService = new Map();
    for (const e of [].concat(entities)) {
      const key = switchService(e, on).join(".");
      byService.set(key, [...(byService.get(key) ?? []), e]);
    }
    for (const [key, ids] of byService) {
      const [domain, service] = key.split(".");
      this._callService(domain, service, { entity_id: ids.length === 1 ? ids[0] : ids });
    }
  }

  /** All off while any row is on; all on when every row is off. */
  _all(on) {
    const targets = allTargets(allRows(this._rows), this.hass.states, on);
    if (targets.length) this._switch(targets, !on);
    this._closeMenu();
  }

  _row(r, someOn) {
    const states = this.hass.states;
    if (r.type === "divider") return html`<div class="pdiv" role="separator"></div>`;
    if (r.type === "all")
      return html`<button class="prow all ${someOn ? "off" : ""}" role="menuitem" @click=${() => this._all(someOn)}>
        <ha-icon icon="mdi:power"></ha-icon>
        <span class="pname">${t(someOn ? "media_all_off" : "media_all_on", this.hass)}</span>
      </button>`;
    const st = states[r.entity];
    const on = rowOn(r.entity, st);
    return html`<button
      class="prow"
      role="menuitemcheckbox"
      aria-checked=${on ? "true" : "false"}
      ?disabled=${!st || st.state === "unavailable"}
      @click=${() => this._switch(r.entity, !on)}
    >
      <span class="pname">${r.name ?? st?.attributes?.friendly_name ?? r.entity}</span>
      <span class="psw ${on ? "on" : ""}" aria-hidden="true"></span>
    </button>`;
  }

  render() {
    if (!this.hass) return nothing;
    const rows = this._rows;
    const switches = entityRows(rows);
    if (!rows.length) return nothing;
    const someOn = anyOn(allRows(rows), this.hass.states);
    const busy = switches.some((r) => powerTransition(this.hass.states[r.entity]));
    const color = this.config?.color;
    const danger = color === "error";
    const base = this.config?.variant === "kiosk" ? "pill round" : segClass("iconbtn", this.seg);
    return html`<button
        class="${base} ${danger ? "danger" : ""} ${someOn ? "on" : ""} ${busy ? "busy" : ""} ${this._menu ? "open" : ""}"
        style=${color && !danger ? `color:${color}` : ""}
        aria-label=${this.config?.name || t("menu_more", this.hass)}
        aria-haspopup="menu"
        aria-expanded=${this._menu ? "true" : "false"}
        @click=${this._toggleMenu}
      ><ha-icon icon=${this.config?.icon || "mdi:dots-vertical"}></ha-icon></button
      >${this._popover(this._menu ? rows.map((r) => this._row(r, someOn)) : nothing)}`;
  }
}

customElements.define("materia-menu-list", MateriaMenuList);
