import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
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

class MateriaBadge extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedStateDisplay: { state: true },
    _resolvedColor: { state: true },
    _resolvedColorOn: { state: true },
    _resolvedIcon: { state: true },
    _resolvedName: { state: true },
    _resolvedTag: { state: true },
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
    this.config = {
      show_state: false,
      active_state: "on",
      variant: "secondary",
      tap_action: { action: "toggle" },
      ...config,
    };
    // The tile layout must fill its section cell, where the header badge is a
    // fixed-size inline block — the host itself has to change display mode.
    this.toggleAttribute("tile", this.config.layout === "tile");
  }

  updated(changedProps) {
    super.updated?.(changedProps);
    if (!changedProps.has("hass") || !this.hass) return;
    this._resolveField("state_display", "_resolvedStateDisplay");
    this._resolveField("color", "_resolvedColor");
    this._resolveField("color_on", "_resolvedColorOn");
    this._resolveField("icon", "_resolvedIcon");
    this._resolveField("name", "_resolvedName");
    this._resolveField("tag", "_resolvedTag");
    this._resolveField("secondary", "_resolvedSecondary");
    this._syncTimerTick();
  }

  /** Live countdown for timer entities. HA only pushes a state change when a
   *  timer starts or finishes, so between those the badge would sit frozen on
   *  "Active" — the one thing a countdown must not do. While a timer is
   *  active (and shown), tick once a second; remaining time is derived from
   *  the timer's own finishes_at, so every device shows the same number. */
  _syncTimerTick() {
    const active = this.config.show_state
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

  /** A stage bar is lit while its entity matches. `state` may be a string or
   *  a list; omitted, the entity domain's default active state applies — the
   *  same rule the badge itself uses. */
  _stageActive(stage) {
    const stateObj = stage?.entity ? this.hass.states[stage.entity] : undefined;
    if (!stateObj) return false;
    if (stage.state != null) {
      if (Array.isArray(stage.state)) return stage.state.map(String).includes(stateObj.state);
      return stateObj.state === String(stage.state);
    }
    const def = DOMAIN_ACTIVE_STATE[stateObj.entity_id.split(".")[0]] || "on";
    return Array.isArray(def) ? def.includes(stateObj.state) : stateObj.state === def;
  }

  _renderStages() {
    const stages = this.config.stages;
    if (!Array.isArray(stages) || !stages.length) return "";
    return html`
      <div class="stages">
        ${stages.map((s) => html`<div class="stage ${this._stageActive(s) ? "lit" : ""}"></div>`)}
      </div>
    `;
  }

  /** Auto gesture tag: the hold is the deliberate act, so when one is
   *  configured it is the gesture worth advertising; otherwise the tap. */
  _autoTag() {
    const has = (a) => a?.action && a.action !== "none";
    if (has(this.config.hold_action)) return t("badge_tag_hold", this.hass);
    if (has(this.config.tap_action)) return t("badge_tag_tap", this.hass);
    return "";
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
    if (this._isTemplate(c.tag) && this._resolvedTag === undefined) return false;
    if (this._isTemplate(c.secondary) && this._resolvedSecondary === undefined) return false;
    return true;
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entity = this.config.entity;
    const stateObj = entity ? this.hass.states[entity] : undefined;
    const unavailable = entity ? this._isUnavailable(stateObj) : false;
    const active = !unavailable && this._isActive(stateObj);
    const variant = this.config.variant || "secondary";
    const showState = this.config.show_state;

    // Template colors: use ONLY the resolved value — an empty result means
    // "no override, use the variant color". Falling back to the raw template
    // string would leak invalid CSS and kill the variant's color.
    let bgColor = this._isTemplate(this.config.color) ? (this._resolvedColor || "").trim() : this.config.color;
    let textColor = this._isTemplate(this.config.color_on) ? (this._resolvedColorOn || "").trim() : this.config.color_on;

    const alwaysColoredVariants = ["primary", "tertiary", "error", "primary-container", "secondary-container", "error-container", "device-container"];

    if (!bgColor) {
      if (variant === "battery") {
        const [bg, fg] = this._getBatteryColors(stateObj);
        bgColor = bg;
        textColor = fg;
      } else if (alwaysColoredVariants.includes(variant)) {
        const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
        bgColor = colors[0];
        textColor = textColor || colors[1];
      } else if (active && entity) {
        const colors = VARIANT_COLORS[variant] || VARIANT_COLORS.secondary;
        bgColor = colors[0];
        textColor = textColor || colors[1];
      } else {
        bgColor = "var(--ha-card-background)";
        textColor = textColor || "var(--primary-text-color)";
      }
    }

    textColor = textColor || "var(--primary-text-color)";

    const cardClass = showState ? "with-state" : "no-state";
    const activeClass = active ? "active" : "inactive";

    let stateDisplay = "";
    if (showState && unavailable) {
      stateDisplay = "Unavailable";
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
          stateDisplay = raw;
        }
      }
      stateDisplay = this._capitalize(stateDisplay);
    }

    // Gesture tag (top-right eyebrow). Absent = none; the word "auto" derives
    // it from the configured actions; anything else (templates included) is
    // shown as written.
    let tag = "";
    if (this.config.tag) {
      tag = this._isTemplate(this.config.tag)
        ? this._resolvedTag || ""
        : this.config.tag === "auto"
          ? this._autoTag()
          : this.config.tag;
    }
    const secondary = this._isTemplate(this.config.secondary)
      ? this._resolvedSecondary || ""
      : this.config.secondary;

    const tile = this.config.layout === "tile";
    const hasStages = Array.isArray(this.config.stages) && this.config.stages.length > 0;
    const icon = html`<ha-icon .icon=${this._isTemplate(this.config.icon) ? this._resolvedIcon : this.config.icon} style="color: ${textColor};"></ha-icon>`;
    const name = this._isTemplate(this.config.name) ? this._resolvedName : this.config.name;
    const rootClass = `badge ${tile ? "tile" : ""} ${cardClass} ${activeClass} ${hasStages ? "has-stages" : ""} ${unavailable ? "unavailable" : ""}`;

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
        ${tile
          ? html`
              <div class="tile-top">
                <div class="icon-cell">${icon}</div>
                ${tag ? html`<div class="tag">${tag}</div>` : ""}
              </div>
              <div class="tile-text">
                <div class="name">${name}</div>
                ${secondary ? html`<div class="secondary">${secondary}</div>` : ""}
                ${showState && stateDisplay ? html`<div class="state">${stateDisplay}</div>` : ""}
              </div>
              ${this._renderStages()}
            `
          : html`
              <div class="icon-cell">${icon}</div>
              ${tag ? html`<div class="tag">${tag}</div>` : ""}
              <div class="name">${name}</div>
              ${showState ? html`<div class="state">${stateDisplay}</div>` : ""}
              ${this._renderStages()}
            `}
      </div>
    `;
  }

  _handleTap() {
    // The click the browser delivers after a hold released is the SAME
    // gesture, not a tap.
    if (this._consumeHold()) return;
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
    clearInterval(this._timerTick);
    this._timerTick = null;
  }

  getGridOptions() {
    if (this.config?.layout === "tile") {
      return { columns: 6, rows: "auto", min_columns: 3 };
    }
    return {};
  }

  getCardSize() {
    return this.config?.layout === "tile" ? 4 : 2;
  }
}

customElements.define("materia-badge", MateriaBadge);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-badge",
  name: "Materia Badge",
  description: "Square badge for dashboard headers.",
  preview: true,
});
