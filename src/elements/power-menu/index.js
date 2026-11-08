import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { scopeContext } from "../../primitives/sheet.js";
import { isMediaOff, powerTransition } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { powerZones, anyZoneOn, allPowerTargets, menuPlacement, segClass } from "./model.js";
import { menuButtonStyles } from "./styles.js";
import "./editor.js";

/**
 * A media header button that opens a popover menu (top layer, so no
 * transformed or clipping ancestor can hide or shift it). Shared by
 * materia-power-menu and materia-media-source.
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
 * materia-power-menu — the media header's power button: a red power icon
 * that opens a menu with a switch per player (`entities`, ids or
 * { entity, name }; else `entity`, else the art scope's player) and, for
 * more than one, "All off" / "All on". The icon pulses while a player is
 * turning on or off. `variant: kiosk` is the kiosk header's 44 px button.
 */
class MateriaPowerMenu extends MenuButton {
  static getConfigElement() {
    return document.createElement("materia-power-menu-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  get _zones() {
    return powerZones(this.config?.entities, this._entityId);
  }

  _setPower(entity, on) {
    this._fireHaptic("light");
    this._callService("media_player", on ? "turn_on" : "turn_off", { entity_id: entity });
  }

  /** All off while any zone is on; all on when every zone is off. */
  _allPower(anyOn) {
    const targets = allPowerTargets(this._zones, this.hass.states, anyOn);
    if (targets.length) this._setPower(targets, !anyOn);
    this._closeMenu();
  }

  _rows(zones, anyOn) {
    const states = this.hass.states;
    return html`${zones.map((z) => {
      const on = !isMediaOff(states[z.entity]);
      return html`<button
        class="prow"
        role="menuitemcheckbox"
        aria-checked=${on ? "true" : "false"}
        @click=${() => this._setPower(z.entity, !on)}
      >
        <span class="pname">${z.name ?? states[z.entity]?.attributes?.friendly_name ?? z.entity}</span>
        <span class="psw ${on ? "on" : ""}" aria-hidden="true"></span>
      </button>`;
    })}
    ${zones.length > 1
      ? html`<div class="pdiv" role="separator"></div>
          <button class="prow all ${anyOn ? "off" : ""}" role="menuitem" @click=${() => this._allPower(anyOn)}>
            <ha-icon icon="mdi:power"></ha-icon>
            <span class="pname">${t(anyOn ? "media_all_off" : "media_all_on", this.hass)}</span>
          </button>`
      : nothing}`;
  }

  render() {
    if (!this.hass) return nothing;
    const zones = this._zones;
    if (!zones.length) return nothing;
    const anyOn = anyZoneOn(zones, this.hass.states);
    const busy = zones.some((z) => powerTransition(this.hass.states[z.entity]));
    const base = this.config?.variant === "kiosk" ? "pill" : segClass("iconbtn", this.seg);
    return html`<button
        class="${base} power ${anyOn ? "on" : ""} ${busy ? "busy" : ""} ${this._menu ? "open" : ""}"
        aria-label=${t("media_power", this.hass)}
        aria-haspopup="menu"
        aria-expanded=${this._menu ? "true" : "false"}
        @click=${this._toggleMenu}
      ><ha-icon icon="mdi:power"></ha-icon></button
      >${this._popover(this._menu ? this._rows(zones, anyOn) : nothing)}`;
  }
}

customElements.define("materia-power-menu", MateriaPowerMenu);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-power-menu",
  name: "Materia Power Menu",
  description: "Power button with a menu: a switch per player and all off / all on.",
  preview: true,
});
