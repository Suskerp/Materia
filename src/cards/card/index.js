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
export class MateriaCard extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
    _resolvedSubtitle: { state: true },
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
    const domain = config.entity.split(".")[0];
    const dc = DOMAIN_CONFIG[domain] || DEFAULT_DOMAIN;
    const defaults = { tap_action: { action: "toggle" } };
    if (dc.showSubButtons) {
      defaults.show_sub_buttons = true;
      defaults.show_stop = true;
    }
    this.config = { ...defaults, ...config };
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

  /* ---- Sub-buttons resolution ----------------------------------- */

  /**
   * Returns the effective sub-button list.
   *  - If config.sub_buttons is an array, use it verbatim.
   *  - Else if show_sub_buttons is true and entity is a cover, auto-build
   *    up/[stop/]down. Bubble-card inspired shape: [{icon,tap_action}].
   */
  get _subButtons() {
    const explicit = this.config.sub_buttons;
    if (Array.isArray(explicit)) return explicit;

    const enabled = this.config.show_sub_buttons !== undefined
      ? this.config.show_sub_buttons
      : this._domainConfig.showSubButtons || false;
    if (!enabled) return [];

    if (this._domain === "cover") {
      const entity_id = this.config.entity;
      const showStop = this.config.show_stop !== false;
      const buttons = [
        {
          icon: "mdi:arrow-up",
          tap_action: {
            action: "perform-action",
            perform_action: "cover.open_cover",
            target: { entity_id },
          },
        },
      ];
      if (showStop) {
        buttons.push({
          icon: "mdi:stop",
          tap_action: {
            action: "perform-action",
            perform_action: "cover.stop_cover",
            target: { entity_id },
          },
        });
      }
      buttons.push({
        icon: "mdi:arrow-down",
        tap_action: {
          action: "perform-action",
          perform_action: "cover.close_cover",
          target: { entity_id },
        },
      });
      return buttons;
    }

    return [];
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

  get _subtitle() {
    const val = this.config.subtitle;
    if (!val) return "";
    return this._isTemplate(val) ? this._resolvedSubtitle : val;
  }

  /* ---- State display -------------------------------------------- */

  _relativeLastChanged() {
    const stateObj = this._stateObj;
    if (!stateObj?.last_changed) return "";
    const delta = (Date.now() - new Date(stateObj.last_changed)) / 1000;
    if (delta < 60) return "just now";
    const mins = Math.floor(delta / 60);
    if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    const hours = Math.floor(delta / 3600);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(delta / 86400);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  _baseStateDisplay() {
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

  get _stateDisplay() {
    const showState = this.config.show_state !== false;
    let text = showState ? this._baseStateDisplay() : "";
    if (this.config.show_last_changed) {
      const rel = this._relativeLastChanged();
      if (rel) text = text ? `${text} · ${rel}` : rel;
    }
    return text;
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
    this._resolveField("subtitle", "_resolvedSubtitle");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupSlider();
  }

  /* ---- Slider ---------------------------------------------------- */
  /* Based on Bubble Card's slider implementation.                     */
  /*                                                                   */
  /* Fixes applied from 4-agent investigation:                         */
  /*  1. iOS pointercancel 150ms grace period                          */
  /*  2. Frame-based getBoundingClientRect caching                     */
  /*  3. Improved scroll intent (secondary axis dominance)             */
  /*  4. Touch event coordinate fallback for iOS                       */
  /*  5. Sub-button / icon click prevention                            */
  /*  6. isPrimary guard for multi-touch / pinch                       */
  /*  7. Proper leading+trailing throttle                              */
  /*  8. Sidebar edge-swipe protection                                 */
  /*  9. Visibility change abort                                       */
  /* 10. Document-level touch locks                                    */
  /* ---------------------------------------------------------------- */

  _getContainer() {
    return this.shadowRoot?.querySelector(".container");
  }

  /** Extract X coordinate from pointer or touch event (iOS fallback). */
  _getEventX(ev) {
    if (ev.clientX !== undefined && ev.clientX !== 0) return ev.clientX;
    if (ev.changedTouches?.[0]) return ev.changedTouches[0].clientX;
    if (ev.touches?.[0]) return ev.touches[0].clientX;
    return ev.clientX || 0;
  }

  /** Frame-based bounding rect cache to avoid layout thrashing. */
  _getSliderRect() {
    const frameId = this._sliderFrameId || 0;
    if (this._sliderRectCache && this._sliderRectCacheFrame === frameId) {
      return this._sliderRectCache;
    }
    const rect = this._getContainer()?.getBoundingClientRect();
    this._sliderRectCache = rect;
    this._sliderRectCacheFrame = frameId;
    if (!this._sliderFrameRaf) {
      this._sliderFrameRaf = requestAnimationFrame(() => {
        this._sliderFrameId = (this._sliderFrameId || 0) + 1;
        this._sliderFrameRaf = null;
      });
    }
    return rect;
  }

  _pctFromPointer(ev) {
    const rect = this._getSliderRect();
    if (!rect) return 0;
    const x = this._getEventX(ev);
    return Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
  }

  _updateFillVisual(pct) {
    const fill = this.shadowRoot?.querySelector(".fill");
    if (fill) fill.style.width = `${pct}%`;
  }

  _onPointerDown(ev) {
    if (ev.button && ev.button !== 0) return;
    if (!ev.isPrimary) return; // Ignore secondary touches (pinch)

    // Don't start drag on sub-buttons or icons
    if (ev.target.closest("button, .sub-btn")) return;

    // Sidebar edge-swipe protection (HA mobile sidebar)
    if (ev.pointerType === "touch" && ev.clientX <= 30) return;

    this._startX = ev.clientX;
    this._startY = ev.clientY;
    this._dragging = false;
    this._scrollIntent = false;
    this._pointerId = ev.pointerId;
    this._sliderRectCache = null;

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

    // Secondary axis dominance → scroll intent, abort slider
    if (dy > 10 && dy > dx + 4) {
      this._scrollIntent = true;
      this._abortSlider();
      return;
    }

    // Horizontal movement >6px with dominance → quick-slide
    if (dx > 6 && dx >= dy) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = null;
      this._startDrag(ev);
    }
  }

  _startDrag(ev) {
    if (this._dragging) return;
    this._dragging = true;
    this._dragStartTime = Date.now();
    this._sliderRectCache = null;

    // Remove early detection listener
    if (this._onEarlyMoveRef) {
      window.removeEventListener("pointermove", this._onEarlyMoveRef);
      this._onEarlyMoveRef = null;
    }

    // Capture pointer for reliable tracking
    const container = this._getContainer();
    try {
      container?.setPointerCapture(this._pointerId);
    } catch (_) {}

    // Disable CSS transitions + lock touch actions
    container?.classList.add("is-dragging");

    // Document-level touch lock to prevent scroll breakthrough
    document.documentElement.style.setProperty("touch-action", "none");
    document.documentElement.style.setProperty("overscroll-behavior", "contain");

    // Attach drag move listener to both element and window (iOS reliability)
    this._onDragMoveRef = this._onDragMove.bind(this);
    window.addEventListener("pointermove", this._onDragMoveRef);
    if (container) {
      container.addEventListener("touchmove", this._preventTouch, { passive: false });
    }

    // Listen for visibility changes (tab switch during drag)
    this._onVisibilityRef = () => {
      if (document.hidden) this._cleanupSlider();
    };
    document.addEventListener("visibilitychange", this._onVisibilityRef);

    // Apply initial position
    const pct = this._pctFromPointer(ev);
    this._updateFillVisual(pct);
    this._throttledSetValue(pct);
  }

  _preventTouch(ev) {
    ev.preventDefault();
  }

  _onDragMove(ev) {
    if (ev.pointerType === "touch") ev.preventDefault();
    const pct = this._pctFromPointer(ev);
    this._updateFillVisual(pct);
    this._throttledSetValue(pct);
  }

  _onPointerUp(ev) {
    if (this._startX == null) return;

    // iOS workaround: ignore spurious pointercancel within 150ms of drag start
    if (ev.type === "pointercancel" && this._dragStartTime) {
      if (Date.now() - this._dragStartTime < 150) return;
    }

    if (this._dragging) {
      const pct = this._pctFromPointer(ev);
      this._updateFillVisual(pct);
      this._setSliderValue(pct);
      this._fireHaptic("light");
    } else if (!this._scrollIntent) {
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
    this._dragStartTime = null;
    this._sliderRectCache = null;

    // Flush pending throttled call
    if (this._throttleTimeout) {
      clearTimeout(this._throttleTimeout);
      this._throttleTimeout = null;
    }

    const container = this._getContainer();

    // Re-enable CSS transitions + remove touch locks
    container?.classList.remove("is-dragging");
    document.documentElement.style.removeProperty("touch-action");
    document.documentElement.style.removeProperty("overscroll-behavior");

    // Remove touchmove prevention
    if (container) {
      container.removeEventListener("touchmove", this._preventTouch);
    }

    // Release pointer
    try {
      container?.releasePointerCapture(this._pointerId);
    } catch (_) {}

    // Remove visibility listener
    if (this._onVisibilityRef) {
      document.removeEventListener("visibilitychange", this._onVisibilityRef);
      this._onVisibilityRef = null;
    }

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

    if (this._throttleTimeout) return; // Already scheduled, just update queued value

    const elapsed = now - (this._lastSliderCall || 0);
    if (elapsed >= 200) {
      this._lastSliderCall = now;
      this._setSliderValue(pct);
    } else {
      this._throttleTimeout = setTimeout(() => {
        this._throttleTimeout = null;
        this._lastSliderCall = Date.now();
        this._setSliderValue(this._lastSliderArgs);
      }, 200);
    }
  }

  /* ---- Slider value dispatch ------------------------------------ */

  _setSliderValue(pct) {
    if (!this.hass) return;
    const entityId = this.config.entity;

    if (this._domain === "light") {
      // Clamp minimum to 1% unless slider_turn_off is enabled
      let adjustedPct = pct;
      if (!this.config.slider_turn_off && adjustedPct < 1) {
        adjustedPct = 1;
      }

      const brightness = Math.round((adjustedPct / 100) * 255);
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
        position: Math.max(0, Math.min(100, Math.round(pct))),
      });
      return;
    }
  }

  /* ---- Sub-button click handler --------------------------------- */

  _handleSubButton(btn, ev) {
    ev.stopPropagation();
    this._handleAction(btn.tap_action);
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
    const subButtons = unavailable ? [] : this._subButtons;

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
            ${this._subtitle
              ? html`<div class="subtitle">${this._subtitle}</div>`
              : ""}
            ${stateDisplay
              ? html`<div class="state">${stateDisplay}</div>`
              : ""}
          </div>

          ${this._hasNavigateAction
            ? html`<ha-icon class="chevron" icon="mdi:chevron-right"></ha-icon>`
            : ""}

          ${subButtons.length
            ? html`
                <div class="sub-buttons">
                  ${subButtons.map(
                    (btn) => html`
                      <button
                        class="sub-btn"
                        title=${btn.name || ""}
                        @click=${(ev) => this._handleSubButton(btn, ev)}
                      >
                        <ha-icon .icon=${btn.icon}></ha-icon>
                      </button>
                    `
                  )}
                </div>
              `
            : nothing}
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
