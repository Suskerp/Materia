import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import {
  hostStyles,
  haCardReset,
  rowCardStyles,
  fillBarStyles,
  unavailableStyles,
} from "../../styles/card-styles.js";
import { styles } from "./styles.js";
import "./editor.js";

/* ------------------------------------------------------------------ */
/*  Domain configuration map                                          */
/* ------------------------------------------------------------------ */
const DOMAIN_CONFIG = {
  light: {
    showSlider: true,
    activeState: "on",
    colorActive: "var(--md-sys-cust-color-light-container)",
    colorOn: "var(--md-sys-cust-color-on-light)",
    sliderColor: "var(--md-sys-cust-color-light)",
  },
  cover: {
    showSlider: true,
    showSubButtons: true,
    activeState: "open",
    colorActive: "var(--md-sys-cust-color-device-container)",
    colorOn: "var(--md-sys-cust-color-on-device)",
    sliderColor: "var(--md-sys-cust-color-device)",
  },
  switch: {
    activeState: "on",
    colorActive: "var(--md-sys-cust-color-device)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  fan: {
    activeState: "on",
    colorActive: "var(--md-sys-cust-color-device)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  lock: {
    activeState: "locked",
    colorActive: "var(--md-sys-cust-color-device-container)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  vacuum: {
    activeState: "cleaning",
    colorActive: "var(--md-sys-cust-color-device)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  climate: {
    activeState: "heat",
    colorActive: "var(--md-sys-cust-color-climate-heat-container)",
    colorOn: "var(--md-sys-cust-color-on-climate-heat)",
  },
  media_player: {
    activeState: "playing",
    colorActive: "var(--md-sys-cust-color-device)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  scene: {
    variant: "tonal",
    activeState: "__never__",
  },
  input_boolean: {
    activeState: "on",
    colorActive: "var(--md-sys-cust-color-device)",
    colorOn: "var(--md-sys-cust-color-on-device)",
  },
  alarm_control_panel: {
    activeState: "armed_away",
    colorActive: "var(--md-sys-color-error-container)",
    colorOn: "var(--md-sys-color-on-error-container)",
  },
};

/* ------------------------------------------------------------------ */
/*  Default fallback config for unknown domains                       */
/* ------------------------------------------------------------------ */
const DEFAULT_DOMAIN = {
  activeState: "on",
  colorActive: "var(--md-sys-cust-color-device)",
  colorOn: "var(--md-sys-cust-color-on-device)",
};

