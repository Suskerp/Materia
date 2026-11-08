import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { SheetOpenerMixin } from "../../primitives/sheet.js";
import { isMediaOff, isLive, visibleEdges, nowPlayingText, sameText, powerTransition } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { volumeRing } from "../../elements/volume-ring/ring.js";
import "../../cards/station-grid/index.js";
import "../../elements/power-menu/index.js";
import "../../elements/media-source/index.js";
import { powerZones } from "../../elements/power-menu/model.js";
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
 * The source button is a materia-media-source and the power button a
 * materia-power-menu, so the header and the standalone parts render alike.
 *
 * Stations and volume open in the kiosk side panel when the header sits in a
 * materia-art-scope with layout: kiosk, and in a bottom sheet otherwise.
 */
class MateriaMediaHeader extends SheetOpenerMixin(ActionMixin(LitElement)) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
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

  _openStations(e) {
    this._fireHaptic("light");
    const card = {
      type: "custom:materia-station-grid",
      entity: this.config.entity,
      stations: this.config.stations,
      ...(this.config.logo_fill ? { logo_fill: true } : {}),
    };
    this._openSheet(e.currentTarget, card, this._stationsLabel, "stations");
  }

  _openVolume(e) {
    this._fireHaptic("light");
    this._openVolumePanel(e.currentTarget);
  }

  /** The zones the power menu switches: the volume zones, else this player alone. */
  get _powerZones() {
    return powerZones(this.config.power_entities, this.config.entity);
  }

  /** materia-power-menu, composed: `kiosk` is the 44 px button, `seg` its place in the pair. */
  _powerMenu(kiosk, seg) {
    const c = this.config;
    return html`<materia-power-menu
      .hass=${this.hass}
      .config=${{ entity: c.entity, entities: c.power_entities, ...(kiosk ? { variant: "kiosk" } : {}) }}
      .seg=${seg}
      .owner=${this}
    ></materia-power-menu>`;
  }

  /** `stations_label`, else the translated "Stations". */
  get _stationsLabel() {
    return this.config.stations_label || t("media_stations", this.hass);
  }

  /** zone_name, else this player's name in the volume zones, else its friendly name. */
  get _zoneName() {
    if (this.config.zone_name) return this.config.zone_name;
    const named = this._powerZones.find((z) => z.entity === this.config.entity)?.name;
    return named || this._stateObj?.attributes?.friendly_name;
  }

  /**
   * The source while on; off (or on its way), the device's name: the source it
   * last had says nothing then. "Arcam Living" minus its zone reads "Arcam".
   */
  get _headTitle() {
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    if (!isMediaOff(s) && !powerTransition(s)) return a.source ?? a.input ?? a.friendly_name ?? "";
    if (this.config.device_name) return this.config.device_name;
    const name = a.friendly_name ?? "";
    const zone = this._zoneName;
    const trimmed = zone && name.toLowerCase().endsWith(` ${String(zone).toLowerCase()}`) ? name.slice(0, -zone.length - 1) : name;
    return trimmed || name;
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
        ${this.config.show_power !== false ? this._powerMenu(true) : nothing}
      </div>
    </ha-card>`;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const s = this._stateObj;
    const hasStations = Array.isArray(this.config.stations) && this.config.stations.length > 0;
    if (this.config.variant === "kiosk") return this._renderKiosk(s, hasStations);
    const showVolume = this.config.show_volume !== false;
    const showPower = this.config.show_power !== false;
    const pair = [hasStations, showVolume, showPower];
    const { first, last } = visibleEdges(pair);
    const edge = (i) => `${i === first ? "first" : ""} ${i === last ? "last" : ""}`;
    return html`<ha-card>
      <div class="top">
        ${this.config.show_source !== false
          ? html`<materia-media-source .hass=${this.hass} .config=${{ entity: this.config.entity }}></materia-media-source>`
          : nothing}
        <div class="where">
          <b>${this._headTitle}</b>
          <span>${this._subtitle}</span>
        </div>
        ${first >= 0
          ? html`<div class="pair">
              ${hasStations
                ? html`<button
                    class="iconbtn seg ${edge(0)} ${this._openPanel === "stations" ? "open" : ""}"
                    aria-label=${this._stationsLabel}
                    @click=${this._openStations}
                  ><ha-icon icon="mdi:radio"></ha-icon></button>`
                : nothing}
              ${showVolume
                ? html`<button
                    class="iconbtn seg ring ${edge(1)} ${this._openPanel === "volume" ? "open" : ""}"
                    aria-label=${t("media_volume", this.hass)}
                    @click=${this._openVolume}
                  >${volumeRing(this._stateObj)}</button>`
                : nothing}
              ${showPower ? this._powerMenu(false, edge(2)) : nothing}
            </div>`
          : nothing}
      </div>
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
