import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { t } from "../../utils/i18n.js";
import { volumeSteps, isMediaOff, formatOffset } from "../../utils/media.js";
import { volumeStyle, zoneLabel } from "../../utils/volume-control.js";
import "../../elements/button-group/index.js";
import "../volume/index.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * materia-volume-knob — the volume panel: a heading, zones, zone linking and,
 * for the selected zone, materia-volume (knob, arc or tap dial with mute and
 * −/+), embedded so its parts lay out in this card. Works inline (a kiosk
 * column) and as sheet content (the volume ring, the toolbar's volume button
 * and the media header open it in a materia-sheet).
 */
class MateriaVolumeKnob extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _zone: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-volume-knob-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity, style: "knob" };
  }

  setConfig(config) {
    if (!config.entity && !config.zones?.length) throw new Error("entity is required");
    const zones = Array.isArray(config.zones) && config.zones.length ? config.zones : [{ entity: config.entity }];
    this.config = { style: "knob", ...config, zones };
    if (!(this._zone < zones.length)) this._zone = Math.max(0, zones.findIndex((z) => z.entity === config.entity));
  }

  /* ---------------------------------------------------------------- state */

  get _style() {
    return volumeStyle(this.config.style);
  }

  _zoneState(i = this._zone) {
    return this.hass?.states[this.config.zones[i]?.entity];
  }

  _zoneName(i) {
    return zoneLabel(this.config.zones[i], this.hass);
  }

  willUpdate(changed) {
    super.willUpdate?.(changed);
    if (this.config && !(this._zone < this.config.zones?.length)) this._zone = 0;
  }

  _selectZone(e) {
    e.stopPropagation();
    this._pickZone(Number(e.detail.value) || 0);
  }

  /** materia-volume drops its optimistic value and any repeat when its entity changes. */
  _pickZone(i) {
    this._zone = i;
  }

  _toggleLink() {
    this._fireHaptic("light");
    this._callService("homeassistant", "toggle", { entity_id: this.config.link_entity });
  }

  /* ---------------------------------------------------------------- render */

  /** The selected zone's control, laid out in this card. */
  _control(name) {
    return html`<materia-volume
      embedded
      .hass=${this.hass}
      .config=${{ style: this._style, name, entity: this.config.zones[this._zone].entity }}
    ></materia-volume>`;
  }

  _linkChip(link) {
    if (!link) return nothing;
    const linked = link.state === "on";
    const z2 = this.config.zones[1] ? this.hass.states[this.config.zones[1].entity] : null;
    const offset = formatOffset(z2?.attributes?.offset ?? this._zoneState()?.attributes?.offset);
    const text = linked ? t("media_linked", this.hass, { offset }).trim() : t("media_unlinked", this.hass);
    return html`<button
      class="linkchip ${linked ? "on" : ""}"
      role="switch"
      aria-checked=${linked ? "true" : "false"}
      aria-label=${t("media_link_zones", this.hass)}
      @click=${this._toggleLink}
    ><ha-icon icon="mdi:link-variant"></ha-icon><span>${text}</span></button>`;
  }

  /** zones_view: side — every zone its own column (slider and − mute +), one header. */
  _renderTapSide(name, link) {
    const zones = this.config.zones;
    return html`
      <ha-card class="panel tap side ">
        <div class="phead">
          <h3>${name}</h3>
          ${this._linkChip(link)}
        </div>
        <div class="tcols" style="--cols:${zones.length}">
          ${zones.map(
            (z, i) => html`<materia-volume
              .hass=${this.hass}
              .config=${{ type: "custom:materia-volume", style: "tap", column: true, name: this._zoneName(i), entity: z.entity }}
            ></materia-volume>`
          )}
        </div>
      </ha-card>
    `;
  }

  _renderTap(name, link, off, muted) {
    const zones = this.config.zones;
    const zoneValue = (i) => {
      const zs = this._zoneState(i);
      return isMediaOff(zs) || zs?.attributes?.is_volume_muted ? t("state_off", this.hass) : volumeSteps(zs);
    };
    return html`
      <ha-card class="panel tap  ${off ? "off" : ""} ${muted ? "muted" : ""}">
        <div class="phead">
          <h3>${name}</h3>
          ${this._linkChip(link)}
        </div>
        ${zones.length > 1
          ? html`<div class="ztabs" role="radiogroup" aria-label=${name}>
              ${zones.map((z, i) => html`<button
                role="radio"
                aria-checked=${i === this._zone ? "true" : "false"}
                class="${i === this._zone ? "on" : ""} ${i === 0 ? "first" : ""} ${i === zones.length - 1 ? "last" : ""}"
                @click=${() => this._pickZone(i)}
              ><span class="zn">${this._zoneName(i)}</span><span class="zv">${zoneValue(i)}</span></button>`)}
            </div>`
          : nothing}
        ${this._control(name)}
      </ha-card>
    `;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const zones = this.config.zones;
    const s = this._zoneState();
    const off = isMediaOff(s);
    const link = this.config.link_entity ? this.hass.states[this.config.link_entity] : null;
    const linked = link?.state === "on";
    const muted = !!s?.attributes?.is_volume_muted;
    const name = this.config.name ?? t("media_volume", this.hass);
    if (this._style === "tap") {
      if (this.config.column) {
        // The bare column (zones_view: side builds these from materia-volume directly).
        return html`<materia-volume
          .hass=${this.hass}
          .config=${{ style: "tap", column: true, name, entity: zones[this._zone].entity }}
        ></materia-volume>`;
      }
      if (this.config.zones_view === "side" && zones.length > 1) return this._renderTapSide(name, link);
      return this._renderTap(name, link, off, muted);
    }
    const zoneGroup = {
      size: "s",
      aria_label: name,
      options: zones.map((z, i) => ({
        label: this._zoneName(i),
        value: String(i),
      })),
    };

    return html`
      <ha-card class="panel  ${off ? "off" : ""}">
        <div class="phead">
          <h3>${name}</h3>
          ${link
            ? html`<button class="linklabel" @click=${this._toggleLink}>${t("media_link_zones", this.hass)}</button>
                <button
                  class="switch ${linked ? "on" : ""}"
                  role="switch"
                  aria-checked=${linked ? "true" : "false"}
                  aria-label=${t("media_link_zones", this.hass)}
                  @click=${this._toggleLink}
                ><i><ha-icon icon="mdi:link-variant"></ha-icon></i></button>`
            : nothing}
        </div>
        ${zones.length > 1
          ? html`<materia-button-group
              .hass=${this.hass}
              .config=${zoneGroup}
              .value=${String(this._zone)}
              @option-selected=${this._selectZone}
            ></materia-button-group>`
          : nothing}
        ${this._control(name)}
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 6, rows: "auto", min_columns: 4 };
  }

  getCardSize() {
    return 8;
  }
}

customElements.define("materia-volume-knob", MateriaVolumeKnob);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-volume-knob",
  name: "Materia Volume Knob",
  description: "Volume panel — rotating knob, arc dial or tap-first level bar — with zones, zone linking, mute and −/+.",
  preview: true,
});
