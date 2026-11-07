import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { SheetOpenerMixin } from "../../primitives/sheet.js";
import { isMediaOff, isLive, nextSource, visibleEdges, nowPlayingText } from "../../utils/media.js";
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
    };
    this._openSheet(e.currentTarget, card, this._stationsLabel, "stations");
  }

  _openVolume(e) {
    this._fireHaptic("light");
    this._openSheet(e.currentTarget, this._volumeKnobConfig(), undefined, "volume");
  }

  /** `stations_label`, else the translated "Stations". */
  get _stationsLabel() {
    return this.config.stations_label || t("media_stations", this.hass);
  }

  get _subtitle() {
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    const app = isMediaOff(s) ? t("state_off", this.hass) : isLive(s) ? t("media_radio", this.hass) : a.app_name;
    return [app, this.config.zone_name ?? a.friendly_name].filter(Boolean).join(" · ");
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
      </div>
    </ha-card>`;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const s = this._stateObj;
    const a = s?.attributes ?? {};
    const hasStations = Array.isArray(this.config.stations) && this.config.stations.length > 0;
    if (this.config.variant === "kiosk") return this._renderKiosk(s, hasStations);
    const showVolume = this.config.show_volume !== false;
    const showSource = this.config.show_source !== false && Array.isArray(a.source_list) && a.source_list.length > 0;
    const pair = [hasStations, showVolume];
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
