import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, rowCardStyles, fillBarStyles, unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaCover extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-cover-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:window-shutter", show_stop: true };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = {
      icon: "mdi:window-shutter",
      show_stop: true,
      ...config,
    };
  }

  get _entity() {
    return this.hass?.states?.[this.config?.entity];
  }

  get _isOpen() {
    return this._entity?.state !== "closed";
  }

  get _position() {
    return this._entity?.attributes?.current_position ?? 0;
  }

  get _name() {
    return this.config.name || this._entity?.attributes?.friendly_name || "";
  }

  get _icon() {
    return this.config.icon || "mdi:window-shutter";
  }

  get _stateDisplay() {
    const pos = this._position;
    if (pos === 0) return this._capitalize("Closed");
    if (pos === 100) return this._capitalize("Open");
    return `${pos}% ${this._capitalize("open")}`;
  }

  _onRangeInput(ev) {
    const value = parseInt(ev.target.value, 10);
    this.hass.callService("cover", "set_cover_position", {
      entity_id: this.config.entity,
      position: value,
    });
  }

  _openCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "open_cover", {
      entity_id: this.config.entity,
    });
  }

  _stopCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "stop_cover", {
      entity_id: this.config.entity,
    });
  }

  _closeCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "close_cover", {
      entity_id: this.config.entity,
    });
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const stateObj = this._entity;
    const unavailable = this._isUnavailable(stateObj);

    const isOpen = this._isOpen;
    const pos = this._position;
    const fillColor = isOpen ? "var(--md-sys-cust-color-light)" : "transparent";

    return html`
      <ha-card>
        <div class="container ${unavailable ? 'unavailable' : ''}"
          <div
            class="fill"
            style="width: ${pos}%; background-color: ${fillColor}; opacity: 0.5;"
          ></div>
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${unavailable ? 'Unavailable' : this._stateDisplay}</div>
          </div>
          ${this._hasNavigateAction ? html`
            <ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>
          ` : ''}
          <div class="sub-buttons">
            <button class="sub-btn" @click=${this._openCover}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            ${this.config.show_stop
              ? html`
                  <button class="sub-btn" @click=${this._stopCover}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>
                `
              : nothing}
            <button class="sub-btn" @click=${this._closeCover}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>
          <input
            type="range"
            class="range-input"
            min="0"
            max="100"
            .value=${String(pos)}
            @change=${this._onRangeInput}
          />
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }

  static styles = [hostStyles, haCardReset, rowCardStyles, fillBarStyles, unavailableStyles, styles];
}

customElements.define("materia-cover", MateriaCover);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-cover",
  name: "Materia Cover",
  description: "A cover card with position slider and up/stop/down controls",
});