/* ------------------------------------------------------------------ */
/*  MateriaCard                                                       */
/* ------------------------------------------------------------------ */
class MateriaCard extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
  };

  /* ---- Editor plumbing ------------------------------------------ */

  static getConfigElement() {
    return document.createElement("materia-card-editor");
  }

  static getStubConfig(hass) {
    const entity =
      Object.keys(hass?.states || {}).find((e) => e.startsWith("light.")) ||
      "light.example";
    return { entity };
  }

  /* ---- Config ---------------------------------------------------- */

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this.config = { tap_action: { action: "toggle" }, ...config };
  }

  /* ---- Helpers --------------------------------------------------- */

  get _domain() {
    return this.config.entity?.split(".")[0] || "";
  }

  get _domainConfig() {
    return DOMAIN_CONFIG[this._domain] || DEFAULT_DOMAIN;
  }

  get _stateObj() {
    return this.hass?.states?.[this.config.entity];
  }

  get _isActive() {
    const state = this._stateObj?.state;
    const activeState =
      this.config.active_state || this._domainConfig.activeState;
    if (activeState === "__never__") return false;
    return state === activeState;
  }

  get _variant() {
    return this._domainConfig.variant || "filled";
  }

  get _isTonal() {
    return this._variant === "tonal";
  }

  /* ---- Slider detection ----------------------------------------- */

  get _isDimmable() {
    if (this._domain !== "light") return false;
    const attrs = this._stateObj?.attributes;
    if (!attrs) return false;
    const modes = attrs.supported_color_modes || [];
    if (modes.some((m) => m !== "onoff")) return true;
    return attrs.brightness !== undefined;
  }

  get _showSlider() {
    if (this._isTonal) return false;
    if (this.config.show_slider !== undefined) return this.config.show_slider;
    if (this._domain === "light") return this._isDimmable;
    if (this._domain === "cover") return true;
    return this._domainConfig.showSlider || false;
  }

  /* ---- Sub-buttons detection ------------------------------------ */

  get _showSubButtons() {
    if (this.config.show_sub_buttons !== undefined)
      return this.config.show_sub_buttons;
    return this._domainConfig.showSubButtons || false;
  }

  get _showStop() {
    return this.config.show_stop !== undefined
      ? this.config.show_stop
      : true;
  }

  /* ---- Fill width ----------------------------------------------- */

  get _fillPercent() {
    const stateObj = this._stateObj;
    if (!stateObj) return 0;

    if (this._domain === "light") {
      const brightness = stateObj.attributes?.brightness ?? 0;
      return Math.round((brightness / 255) * 100);
    }
    if (this._domain === "cover") {
      return stateObj.attributes?.current_position ?? 0;
    }
    return 0;
  }

  /* ---- Name & icon ---------------------------------------------- */

  get _name() {
    if (this.config.name) {
      return this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
    }
    return this._stateObj?.attributes?.friendly_name || this.config.entity;
  }

  get _icon() {
    if (this.config.icon) {
      return this._isTemplate(this.config.icon) ? this._resolvedIcon : this.config.icon;
    }
    if (this._domain === "lock") {
      return this._isActive ? "m3o:lock" : "m3o:lock-open-right";
    }
    return undefined; // let HA choose
  }

  /* ---- State display -------------------------------------------- */

  get _stateDisplay() {
    const stateObj = this._stateObj;
    if (!stateObj) return "";

    const domain = this._domain;

    // Scene: show name, no state
    if (domain === "scene") return "";

    // Light
    if (domain === "light") {
      if (stateObj.state !== "on") return this._capitalize("Off");
      if (this._isDimmable) {
        const pct = Math.round(
          ((stateObj.attributes?.brightness ?? 0) / 255) * 100
        );
        return `${pct}%`;
      }
      return this._capitalize("On");
    }

    // Cover
    if (domain === "cover") {
      const pos = stateObj.attributes?.current_position;
      if (pos === 0 || stateObj.state === "closed")
        return this._capitalize("Closed");
      if (pos === 100) return this._capitalize("Open");
      if (pos != null) return `${pos}% ${this._capitalize("open")}`;
      return this._capitalize(stateObj.state);
    }

    // Lock
    if (domain === "lock") {
      return stateObj.state === "locked"
        ? this._capitalize("Locked")
        : this._capitalize("Unlocked");
    }

    // Default: capitalized state
    return this._capitalize(stateObj.state);
  }

  /* ---- Colors --------------------------------------------------- */

  _getContainerBg() {
    if (this._isTonal)
      return "var(--md-sys-color-secondary-container)";

    const customColor = this._resolvedColor || this.config.color;
    if (this._isActive) {
      if (customColor) return customColor;
      // Non-dimmable lights use solid color since there's no slider fill
      if (this._domain === "light" && !this._isDimmable) {
        return this._domainConfig.sliderColor || this._domainConfig.colorActive;
      }
      return this._domainConfig.colorActive;
    }
    return "var(--ha-card-background, var(--card-background-color))";
  }

  _getTextColor() {
    if (this._isTonal)
      return "var(--md-sys-color-on-secondary-container)";

    const customColorOn = this._resolvedColorOn || this.config.color_on;
    if (this._isActive) {
      return customColorOn || this._domainConfig.colorOn;
    }
    return "var(--primary-text-color)";
  }

  /* ---- Jinja2 template support ---------------------------------- */

  get _templatesReady() {
    const c = this.config;
    if (this._isTemplate(c?.color) && this._resolvedColor === undefined) return false;
    if (this._isTemplate(c?.color_on) && this._resolvedColorOn === undefined) return false;
    if (this._isTemplate(c?.icon) && this._resolvedIcon === undefined) return false;
    if (this._isTemplate(c?.name) && this._resolvedName === undefined) return false;
    return true;
  }

  updated(changedProps) {
    super.updated?.(changedProps);
    if (!changedProps.has("hass") || !this.hass) return;
    this._resolveField("color", "_resolvedColor");
    this._resolveField("color_on", "_resolvedColorOn");
    this._resolveField("icon", "_resolvedIcon");
    this._resolveField("name", "_resolvedName");
  }

  /* ---- Slider ---------------------------------------------------- */
  /* Based on Bubble Card's slider implementation.                     */
  /*                                                                   */
  /* Hold-to-slide: pointer down starts a 200ms long-press timer.     */
  /*   - If finger moves >6px horizontally before timer → drag        */
  /*     starts immediately (quick-slide).                             */
  /*   - If finger moves >10px vertically first → scroll intent,      */
  /*     slider aborts.                                                */
  /*   - If timer fires → drag starts from current position.          */
  /*   - If released before either → tap.                             */
  /*                                                                   */
  /* During drag: fill bar updates every pointer-move (transitions    */
  /* disabled via .is-dragging class), service calls throttled at      */
  /* 200ms leading+trailing. On release: final service call + CSS     */
  /* transitions re-enabled.                                          */
  /* ---------------------------------------------------------------- */

  _getContainer() {
    return this.shadowRoot?.querySelector(".container");
  }

  _pctFromPointer(ev) {
    if (!this._sliderRect) {
      this._sliderRect = this._getContainer()?.getBoundingClientRect();
    }
    const rect = this._sliderRect;
    if (!rect) return 0;
    const x = ev.clientX;
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
    this._pointerId = ev.pointerId;
    this._sliderRect = null; // recalculate on first move

    // Detect immediate drag vs long-press vs scroll
    this._onEarlyMoveRef = this._onEarlyMove.bind(this);
    window.addEventListener("pointermove", this._onEarlyMoveRef);

    this._longPressTimer = setTimeout(() => {
      this._longPressTimer = null;
      if (!this._scrollIntent) this._startDrag(ev);
    }, 200);

    this._onUpRef = this._onPointerUp.bind(this);
    window.addEventListener("pointerup", this._onUpRef);
    window.addEventListener("pointercancel", this._onUpRef);
  }

  /** Fires during the 200ms detection phase before drag starts. */
  _onEarlyMove(ev) {
    if (this._dragging || this._scrollIntent) return;
    const dx = Math.abs(ev.clientX - this._startX);
    const dy = Math.abs(ev.clientY - this._startY);

    // Vertical movement dominates → scroll intent, abort slider
    if (dy > 10 && dx < 4) {
      this._scrollIntent = true;
      this._abortSlider();
      return;
    }

    // Horizontal movement >6px → start drag immediately (quick-slide)
    if (dx > 6 && dx >= dy) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
      this._startDrag(ev);
    }
  }

  _startDrag(ev) {
    if (this._dragging) return;
    this._dragging = true;
    this._sliderRect = null; // fresh measurement

    // Remove early detection listener, attach drag listener
    window.removeEventListener("pointermove", this._onEarlyMoveRef);
    this._onEarlyMoveRef = null;

    // Capture pointer for reliable tracking
    try {
      this._getContainer()?.setPointerCapture(this._pointerId);
    } catch (_) {}

    // Disable CSS transitions on fill for instant feedback
    this._getContainer()?.classList.add("is-dragging");

    this._onDragMoveRef = this._onDragMove.bind(this);
    window.addEventListener("pointermove", this._onDragMoveRef);

    // Apply initial position
    const pct = this._pctFromPointer(ev);
    this._updateFillVisual(pct);
    this._throttledSetValue(pct);
  }

  _onDragMove(ev) {
    ev.preventDefault();
    const pct = this._pctFromPointer(ev);
    this._updateFillVisual(pct);
    this._throttledSetValue(pct);
  }

  _onPointerUp(ev) {
    if (this._startX == null) return;

    if (this._dragging) {
      // Final value on release
      const pct = this._pctFromPointer(ev);
      this._updateFillVisual(pct);
      this._setSliderValue(pct);
    } else if (!this._scrollIntent) {
      // No drag, no scroll → tap
      this._handleTap();
    }

    this._cleanupSlider();
  }

  _abortSlider() {
    clearTimeout(this._longPressTimer);
    this._longPressTimer = null;
    if (this._onEarlyMoveRef) {
      window.removeEventListener("pointermove", this._onEarlyMoveRef);
      this._onEarlyMoveRef = null;
    }
  }

  _cleanupSlider() {
    this._abortSlider();
    this._startX = null;
    this._dragging = false;
    this._scrollIntent = false;
    this._sliderRect = null;

    // Flush pending throttled call
    if (this._throttleTimeout) {
      clearTimeout(this._throttleTimeout);
      this._throttleTimeout = null;
    }

    // Re-enable CSS transitions
    this._getContainer()?.classList.remove("is-dragging");

    // Release pointer
    try {
      this._getContainer()?.releasePointerCapture(this._pointerId);
    } catch (_) {}

    if (this._onDragMoveRef) {
      window.removeEventListener("pointermove", this._onDragMoveRef);
      this._onDragMoveRef = null;
    }
    if (this._onUpRef) {
      window.removeEventListener("pointerup", this._onUpRef);
      window.removeEventListener("pointercancel", this._onUpRef);
      this._onUpRef = null;
    }
  }

  /* ---- Leading+trailing throttle for service calls (200ms) ------ */

  _throttledSetValue(pct) {
    const now = Date.now();
    this._lastSliderArgs = pct;
    const elapsed = now - (this._lastSliderCall || 0);

    if (elapsed >= 200) {
      this._lastSliderCall = now;
      this._setSliderValue(pct);
    } else if (!this._throttleTimeout) {
      this._throttleTimeout = setTimeout(() => {
        this._throttleTimeout = null;
        this._lastSliderCall = Date.now();
        this._setSliderValue(this._lastSliderArgs);
      }, 200 - elapsed);
    }
  }

  /* ---- Slider value dispatch ------------------------------------ */

  _setSliderValue(pct) {
    const entityId = this.config.entity;

    if (this._domain === "light") {
      const brightness = Math.round((pct / 100) * 255);
      if (brightness <= 3 && this.config.slider_turn_off) {
        this.hass.callService("light", "turn_off", {
          entity_id: entityId,
        });
      } else {
        this.hass.callService("light", "turn_on", {
          entity_id: entityId,
          brightness: Math.max(brightness, 1),
        });
      }
      return;
    }

    if (this._domain === "cover") {
      this.hass.callService("cover", "set_cover_position", {
        entity_id: entityId,
        position: Math.round(pct),
      });
      return;
    }
  }

  /* ---- Cover controls ------------------------------------------- */

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

  /* ---- Tap handler ---------------------------------------------- */

  _handleTap() {
    if (this.config.tap_action) {
      this._handleAction(this.config.tap_action);
    } else {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: this.config.entity,
      });
    }
  }

  /* ---- Render --------------------------------------------------- */

  render() {
    if (!this.config || !this.hass) return html``;

    const stateObj = this._stateObj;
    const unavailable = this._isUnavailable(stateObj);
    const isActive = !unavailable && this._isActive;
    const isTonal = this._isTonal;
    const showSlider = !unavailable && this._showSlider;
    const showSubButtons = !unavailable && this._showSubButtons;
    const showStop = this._showStop;

    const containerBg = this._getContainerBg();
    const textColor = this._getTextColor();

    const fillPct = showSlider && isActive ? this._fillPercent : 0;
    const sliderColor =
      this._domainConfig.sliderColor || this._domainConfig.colorActive;

    const icon = this._icon;
    const stateDisplay = unavailable ? "Unavailable" : this._stateDisplay;

    return html`
      <ha-card>
        <div
          class="container ${unavailable ? "unavailable" : ""} ${showSlider ? "slider-active" : ""}"
          style="background-color: ${containerBg}; color: ${textColor};"
          @pointerdown=${showSlider ? this._onPointerDown : undefined}
          @click=${showSlider ? undefined : () => this._handleTap()}
        >
          ${showSlider
            ? html`
                <div
                  class="fill"
                  style="width: ${fillPct}%; background-color: ${sliderColor}; opacity: 1;"
                ></div>
              `
            : ""}

          <div class="icon-container">
            ${icon
              ? html`<ha-icon .icon=${icon} style="color: ${textColor};"></ha-icon>`
              : html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                  style="color: ${textColor};"
                ></ha-state-icon>`}
          </div>

          <div class="name-container">
            <div class="name">${this._name}</div>
            ${stateDisplay
              ? html`<div class="state">${stateDisplay}</div>`
              : ""}
          </div>

          ${this._hasNavigateAction
            ? html`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`
            : ""}

          ${showSubButtons
            ? html`
                <div class="sub-buttons">
                  <button class="sub-btn" @click=${this._openCover}>
                    <ha-icon icon="mdi:arrow-up"></ha-icon>
                  </button>
                  ${showStop
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
              `
            : ""}
        </div>
      </ha-card>
    `;
  }

  /* ---- Card sizing ---------------------------------------------- */

  getGridOptions() {
    return { columns: 12, rows: 1.5 };
  }

  getCardSize() {
    return 2;
  }

  /* ---- Styles --------------------------------------------------- */

  static styles = [
    hostStyles,
    haCardReset,
    rowCardStyles,
    fillBarStyles,
    unavailableStyles,
    styles,
  ];
}

/* ------------------------------------------------------------------ */
/*  Registration                                                      */
/* ------------------------------------------------------------------ */

customElements.define("materia-card", MateriaCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-card",
  name: "Materia Card",
  description: "Universal entity card. Auto-detects lights, covers, devices, locks, and scenes.",
  preview: true,
});
