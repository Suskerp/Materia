import { LitElement, html, css } from "lit";
import { computeLabel } from "../utils/editor-helpers.js";
import { ActionMixin } from "../utils/action-handler.js";

/* ── Editor ─────────────────────────────────────────────────────── */

class MateriaLightEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "light" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  _valueChanged(ev) {
    const config = ev.detail.value;
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}
customElements.define("materia-light-editor", MateriaLightEditor);

/* ── Card ───────────────────────────────────────────────────────── */

class MateriaLight extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-light-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:track-light" };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = { icon: "mdi:track-light", ...config };
  }

  /* ── Helpers ── */

  get _entity() {
    return this.hass?.states?.[this._config?.entity];
  }

  get _isOn() {
    return this._entity?.state === "on";
  }

  /** Auto-detect if this light supports brightness (dimmable). */
  get _isDimmable() {
    const attrs = this._entity?.attributes;
    if (!attrs) return false;
    // Check supported_color_modes for brightness support
    const modes = attrs.supported_color_modes || [];
    if (modes.some(m => m !== "onoff")) return true;
    // Fallback: check if brightness attribute exists
    return attrs.brightness !== undefined;
  }

  get _brightness() {
    return this._entity?.attributes?.brightness ?? 0;
  }

  get _brightnessPercent() {
    return Math.round((this._brightness / 255) * 100);
  }

  get _name() {
    return this._config.name || this._entity?.attributes?.friendly_name || "";
  }

  get _icon() {
    return this._config.icon || "mdi:track-light";
  }

  get _stateDisplay() {
    if (!this._isOn) return this._capitalize("Off");
    if (this._isDimmable) return `${this._brightnessPercent}%`;
    return this._capitalize("On");
  }

  /* ── Actions ── */

  _toggleLight() {
    this.hass.callService("light", "toggle", {
      entity_id: this._config.entity,
    });
  }

  _setBrightness(brightness) {
    if (brightness <= 3) {
      this.hass.callService("light", "turn_off", {
        entity_id: this._config.entity,
      });
    } else {
      this.hass.callService("light", "turn_on", {
        entity_id: this._config.entity,
        brightness,
      });
    }
  }

  /* ── Pointer event handlers (bubble-card pattern) ── */

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
    // Only respond to primary button / single touch
    if (ev.button && ev.button !== 0) return;

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._dragging = false;
    this._scrollIntent = false;

    // Capture pointer for smooth tracking even outside element
    try {
      ev.currentTarget.setPointerCapture(ev.pointerId);
    } catch (_) {}

    // Attach window-level listeners for reliable tracking
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

    // Detect scroll intent: vertical movement dominates
    if (!this._dragging && dy > 10 && dx < 4) {
      this._scrollIntent = true;
      this._cleanup(ev);
      return;
    }

    // Start drag: horizontal movement dominates
    if (!this._dragging && dx > 4 && dx >= dy) {
      this._dragging = true;
    }

    if (this._dragging) {
      ev.preventDefault();
      const pct = this._pctFromEvent(ev);
      this._updateFillVisual(pct);

      // Throttled service call during drag (200ms)
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
      // TAP — toggle
      this._toggleLight();
    } else if (this._dragging) {
      // Final brightness from release position
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

    // Release pointer capture
    try {
      const container = this._getContainer();
      if (container && ev?.pointerId != null) {
        container.releasePointerCapture(ev.pointerId);
      }
    } catch (_) {}

    // Remove window listeners
    if (this._onMoveRef) {
      window.removeEventListener("pointermove", this._onMoveRef);
      window.removeEventListener("pointerup", this._onUpRef);
      window.removeEventListener("pointercancel", this._onUpRef);
      this._onMoveRef = null;
      this._onUpRef = null;
    }
  }

  /* ── Render ── */

  render() {
    if (!this._config || !this.hass) return html``;

    const isOn = this._isOn;
    const dimmable = this._isDimmable;
    const pct = dimmable ? this._brightnessPercent : 0;

    const containerBg = isOn
      ? (dimmable ? "var(--md-sys-cust-color-light-container)" : "var(--md-sys-cust-color-light)")
      : "var(--ha-card-background, var(--card-background-color))";
    const textColor = isOn ? "var(--md-sys-cust-color-on-light)" : "var(--primary-text-color)";

    return html`
      <ha-card>
        <div class="container"
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
            <div class="state">${this._stateDisplay}</div>
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

  static styles = css`
    :host {
      display: block;
      font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
    }
    ha-card {
      background: none;
      box-shadow: none;
      border: none;
      overflow: visible;
    }
    .container {
      position: relative;
      width: 100%;
      min-height: 88px;
      background-color: var(--ha-card-background, var(--card-background-color));
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: background-color 0.3s ease;
      cursor: pointer;
      touch-action: none;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      transition: width 0.3s ease;
      z-index: 0;
      border-radius: 28px 0 0 28px;
    }
    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      min-height: 42px;
      margin: 6px;
      margin-left: 8px;
      border-radius: 50%;
      background-color: transparent;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
    }
    .chevron {
      --mdc-icon-size: 20px;
      opacity: 0.5;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .name-container {
      display: flex;
      line-height: 18px;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      margin: 0 16px 0 4px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state {
      font-size: 12px;
      font-weight: normal;
      opacity: 0.7;
      white-space: nowrap;
    }
  `;
}

customElements.define("materia-light", MateriaLight);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-light",
  name: "Materia Light Dimmer",
  description: "Light card with automatic dimmer support. Tap to toggle, slide to dim.",
});
