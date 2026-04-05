import { LitElement, html, css } from "lit";
import { computeLabel } from "../utils/editor-helpers.js";
import { ActionMixin } from "../utils/action-handler.js";

/* ── Editor ─────────────────────────────────────────────────────── */

class MateriaLightDimmerEditor extends LitElement {
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
customElements.define("materia-light-dimmer-editor", MateriaLightDimmerEditor);

/* ── Card ───────────────────────────────────────────────────────── */

class MateriaLightDimmer extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-light-dimmer-editor");
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

  get _brightness() {
    return this._entity?.attributes?.brightness ?? 0;
  }

  get _brightnessPercent() {
    return Math.round((this._brightness / 255) * 100);
  }

  get _tintColor() {
    const rgb = this._entity?.attributes?.rgb_color;
    if (rgb) return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    return "var(--md-sys-cust-color-light)";
  }

  get _name() {
    return this._config.name || this._entity?.attributes?.friendly_name || "";
  }

  get _icon() {
    return this._config.icon || "mdi:track-light";
  }

  get _stateDisplay() {
    if (!this._isOn) return "Off";
    return `${this._brightnessPercent}%`;
  }

  /* ── Actions ── */

  _toggleLight() {
    this.hass.callService("light", "toggle", {
      entity_id: this._config.entity,
    });
  }

  _onRangeInput(ev) {
    const value = parseInt(ev.target.value, 10);
    const brightness = Math.round((value / 100) * 255);
    if (brightness === 0) {
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

  /* ── Render ── */

  render() {
    if (!this._config || !this.hass) return html``;

    const isOn = this._isOn;
    const pct = this._brightnessPercent;
    const fillColor = isOn ? this._tintColor : "transparent";

    return html`
      <ha-card>
        <div class="container">
          <div
            class="fill"
            style="width: ${isOn ? pct : 0}%; background-color: ${fillColor}; opacity: 0.5;"
          ></div>
          <div class="icon-container">
            <ha-icon .icon=${this._icon}></ha-icon>
          </div>
          <div class="name-container">
            <div class="name">${this._name}</div>
            <div class="state">${this._stateDisplay}</div>
          </div>
          <input
            type="range"
            class="range-input"
            min="0"
            max="100"
            .value=${String(isOn ? pct : 0)}
            @change=${this._onRangeInput}
          />
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
      background-color: var(--secondary-background-color);
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: background-color 0.3s ease;
      cursor: pointer;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      transition: width 0.3s ease;
      z-index: 0;
      border-radius: inherit;
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
      background-color: var(--ha-card-background, var(--card-background-color));
      flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    .icon-container ha-icon {
      --mdc-icon-size: 24px;
      display: flex;
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
    .range-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: ew-resize;
      z-index: 2;
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }
  `;
}

customElements.define("materia-light-dimmer", MateriaLightDimmer);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-light-dimmer",
  name: "Materia Light Dimmer",
  description: "A dimmable light slider card",
});
