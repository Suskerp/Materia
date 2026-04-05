import { LitElement, html, css } from "lit";
import "../primitives/slider.js";
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

  _onSliderChanged(ev) {
    const value = ev.detail.value;
    if (value === 0) {
      this.hass.callService("light", "turn_off", {
        entity_id: this._config.entity,
      });
    } else {
      this.hass.callService("light", "turn_on", {
        entity_id: this._config.entity,
        brightness: value,
      });
    }
  }

  /* ── Render ── */

  render() {
    if (!this._config || !this.hass) return html``;

    const isOn = this._isOn;

    return html`
      <ha-card
        style=${isOn
          ? "background-color: var(--md-sys-cust-color-light-container); color: var(--md-sys-cust-color-on-light);"
          : ""}
      >
        <div class="header-row" @click=${this._toggleLight}>
          <ha-icon .icon=${this._icon}></ha-icon>
          <div class="info">
            <div class="name">${this._name}</div>
            <div class="state">${this._stateDisplay}</div>
          </div>
        </div>
        <materia-slider
          min="0"
          max="255"
          .value=${this._brightness}
          live-update
          .color=${isOn ? this._tintColor : ""}
          ?disabled=${!isOn}
          @value-changed=${this._onSliderChanged}
        ></materia-slider>
      </ha-card>
    `;
  }

  getCardSize() {
    return 2;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      border-radius: var(--ha-card-border-radius, 18px);
      padding: 12px 16px;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow: hidden;
    }
    .header-row {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    ha-icon {
      --mdc-icon-size: 24px;
      flex-shrink: 0;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .name {
      font-size: 14px;
      font-weight: 500;
    }
    .state {
      font-size: 12px;
      opacity: 0.7;
      margin-top: 2px;
    }
    materia-slider {
      margin-top: 8px;
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
