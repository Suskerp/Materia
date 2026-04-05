import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { hostStyles, haCardReset, rowCardStyles, fillBarStyles, unavailableStyles } from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

class MateriaLight extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-light-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:track-light" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { icon: "mdi:track-light", ...config };
  }

  get _entity() {
    return this.hass?.states?.[this.config?.entity];
  }

  get _isOn() {
    return this._entity?.state === "on";
  }

  get _isDimmable() {
    const attrs = this._entity?.attributes;
    if (!attrs) return false;
    const modes = attrs.supported_color_modes || [];
    if (modes.some(m => m !== "onoff")) return true;
    return attrs.brightness !== undefined;
  }

  get _brightness() {
    return this._entity?.attributes?.brightness ?? 0;
  }

  get _brightnessPercent() {
    return Math.round((this._brightness / 255) * 100);
  }

  get _name() {
    return this.config.name || this._entity?.attributes?.friendly_name || "";
  }

  get _icon() {
    return this.config.icon || "mdi:track-light";
  }

  get _stateDisplay() {
    if (!this._isOn) return this._capitalize("Off");
    if (this._isDimmable) return `${this._brightnessPercent}%`;
    return this._capitalize("On");
  }

  _toggleLight() {
    this.hass.callService("light", "toggle", {
      entity_id: this.config.entity,
    });
  }

  _setBrightness(brightness) {
    if (brightness <= 3) {
      this.hass.callService("light", "turn_off", {
        entity_id: this.config.entity,
      });
    } else {
      this.hass.callService("light", "turn_on", {
        entity_id: this.config.entity,
        brightness,
      });
    }
  }

  _getContainer() {
    return this.shadowRoot?.querySelector(".container");
  }

  _pctFromEvent(ev) {
    const container = this._getContainer();
    if (!container) return 0;
    const rect = container.getBoundingClientRect();
    const x = (ev.touches ? ev.touches[0] : ev).clientX;
    return Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
  }

  _updateFillVisual(pct) {
    const fill = this.shadowRoot?.querySelector(".fill");
    if (fill) fill.style.width = `${pct}%`;
  }

  _onPointerDown(ev) {
    if (ev.button && ev.button !== 0) return;

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._dragging = false;
    this._scrollIntent = false;

    try {
      ev.currentTarget.setPointerCapture(ev.pointerId);
    } catch (_) {}

    this._onMoveRef = this._onPointerMove.bind(this);
    this._onUpRef = this._onPointerUp.bind(this);
    window.addEventListener("pointermove", this._onMoveRef);
    window.addEventListener("pointerup", this._onUpRef);
    window.addEventListener("pointercancel", this._onUpRef);
  }

  _onPointerMove(ev) {
    if (this._startX == null || this._scrollIntent) return;

    const dx = Math.abs(ev.clientX - this._startX);
    const dy = Math.abs(ev.clientY - this._startY);

    if (!this._dragging && dy > 10 && dx < 4) {
      this._scrollIntent = true;
      this._cleanup(ev);
      return;
    }

    if (!this._dragging && dx > 4 && dx >= dy) {
      this._dragging = true;
    }

    if (this._dragging) {
      ev.preventDefault();
      const pct = this._pctFromEvent(ev);
      this._updateFillVisual(pct);

      if (!this._throttleTimer) {
        this._throttleTimer = setTimeout(() => {
          this._throttleTimer = null;
          const brightness = Math.round((pct / 100) * 255);
          this._setBrightness(brightness);
        }, 200);
      }
    }
  }

  _onPointerUp(ev) {
    if (this._startX == null) return;

    if (!this._dragging && !this._scrollIntent) {
      this._toggleLight();
    } else if (this._dragging) {
      const pct = this._pctFromEvent(ev);
      const brightness = Math.round((pct / 100) * 255);
      this._setBrightness(brightness);
    }

    this._cleanup(ev);
  }

  _cleanup(ev) {
    this._startX = null;
    this._dragging = false;
    this._scrollIntent = false;
    clearTimeout(this._throttleTimer);
    this._throttleTimer = null;

    try {
      const container = this._getContainer();
      if (container && ev?.pointerId != null) {
        container.releasePointerCapture(ev.pointerId);
      }
    } catch (_) {}

    if (this._onMoveRef) {
      window.removeEventListener("pointermove", this._onMoveRef);
      window.removeEventListener("pointerup", this._onUpRef);
      window.removeEventListener("pointercancel", this._onUpRef);
      this._onMoveRef = null;
      this._onUpRef = null;
    }
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const stateObj = this._entity;
    const unavailable = this._isUnavailable(stateObj);

    const isOn = this._isOn;
    const dimmable = this._isDimmable;
    const pct = dimmable ? this._brightnessPercent : 0;

    const containerBg = isOn
      ? (dimmable ? "var(--md-sys-cust-color-light-container)" : "var(--md-sys-cust-color-light)")
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isOn ? "var(--md-sys-cust-color-on-light)" : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div class="container ${unavailable ? 'unavailable' : ''}"
          style="background-color: ${containerBg}; color: ${textColor};"
          @pointerdown=${dimmable ? this._onPointerDown : undefined}
          @click=${dimmable ? undefined : () => this._toggleLight()}
        >
          ${dimmable ? html`
            <div
              class="fill"
              style="width: ${isOn ? pct : 0}%; background-color: var(--md-sys-cust-color-light); opacity: 1;"
            ></div>
          ` : ""}
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
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }

  static styles = [hostStyles, haCardReset, rowCardStyles, fillBarStyles, unavailableStyles, styles];
}

customElements.define("materia-light", MateriaLight);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-light",
  name: "Materia Light Dimmer",
  description: "Light card with automatic dimmer support. Tap to toggle, slide to dim.",
});
