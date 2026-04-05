import { LitElement, html, css, nothing } from "lit";
import "../primitives/slider.js";
import { computeLabel } from "../utils/editor-helpers.js";
import { ActionMixin } from "../utils/action-handler.js";

/* ── Editor ─────────────────────────────────────────────────────── */

class MateriaCoverEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", required: true, selector: { entity: { domain: "cover" } } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "show_stop", selector: { boolean: {} } },
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
customElements.define("materia-cover-editor", MateriaCoverEditor);

/* ── Card ───────────────────────────────────────────────────────── */

class MateriaCover extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static getConfigElement() {
    return document.createElement("materia-cover-editor");
  }

  static getStubConfig() {
    return { entity: "", name: "", icon: "mdi:window-shutter", show_stop: true };
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    this._config = {
      icon: "mdi:window-shutter",
      show_stop: true,
      ...config,
    };
  }

  /* ── Helpers ── */

  get _entity() {
    return this.hass?.states?.[this._config?.entity];
  }

  get _isOpen() {
    return this._entity?.state !== "closed";
  }

  get _position() {
    return this._entity?.attributes?.current_position ?? 0;
  }

  get _name() {
    return this._config.name || this._entity?.attributes?.friendly_name || "";
  }

  get _icon() {
    return this._config.icon || "mdi:window-shutter";
  }

  get _stateDisplay() {
    const pos = this._position;
    if (pos === 0) return "Closed";
    if (pos === 100) return "Open";
    return `${pos}% open`;
  }

  /* ── Actions ── */

  _onSliderChanged(ev) {
    this.hass.callService("cover", "set_cover_position", {
      entity_id: this._config.entity,
      position: ev.detail.value,
    });
  }

  _openCover() {
    this.hass.callService("cover", "open_cover", {
      entity_id: this._config.entity,
    });
  }

  _stopCover() {
    this.hass.callService("cover", "stop_cover", {
      entity_id: this._config.entity,
    });
  }

  _closeCover() {
    this.hass.callService("cover", "close_cover", {
      entity_id: this._config.entity,
    });
  }

  /* ── Render ── */

  render() {
    if (!this._config || !this.hass) return html``;

    const isOpen = this._isOpen;

    return html`
      <ha-card
        style=${isOpen
          ? "background-color: var(--md-sys-cust-color-light-container); color: var(--md-sys-cust-color-on-light);"
          : ""}
      >
        <div class="header-row">
          <ha-icon .icon=${this._icon}></ha-icon>
          <div class="info">
            <div class="name">${this._name}</div>
            <div class="state">${this._stateDisplay}</div>
          </div>
        </div>
        <div class="controls">
          <materia-slider
            min="0"
            max="100"
            .value=${this._position}
            .color=${isOpen ? "var(--md-sys-cust-color-light)" : ""}
            @value-changed=${this._onSliderChanged}
          ></materia-slider>
          <div class="buttons">
            <button class="cover-btn" @click=${this._openCover}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            ${this._config.show_stop
              ? html`
                  <button class="cover-btn" @click=${this._stopCover}>
                    <ha-icon icon="mdi:stop"></ha-icon>
                  </button>
                `
              : nothing}
            <button class="cover-btn" @click=${this._closeCover}>
              <ha-icon icon="mdi:arrow-down"></ha-icon>
            </button>
          </div>
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
    .controls {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .controls materia-slider {
      flex: 1;
    }
    .buttons {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }
    .cover-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--md-sys-color-surface-variant);
      color: var(--md-sys-color-on-surface-variant);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .cover-btn:active {
      opacity: 0.7;
    }
    .cover-btn ha-icon {
      --mdc-icon-size: 18px;
    }
  `;
}

customElements.define("materia-cover", MateriaCover);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-cover",
  name: "Materia Cover",
  description: "A cover card with position slider and up/stop/down controls",
});
