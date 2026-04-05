import { LitElement, html, css, nothing } from "lit";
import { injectFonts } from "../styles/shared.js";

/* ───────────────────────────────────────────────
 *  materia-climate-editor
 *  Visual config editor for materia-climate.
 * ─────────────────────────────────────────────── */

class MateriaClimateEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "climate" } } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "humidity_entity", selector: { entity: { domain: "sensor" } } },
      { name: "outdoor_temp_entity", selector: { entity: { domain: "sensor" } } },
      { name: "step", selector: { number: { min: 0.5, max: 5, step: 0.5, mode: "box" } } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${(s) => s.name.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
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
customElements.define("materia-climate-editor", MateriaClimateEditor);

/* ───────────────────────────────────────────────
 *  materia-climate
 *  Native LitElement climate card for Materia.
 *  Supports heat / cool / auto / off modes.
 * ─────────────────────────────────────────────── */

class MateriaClimate extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  /* ── config ───────────────────────────────── */

  static getConfigElement() {
    return document.createElement("materia-climate-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", step: 0.5 };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!config.name) throw new Error("name is required");
    this._config = {
      step: 0.5,
      ...config,
    };
  }

  getCardSize() {
    return 3;
  }

  /* ── helpers ──────────────────────────────── */

  get _entity() {
    return this.hass?.states[this._config.entity];
  }

  get _mode() {
    return this._entity?.state ?? "off";
  }

  get _targetTemp() {
    return this._entity?.attributes?.temperature;
  }

  get _currentTemp() {
    return this._entity?.attributes?.current_temperature;
  }

  get _humidity() {
    if (!this._config.humidity_entity) return undefined;
    return this.hass?.states[this._config.humidity_entity]?.state;
  }

  get _outdoorTemp() {
    if (!this._config.outdoor_temp_entity) return undefined;
    return this.hass?.states[this._config.outdoor_temp_entity]?.state;
  }

  /* ── mode-dependent values ────────────────── */

  _modeIcon() {
    switch (this._mode) {
      case "heat":
        return "mdi:fire";
      case "cool":
        return "mdi:snowflake";
      case "auto":
        return "mdi:autorenew";
      default:
        return "mdi:power";
    }
  }

  _modeBg() {
    switch (this._mode) {
      case "heat":
        return "var(--md-sys-cust-color-climate-heat-container)";
      case "cool":
        return "var(--md-sys-cust-color-climate-cool-container)";
      case "auto":
        return "var(--md-sys-cust-color-climate-auto-container)";
      default:
        return "var(--md-sys-color-surface-variant)";
    }
  }

  _modeColor() {
    switch (this._mode) {
      case "heat":
        return "var(--md-sys-cust-color-on-climate-heat)";
      case "cool":
        return "var(--md-sys-cust-color-on-climate-cool)";
      case "auto":
        return "var(--md-sys-cust-color-on-climate-auto)";
      default:
        return "var(--md-sys-color-on-surface-variant)";
    }
  }

  _buttonBg() {
    switch (this._mode) {
      case "heat":
        return "var(--md-sys-cust-color-climate-heat)";
      case "cool":
        return "var(--md-sys-cust-color-climate-cool)";
      case "auto":
        return "var(--md-sys-cust-color-climate-auto)";
      default:
        return "rgba(68,68,68,0.7)";
    }
  }

  _buttonColor() {
    switch (this._mode) {
      case "heat":
        return "var(--md-sys-cust-color-on-climate-heat)";
      case "cool":
        return "var(--md-sys-cust-color-on-climate-cool, #fff)";
      case "auto":
        return "var(--md-sys-cust-color-on-climate-auto, #000)";
      default:
        return "var(--md-sys-color-surface-variant-light, #45464f)";
    }
  }

  /* ── status line ──────────────────────────── */

  _statusText() {
    const mode = this._mode;
    const current = this._currentTemp;
    const humidity = this._humidity;
    const outdoor = this._outdoorTemp;
    const isOff = mode === "off";

    const parts = [];

    if (isOff) {
      // Off: show outdoor temp or humidity
      if (outdoor != null) parts.push(`Outdoor \u00B7 ${outdoor}\u00B0`);
      if (humidity != null) parts.push(`Humidity \u00B7 ${humidity}%`);
      return parts.join(" \u00B7 ") || "";
    }

    // Active: "{current}° now · {humidity}% humidity" or "{Mode} · Outdoor {outdoor}°"
    if (current != null && humidity != null) {
      parts.push(`${current}\u00B0 now \u00B7 ${humidity}% humidity`);
    } else if (current != null) {
      parts.push(`${current}\u00B0 now`);
    } else if (humidity != null) {
      parts.push(`${humidity}% humidity`);
    }

    if (outdoor != null) {
      const label = mode.charAt(0).toUpperCase() + mode.slice(1);
      parts.push(`${label} \u00B7 Outdoor ${outdoor}\u00B0`);
    }

    return parts.join(" \u00B7 ") || "";
  }

  /* ── actions ──────────────────────────────── */

  _adjustTemp(delta) {
    const temp = this._targetTemp;
    if (temp == null) return;
    this.hass.callService("climate", "set_temperature", {
      entity_id: this._config.entity,
      temperature: temp + delta,
    });
  }

  _handleTap(e) {
    // Don't trigger card tap when buttons are clicked
    if (e.target.closest(".btn")) return;

    const action = this._config.tap_action ?? { action: "more-info" };

    if (action.action === "more-info") {
      const ev = new Event("hass-more-info", {
        bubbles: true,
        composed: true,
      });
      ev.detail = { entityId: this._config.entity };
      this.dispatchEvent(ev);
      return;
    }

    // Dispatch generic hass-action for other tap_action types
    const ev = new Event("hass-action", { bubbles: true, composed: true });
    ev.detail = {
      config: this._config,
      action: "tap",
    };
    this.dispatchEvent(ev);
  }

  /* ── lifecycle ────────────────────────────── */

  connectedCallback() {
    super.connectedCallback();
    injectFonts();
  }

  /* ── render ───────────────────────────────── */

  render() {
    if (!this.hass || !this._config) return html``;

    const entity = this._entity;
    if (!entity) {
      return html`<ha-card>
        <div class="card-content">Entity not found: ${this._config.entity}</div>
      </ha-card>`;
    }

    const mode = this._mode;
    const isOff = mode === "off";
    const tempDisplay = isOff
      ? "Off"
      : this._targetTemp != null
        ? Math.round(this._targetTemp)
        : "\u2014";

    return html`
      <ha-card
        @click=${this._handleTap}
        style="
          background-color: ${this._modeBg()};
          color: ${this._modeColor()};
        "
      >
        <!-- Header -->
        <div class="header">
          <ha-icon
            .icon=${this._modeIcon()}
            style="color: ${this._modeColor()}; --mdc-icon-size: 20px;"
          ></ha-icon>
          <span class="name" style="color: ${this._modeColor()};">
            ${this._config.name}
          </span>
        </div>

        <!-- Center: temp +/- -->
        <div class="center">
          <div class="center-side">
            ${isOff
              ? nothing
              : html`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${(e) => { e.stopPropagation(); this._adjustTemp(-this._config.step); }}
                  >
                    <ha-icon icon="mdi:minus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>

          <span class="temp ${isOff ? "off" : ""}">${tempDisplay}</span>

          <div class="center-side">
            ${isOff
              ? nothing
              : html`
                  <button
                    class="btn"
                    style="background-color: ${this._buttonBg()}; color: ${this._buttonColor()};"
                    @click=${(e) => { e.stopPropagation(); this._adjustTemp(this._config.step); }}
                  >
                    <ha-icon icon="mdi:plus" style="--mdc-icon-size: 20px;"></ha-icon>
                  </button>
                `}
          </div>
        </div>

        <!-- Status -->
        <div class="status" style="color: ${this._modeColor()};">
          ${this._statusText()}
        </div>
      </ha-card>
    `;
  }

  /* ── styles ───────────────────────────────── */

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: "Figtree", var(--ha-font-family, "Roboto"), sans-serif;
      }

      ha-card {
        border-radius: 30px;
        padding: 16px 20px 20px;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 205px;
        -webkit-tap-highlight-color: transparent;
        transition: background-color 0.3s ease;
      }

      /* ── header ── */
      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        min-height: 28px;
      }

      .header ha-icon {
        flex-shrink: 0;
      }

      .name {
        font-size: 16px;
        font-weight: 500;
        line-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ── center row ── */
      .center {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 4px;
      }

      .center-side {
        width: 80px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .temp {
        flex: 1;
        font-size: 72px;
        font-weight: 450;
        line-height: 1;
        text-align: center;
        user-select: none;
      }

      .temp.off {
        opacity: 0.7;
      }

      @media (max-width: 420px) {
        ha-card {
          height: 193px;
        }
        .temp {
          font-size: 64px;
        }
        .btn {
          width: 65px !important;
          height: 45px !important;
        }
      }

      /* ── +/- buttons ── */
      .btn {
        width: 80px;
        height: 55px;
        border: none;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
        transition: background-color 0.2s ease;
        -webkit-tap-highlight-color: transparent;
        padding: 0;
        outline: none;
      }

      .btn:active {
        opacity: 0.8;
      }

      .btn ha-icon {
        display: flex;
      }

      /* ── status ── */
      .status {
        font-size: 15px;
        padding-top: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
  }
}

/* ── registration ───────────────────────────── */

customElements.define("materia-climate", MateriaClimate);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-climate",
  name: "Materia Climate",
  description: "A native climate thermostat card with mode-based theming",
});
