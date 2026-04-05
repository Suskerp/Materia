import { LitElement, html, css, nothing } from "lit";
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
    if (pos === 0) return this._capitalize("Closed");
    if (pos === 100) return this._capitalize("Open");
    return `${pos}% ${this._capitalize("open")}`;
  }

  /* ── Actions ── */

  _onRangeInput(ev) {
    const value = parseInt(ev.target.value, 10);
    this.hass.callService("cover", "set_cover_position", {
      entity_id: this._config.entity,
      position: value,
    });
  }

  _openCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "open_cover", {
      entity_id: this._config.entity,
    });
  }

  _stopCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "stop_cover", {
      entity_id: this._config.entity,
    });
  }

  _closeCover(ev) {
    ev.stopPropagation();
    this.hass.callService("cover", "close_cover", {
      entity_id: this._config.entity,
    });
  }

  /* ── Render ── */

  render() {
    if (!this._config || !this.hass) return html``;

    const isOpen = this._isOpen;
    const pos = this._position;
    const fillColor = isOpen ? "var(--md-sys-cust-color-light)" : "transparent";

    return html`
      <ha-card>
        <div class="container">
          <div
            class="fill"
            style="width: ${pos}%; background-color: ${fillColor}; opacity: 0.5;"
          ></div>
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
          <div class="sub-buttons">
            <button class="sub-btn" @click=${this._openCover}>
              <ha-icon icon="mdi:arrow-up"></ha-icon>
            </button>
            ${this._config.show_stop
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
          <input
            type="range"
            class="range-input"
            min="0"
            max="100"
            .value=${String(pos)}
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
      background-color: var(--ha-card-background, var(--card-background-color));
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
    .sub-buttons {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-right: 8px;
      position: relative;
      z-index: 3;
    }
    .sub-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .sub-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .sub-btn:active {
      opacity: 0.7;
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

customElements.define("materia-cover", MateriaCover);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-cover",
  name: "Materia Cover",
  description: "A cover card with position slider and up/stop/down controls",
});
