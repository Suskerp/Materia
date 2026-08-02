import { LitElement, html } from "lit";
import { ActionMixin, HOLD_MS } from "../../utils/action-handler.js";
import { unavailableStyles } from "../../styles/card-styles.js";
import { t } from "../../utils/i18n.js";
import { styles, VARIANT_COLORS } from "./styles.js";
import "./editor.js";

/** Default "active" state(s) per entity domain. Mirrors materia-card DOMAIN_CONFIG. */
const DOMAIN_ACTIVE_STATE = {
  cover: "open",
  lock: ["locked", "locking"],
  vacuum: "cleaning",
  media_player: "playing",
  climate: "heat",
  alarm_control_panel: "armed_away",
  timer: "active",
};

/** Actions that change the world — the ones that make a badge a VERB. */
const VERB_ACTIONS = new Set(["toggle", "perform-action", "call-service"]);

class MateriaBadge extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedStateDisplay: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
    _resolvedSecondary: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-badge-editor");
  }

  static getStubConfig(hass) {
    const entities = hass ? Object.keys(hass.states) : [];
    const entity = entities.find((e) => e.startsWith("light.") || e.startsWith("switch.")) || "";
    return { name: "Badge", icon: "mdi:power-plug", variant: "primary", show_state: false, active_state: "on", entity };
  }

  static styles = [unavailableStyles, styles];

  setConfig(config) {
    if (!config.icon) throw new Error("icon is required");
    if (!config.name) throw new Error("name is required");
    // No tap_action default here: the role rule ("shape follows the job")
    // must see only what the user actually configured. _handleTap still
    // falls back to toggle for badges that never set one.
    this.config = {
      show_state: false,
      active_state: "on",
      variant: "secondary",
      ...config,
    };
  }

  updated(changedProps) {
    super.updated?.(changedProps);
    if (!changedProps.has("hass") || !this.hass) return;
    this._resolveField("state_display", "_resolvedStateDisplay");
    this._resolveField("color", "_resolvedColor");
    this._resolveField("color_on", "_resolvedColorOn");
    this._resolveField("icon", "_resolvedIcon");
    this._resolveField("name", "_resolvedName");
    this._resolveField("secondary", "_resolvedSecondary");
    this._syncTimerTick();
  }

  /** Live countdown for timer entities. HA only pushes a state change when a
   *  timer starts or finishes, so between those the badge would sit frozen on
   *  "Active" — the one thing a countdown must not do. While a timer is
   *  active (and shown), tick once a second; remaining time is derived from
   *  the timer's own finishes_at, so every device shows the same number. */
  _syncTimerTick() {
    const active = (this.config.show_state || this._isActionRole)
      && this.config.entity?.startsWith("timer.")
      && this.hass.states[this.config.entity]?.state === "active";
    if (active && !this._timerTick) {
      this._timerTick = setInterval(() => this.requestUpdate(), 1000);
    } else if (!active && this._timerTick) {
      clearInterval(this._timerTick);
      this._timerTick = null;
    }
  }

  /** "M:SS" until a timer fires, from finishes_at. */
  _timerRemaining(stateObj) {
    const ends = Date.parse(stateObj.attributes?.finishes_at);
    if (Number.isNaN(ends)) return null;
    const s = Math.max(0, Math.ceil((ends - Date.now()) / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  /** 0..1 elapsed fraction of a running timer — drives the action layout's
   *  rising progress fill ("the pill becomes the countdown"). */
  _timerProgress(stateObj) {
    const ends = Date.parse(stateObj?.attributes?.finishes_at);
    const dur = String(stateObj?.attributes?.duration || "")
      .split(":")
      .reduce((acc, p) => acc * 60 + Number(p), 0);
    if (Number.isNaN(ends) || !dur) return null;
    const remaining = Math.max(0, (ends - Date.now()) / 1000);
    return Math.min(1, Math.max(0, 1 - remaining / dur));
  }

  _isActive(stateObj) {
    if (!stateObj) return false;
    const s = stateObj.state;
    const configured = this.config.active_state;
    if (configured != null) {
      if (Array.isArray(configured)) return configured.includes(s);
      return s === String(configured);
    }
    const domain = stateObj.entity_id.split(".")[0];
    const defaultActive = DOMAIN_ACTIVE_STATE[domain] || "on";
    if (Array.isArray(defaultActive)) return defaultActive.includes(s);
    return s === defaultActive;
  }

  /** Also-active while a SEPARATE entity is running — the badge's own
   *  entity state may not span the full job (e.g. a lock that only sits
   *  unlocked for the 3s a relay pulses, inside a 15s multi-step script).
   *  Point this at that script/automation/timer so the badge stays lit for
   *  the whole thing, not just whatever moment its own entity happens to
   *  agree. */
  get _isBusy() {
    const id = this.config.busy_entity;
    return id ? this.hass?.states[id]?.state === "on" : false;
  }

  /** The silhouette follows the job, not a config choice: a badge whose
   *  primary gesture CHANGES something renders as the action shape (the
   *  asymmetric corners); one that navigates stays the squircle. The tap
   *  decides; a hold-only badge (tap: none) is judged by its hold. An
   *  implicit default tap doesn't count — only what was configured. */
  get _isActionRole() {
    const tap = this.config.tap_action?.action;
    if (tap && tap !== "none") return VERB_ACTIONS.has(tap);
    const hold = this.config.hold_action?.action;
    return hold && hold !== "none" ? VERB_ACTIONS.has(hold) : false;
  }

  _getBatteryColors(stateObj) {
    const pct = parseFloat(stateObj?.state);
    if (Number.isNaN(pct)) {
      return ["var(--ha-card-background)", "var(--primary-text-color)"];
    }
    if (pct < 10) {
      return ["var(--md-sys-color-error-container)", "var(--md-sys-color-on-error-container)"];
    }
    if (pct < 20) {
      // Warning tokens are custom (not part of base M3); fall back to amber
      // so the warning tier still renders if the theme doesn't emit them.
      return [
        "var(--md-sys-cust-color-warning-container, #ffecb3)",
        "var(--md-sys-cust-color-on-warning-container, #6d4c00)",
      ];
    }
    return ["var(--ha-card-background)", "var(--primary-text-color)"];
  }

  get _templatesReady() {
    const c = this.config;
    if (this._isTemplate(c.color) && this._resolvedColor === undefined) return false;
    if (this._isTemplate(c.color_on) && this._resolvedColorOn === undefined) return false;
    if (this._isTemplate(c.state_display) && this._resolvedStateDisplay === undefined) return false;
    if (this._isTemplate(c.icon) && this._resolvedIcon === undefined) return false;
    if (this._isTemplate(c.name) && this._resolvedName === undefined) return false;
    if (this._isTemplate(c.secondary) && this._resolvedSecondary === undefined) return false;
    return true;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entity = this.config.entity;
    const stateObj = entity ? this.hass.states[entity] : undefined;
    const unavailable = entity ? this._isUnavailable(stateObj) : false;
    const active = !unavailable && (this._isActive(stateObj) || this._isBusy);
    const variant = this.config.variant || "secondary";
    const showState = this.config.show_state;
    const action = this._isActionRole;

    // Template colors: use ONLY the resolved value — an empty result means
    // "no override, use the variant color". Falling back to the raw template
    // string would leak invalid CSS and kill the variant's color.
    let bgColor = this._isTemplate(this.config.color) ? (this._resolvedColor || "").trim() : this.config.color;
    let textColor = this._isTemplate(this.config.color_on) ? (this._resolvedColorOn || "").trim() : this.config.color_on;

    const alwaysColoredVariants = ["primary", "tertiary", "error", "primary-container", "secondary-container", "error-container", "device-container"];

    // 18c state grammar: a badge is quiet, open (has news) or alarming.
    // COLOUR and NEWS are separate: an always-coloured variant keeps its
    // container tint around the clock, but open — the width swell and the
    // typed value — is earned only by actual news: an active entity, a
    // template colour that fired, or a battery in trouble. A lock that is
    // simply "Locked" stays a floor-size chip, coloured or not.
    let open = !!bgColor;
    if (!bgColor) {
      if (variant === "battery") {
        const [bg, fg] = this._getBatteryColors(stateObj);
        bgColor = bg;
        textColor = fg;
        open = bg !== "var(--ha-card-background)";
      } else if (alwaysColoredVariants.includes(variant) || (active && entity)) {
        // The design's grammar: news wears the CONTAINER tone; only an alarm
        // is filled. A badge softens its variant to the container pair so an
        // open badge sits in the page instead of on it.
        const isError = variant === "error" || variant === "error-state";
        const key = isError
          ? variant
          : variant.endsWith("-container")
            ? variant
            : `${variant.replace(/-state$/, "")}-container`;
        const colors = VARIANT_COLORS[key] || VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
        bgColor = colors[0];
        textColor = textColor || colors[1];
        open = !!(active && entity);
      } else {
        bgColor = "var(--ha-card-background)";
        textColor = textColor || "var(--secondary-text-color)";
      }
    }

    textColor = textColor || "var(--primary-text-color)";
    const alarm = open && (variant === "error" || variant === "error-state") && (!entity || active);

    const activeClass = active ? "active" : "inactive";

    let stateDisplay = "";
    if (showState && unavailable) {
      stateDisplay = t("unavailable", this.hass);
    } else if (showState && stateObj) {
      const hasTpl = this.config.state_display && (this.config.state_display.includes("{{") || this.config.state_display.includes("{%"));
      if (this._resolvedStateDisplay && hasTpl) {
        stateDisplay = this._resolvedStateDisplay;
      } else if (this.config.state_display && !hasTpl) {
        stateDisplay = this.config.state_display;
      } else if (entity?.startsWith("timer.") && stateObj.state === "active" && this._timerRemaining(stateObj)) {
        stateDisplay = this._timerRemaining(stateObj);
      } else {
        const raw = stateObj.state;
        const num = Number(raw);
        if (raw !== "" && raw != null && !Number.isNaN(num)) {
          const unit = stateObj.attributes?.unit_of_measurement;
          const rounded = Math.round(num * 100) / 100;
          stateDisplay = unit ? (unit === "%" ? `${rounded}%` : `${rounded} ${unit}`) : `${rounded}`;
        } else {
          // Words go through HA's own localization ("Locked" -> "Op slot").
          stateDisplay = this.hass.formatEntityState?.(stateObj) ?? raw;
        }
      }
      stateDisplay = this._capitalize(stateDisplay);
    }

    const secondary = this._isTemplate(this.config.secondary)
      ? this._resolvedSecondary || ""
      : this.config.secondary;

    const shape = action ? (this.config.shape === "leaf-flip" ? "leaf-flip" : "leaf") : "";
    const icon = html`<ha-icon .icon=${this._isTemplate(this.config.icon) ? this._resolvedIcon : this.config.icon} style="color: ${textColor};"></ha-icon>`;
    const name = this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
    // The sub line: configured secondary wins; a quiet badge falls back to
    // its state word ("Off", "Locked") — when open, the value says it bigger.
    // A hold-only badge that was tapped flashes the hint here instead.
    const sub = this._holdHint
      ? t("badge_hold_hint", this.hass)
      : secondary || (!open && showState ? stateDisplay : "");
    // Rising fill while a timer runs — the action badge IS the countdown.
    const timerProgress =
      action && entity?.startsWith("timer.") && stateObj?.state === "active"
        ? this._timerProgress(stateObj)
        : null;
    const rootClass = `badge ${action ? `action ${shape}` : ""} ${activeClass} ${this._firedFlash ? "fired" : ""} ${open ? "open" : ""} ${alarm ? "alarm" : ""} ${unavailable ? "unavailable" : ""}`;

    return html`
      <div
        class=${rootClass}
        style="background-color: ${bgColor}; color: ${textColor};"
        @click=${this._handleTap}
        @dblclick=${this._handleDoubleTap}
        @pointerdown=${this._holdDown}
        @pointermove=${this._holdMove}
        @pointerup=${this._holdUp}
        @pointercancel=${this._holdUp}
        @contextmenu=${(e) => {
          // A touch long-press raises the context menu right through the
          // hold — only when a hold is actually configured do we claim it.
          if (this.config.hold_action?.action && this.config.hold_action.action !== "none") e.preventDefault();
        }}
      >
        ${this._haArming
          ? html`<div class="hold-fill" style="animation-duration: ${HOLD_MS}ms;"></div>`
          : ""}
        ${action
          ? html`
              ${timerProgress != null
                ? html`<div class="run-fill" style="height: ${Math.round(timerProgress * 100)}%;"></div>`
                : ""}
              <div class="icon-cell">${icon}</div>
              <div class="text">
                <div class="name">${name}</div>
                ${sub ? html`<div class="sub">${sub}</div>` : ""}
              </div>
              ${showState
                ? html`<div class="value-wrap"><span class="value">${stateDisplay}</span></div>`
                : ""}
            `
          : html`
              <div class="row-top">
                <div class="icon-cell">${icon}</div>
                ${showState ? html`<span class="value">${stateDisplay}</span>` : ""}
              </div>
              <div class="text">
                <div class="name">${name}</div>
                ${sub ? html`<div class="sub">${sub}</div>` : ""}
              </div>
            `}
      </div>
    `;
  }

  _handleTap() {
    // The click the browser delivers after a hold released is the SAME
    // gesture, not a tap.
    if (this._consumeHold()) return;
    // Hold-only control: a stray tap must not fire anything, but silence
    // reads as broken — flash the sub line with "hold, don't tap" instead.
    const tapA = this.config.tap_action;
    const holdA = this.config.hold_action;
    if ((!tapA?.action || tapA.action === "none") && holdA?.action && holdA.action !== "none") {
      this._holdHint = true;
      this.requestUpdate();
      clearTimeout(this._hintTimer);
      this._hintTimer = setTimeout(() => {
        this._holdHint = false;
        this.requestUpdate();
      }, 1400);
      return;
    }
    if (this.config.double_tap_action?.action && this.config.double_tap_action.action !== "none") {
      if (this._dblClickTimer) return;
      this._dblClickTimer = setTimeout(() => {
        this._dblClickTimer = null;
        this._handleAction(this.config.tap_action || { action: "toggle" });
      }, 250);
    } else {
      this._handleAction(this.config.tap_action || { action: "toggle" });
    }
  }

  _handleDoubleTap() {
    if (!this.config.double_tap_action?.action || this.config.double_tap_action.action === "none") return;
    clearTimeout(this._dblClickTimer);
    this._dblClickTimer = null;
    this._handleAction(this.config.double_tap_action);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._dblClickTimer);
    this._dblClickTimer = null;
    clearTimeout(this._hintTimer);
    this._holdHint = false;
    clearTimeout(this._firedTimer);
    this._firedFlash = false;
    clearInterval(this._timerTick);
    this._timerTick = null;
  }

  getCardSize() {
    return 2;
  }

  /** Fired receipt: entity-less verbs (a scene) have no active state to
   *  morph on, so the act of firing flashes the mirrored corners itself. */
  _flashFired() {
    this._firedFlash = true;
    this.requestUpdate();
    clearTimeout(this._firedTimer);
    this._firedTimer = setTimeout(() => {
      this._firedFlash = false;
      this.requestUpdate();
    }, 1600);
  }

  _handleAction(actionConfig) {
    if (this._isActionRole && actionConfig?.action && VERB_ACTIONS.has(actionConfig.action)) {
      this._flashFired();
    }
    super._handleAction(actionConfig);
  }
}

customElements.define("materia-badge", MateriaBadge);

// Badge-picker registry ONLY — a materia-badge is a header thing; keeping it
// out of window.customCards keeps the section card picker honest.
window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "materia-badge",
  name: "Materia Badge",
  description: "Value-typed header badge — navigate squircle or action corners.",
  preview: true,
});
