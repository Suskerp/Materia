import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { SheetOpenerMixin } from "../../primitives/sheet.js";
import { isMediaOff, isLive, nextSource, visibleEdges, nowPlayingText, sameText, powerTransition } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { volumeRing } from "../../elements/volume-ring/ring.js";
import "../../cards/volume-knob/index.js";
import "../../cards/station-grid/index.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * materia-media-header — the top row of a player.
 *
 *   default: a source button (cycles source_list), the input as title with
 *            "app · zone" under it, and a connected pair: stations (opens
 *            the station grid) + the volume ring (opens the volume knob).
 *   variant kiosk: an "input · app" chip and a labelled stations button;
 *            the volume ring lives in the toolbar there.
 *
 * Stations and volume open in the kiosk side panel when the header sits in a
 * materia-art-scope with layout: kiosk, and in a bottom sheet otherwise.
 */
class MateriaMediaHeader extends SheetOpenerMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    /** Viewport position of the open power menu, or null when closed. */
    _power: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-media-header-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = config;
  }

  get _stateObj() {
    return this.hass?.states[this.config.entity];
  }

  _cycleSource() {
    const source = nextSource(this._stateObj);
    if (!source) return;
    this._fireHaptic("light");
    this._callService("media_player", "select_source", { entity_id: this.config.entity, source });
  }

  _openStations(e) {
    this._fireHaptic("light");
    const card = {
      type: "custom:materia-station-grid",
      entity: this.config.entity,
      stations: this.config.stations,
      name: this._stationsLabel,
      ...(this.config.logo_fill ? { logo_fill: true } : {}),
    };
    this._openSheet(e.currentTarget, card, this._stationsLabel, "stations");
  }

  _openVolume(e) {
    this._fireHaptic("light");
    this._openSheet(e.currentTarget, this._volumeKnobConfig(), undefined, "volume");
  }

  /* ---- power: a button that opens a menu with a switch per zone + "all off/on" ---- */

  /** The zones the power menu switches: the volume zones, else this player alone. */
  get _powerZones() {
    const zones = this._volumeKnobConfig().zones;
    return Array.isArray(zones) && zones.length ? zones : [{ entity: this.config.entity }];
  }

  _zoneLabel(z) {
    return z.name ?? this.hass.states[z.entity]?.attributes?.friendly_name ?? z.entity;
  }

  _togglePowerMenu(e) {
    this._fireHaptic("light");
    if (this._power) return this._closePowerMenu();
    const r = e.currentTarget.getBoundingClientRect();
    const width = 248;
    const left = Math.max(8, Math.min(r.right - width, window.innerWidth - width - 8));
    this._power = { top: r.bottom + 8, left, width };
    this._onOutside ??= (ev) => {
      if (!ev.composedPath().includes(this)) this._closePowerMenu();
    };
    this._onKey ??= (ev) => ev.key === "Escape" && this._closePowerMenu();
    this._onMove ??= () => this._closePowerMenu();
    window.addEventListener("pointerdown", this._onOutside, true);
    window.addEventListener("keydown", this._onKey);
    window.addEventListener("scroll", this._onMove, true);
    window.addEventListener("resize", this._onMove);
  }

  _closePowerMenu() {
    this._power = null;
    window.removeEventListener("pointerdown", this._onOutside, true);
    window.removeEventListener("keydown", this._onKey);
    window.removeEventListener("scroll", this._onMove, true);
    window.removeEventListener("resize", this._onMove);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._closePowerMenu();
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

  _setZonePower(entity, on) {
    this._fireHaptic("light");
    this._callService("media_player", on ? "turn_on" : "turn_off", { entity_id: entity });
  }

  /** All off while any zone is on; all on when every zone is off. */
  _allPower(anyOn) {
    const zones = this._powerZones;
    const targets = zones.filter((z) => isMediaOff(this.hass.states[z.entity]) === !anyOn).map((z) => z.entity);
    if (targets.length) this._setZonePower(targets, !anyOn);
    this._closePowerMenu();
  }

  _renderPowerMenu() {
    if (!this._power) return nothing;
    const zones = this._powerZones;
    const anyOn = zones.some((z) => !isMediaOff(this.hass.states[z.entity]));
    const { top, left, width } = this._power;
    // popover: shown in the top layer, so no transformed or clipping ancestor
    // (a swipe card, an art scope) can hide or shift it.
    return html`<div class="pmenu" popover="manual" role="menu" style="top:${top}px;left:${left}px;width:${width}px;">
      ${zones.map((z) => {
        const on = !isMediaOff(this.hass.states[z.entity]);
        return html`<button
          class="prow"
          role="menuitemcheckbox"
          aria-checked=${on ? "true" : "false"}
          @click=${() => this._setZonePower(z.entity, !on)}
        >
          <span class="pname">${this._zoneLabel(z)}</span>
          <span class="psw ${on ? "on" : ""}" aria-hidden="true"></span>
        </button>`;
      })}
      ${zones.length > 1
        ? html`<div class="pdiv" role="separator"></div>
            <button class="prow all ${anyOn ? "off" : ""}" role="menuitem" @click=${() => this._allPower(anyOn)}>
              <ha-icon icon="mdi:power"></ha-icon>
              <span class="pname">${t(anyOn ? "media_all_off" : "media_all_on", this.hass)}</span>
            </button>`
        : nothing}
    </div>`;
  }

  _powerButton(cls = "iconbtn") {
    const anyOn = this._powerZones.some((z) => !isMediaOff(this.hass.states[z.entity]));
    const busy = this._powerZones.some((z) => powerTransition(this.hass.states[z.entity]));
    return html`<button
      class="${cls} power ${anyOn ? "on" : ""} ${busy ? "busy" : ""} ${this._power ? "open" : ""}"
      aria-label=${t("media_power", this.hass)}
      aria-haspopup="menu"
      aria-expanded=${this._power ? "true" : "false"}
      @click=${this._togglePowerMenu}
    ><ha-icon icon="mdi:power"></ha-icon></button>`;
  }

  /** `stations_label`, else the translated "Stations". */
  get _stationsLabel() {
    return this.config.stations_label || t("media_stations", this.hass);
  }

  /** zone_name, else this player's name in the volume zones, else its friendly name. */
  get _zoneName() {
    if (this.config.zone_name) return this.config.zone_name;
    const zones = this._volumeKnobConfig().zones;
    const named = Array.isArray(zones) ? zones.find((z) => z?.entity === this.config.entity)?.name : null;
    return named || this._stateObj?.attributes?.friendly_name;
  }

  /** "app · zone": the app only when it is neither the title nor the source. */
  get _subtitle() {
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    // The zone name only says something when the zones differ (one on, one
    // off); with both off or both on it is noise.
    const zones = this._powerZones;
    const differ = zones.length > 1 && new Set(zones.map((z) => isMediaOff(this.hass.states[z.entity]))).size > 1;
    const zone = differ ? this._zoneName : null;
    const transition = powerTransition(s);
    if (transition) return t(transition === "turning_on" ? "media_turning_on" : "media_turning_off", this.hass);
    if (isMediaOff(s)) return [t("state_off", this.hass), zone].filter(Boolean).join(" · ");
    const { appChip } = nowPlayingText({
      source: a.source ?? a.input,
      app: isLive(s) ? t("media_radio", this.hass) : a.app_name,
      title: a.media_title,
    });
    return [appChip, sameText(appChip, zone) ? null : zone].filter(Boolean).join(" · ");
  }

  _renderKiosk(s, hasStations) {
    const a = s?.attributes ?? {};
    // The source once, plus the app only when it says something new.
    const { chip } = nowPlayingText({
      source: a.source ?? a.input,
      app: isLive(s) ? t("media_radio", this.hass) : a.app_name,
      title: a.media_title,
    });
    const open = this._openPanel === "stations";
    return html`<ha-card>
      <div class="top kiosk">
        ${chip ? html`<span class="chip">${chip}</span>` : nothing}
        ${hasStations
          ? html`<button class="pill ${open ? "open" : ""}" aria-expanded=${open ? "true" : "false"} @click=${this._openStations}>
              <ha-icon icon="mdi:radio"></ha-icon>${this._stationsLabel}
            </button>`
          : nothing}
        ${this.config.show_power !== false ? this._powerButton("pill") : nothing}
      </div>
      ${this._renderPowerMenu()}
    </ha-card>`;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    const hasStations = Array.isArray(this.config.stations) && this.config.stations.length > 0;
    if (this.config.variant === "kiosk") return this._renderKiosk(s, hasStations);
    const showVolume = this.config.show_volume !== false;
    const showPower = this.config.show_power !== false;
    const showSource = this.config.show_source !== false && Array.isArray(a.source_list) && a.source_list.length > 0;
    const pair = [hasStations, showVolume, showPower];
    const { first, last } = visibleEdges(pair);
    const edge = (i) => `${i === first ? "first" : ""} ${i === last ? "last" : ""}`;
    const knob = this._volumeKnobConfig();
    return html`<ha-card>
      <div class="top">
        ${showSource
          ? html`<button class="iconbtn" aria-label=${t("media_source", this.hass)} @click=${this._cycleSource}>
              <ha-icon icon="mdi:import"></ha-icon>
            </button>`
          : nothing}
        <div class="where">
          <b>${a.source ?? a.input ?? a.friendly_name ?? ""}</b>
          <span>${this._subtitle}</span>
        </div>
        ${first >= 0
          ? html`<div class="pair">
              ${hasStations
                ? html`<button
                    class="iconbtn ${edge(0)} ${this._openPanel === "stations" ? "open" : ""}"
                    aria-label=${this._stationsLabel}
                    @click=${this._openStations}
                  ><ha-icon icon="mdi:radio"></ha-icon></button>`
                : nothing}
              ${showVolume
                ? html`<button
                    class="iconbtn ring ${edge(1)} ${this._openPanel === "volume" ? "open" : ""}"
                    aria-label=${t("media_volume", this.hass)}
                    @click=${this._openVolume}
                  >${volumeRing(this.hass.states[knob.entity])}</button>`
                : nothing}
              ${showPower ? this._powerButton(`iconbtn ${edge(2)}`) : nothing}
            </div>`
          : nothing}
      </div>
      ${this._renderPowerMenu()}
    </ha-card>`;
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-media-header", MateriaMediaHeader);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-media-header",
  name: "Materia Media Header",
  description: "Player top row: source button, input and app · zone, stations + volume ring.",
  preview: true,
});
