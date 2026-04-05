import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaIconButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    .yaml-label {
      font-size: 13px;
      font-weight: 500;
      margin: 8px 0 4px;
      color: var(--secondary-text-color);
    }
    textarea {
      width: 100%;
      min-height: 80px;
      box-sizing: border-box;
      font-family: monospace;
      font-size: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      padding: 6px;
      resize: vertical;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
    }
  `;

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "icon", required: true, selector: { icon: {} } },
      {
        name: "variant",
        selector: {
          select: {
            options: [
              { value: "standard", label: "Standard" },
              { value: "outlined", label: "Outlined" },
              { value: "filled", label: "Filled" },
              { value: "filled-tonal", label: "Filled Tonal" },
            ],
          },
        },
      },
      {
        name: "size",
        selector: {
          select: {
            options: [
              { value: "default", label: "Default (48px)" },
              { value: "large", label: "Large (56px)" },
            ],
          },
        },
      },
      { name: "entity", selector: { entity: {} } },
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

      <div class="yaml-label">Icon map (JSON, state &rarr; icon)</div>
      <textarea
        .value=${this._config.icon_map ? JSON.stringify(this._config.icon_map, null, 2) : ""}
        @change=${this._iconMapChanged}
      ></textarea>

      <div class="yaml-label">Tap action (JSON)</div>
      <textarea
        .value=${this._config.tap_action ? JSON.stringify(this._config.tap_action, null, 2) : ""}
        @change=${this._tapActionChanged}
      ></textarea>
    `;
  }

  _valueChanged(ev) {
    const updated = {
      ...this._config,
      ...ev.detail.value,
      icon_map: this._config.icon_map,
      tap_action: this._config.tap_action,
    };
    this._fireConfig(updated);
  }

  _iconMapChanged(ev) {
    const raw = ev.target.value.trim();
    if (!raw) {
      const { icon_map: _, ...rest } = this._config;
      this._fireConfig(rest);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this._fireConfig({ ...this._config, icon_map: parsed });
    } catch (_) {}
  }

  _tapActionChanged(ev) {
    const raw = ev.target.value.trim();
    if (!raw) {
      const { tap_action: _, ...rest } = this._config;
      this._fireConfig(rest);
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      this._fireConfig({ ...this._config, tap_action: parsed });
    } catch (_) {}
  }

  _fireConfig(config) {
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

customElements.define("materia-icon-button-editor", MateriaIconButtonEditor);
