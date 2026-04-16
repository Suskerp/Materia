import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaIconRowEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _expandedButton: { state: true },
  };

  static styles = css`
    :host { display: block; }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 16px 0 8px;
      font-weight: 600;
      font-size: 14px;
    }

    .button-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }

    .button-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
      cursor: pointer;
    }

    .button-header span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
    }

    .button-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `;

  setConfig(config) {
    this._config = config;
    this._expandedButton = null;
  }

  _isTemplate(val) {
    return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
  }

  get _rowSchema() {
    return [
      {
        name: "gap",
        label: "Gap between buttons",
        selector: { number: { min: 0, max: 64, step: 4, unit_of_measurement: "px", mode: "slider" } },
      },
      {
        name: "padding",
        label: "Vertical padding",
        selector: { number: { min: 0, max: 48, step: 4, unit_of_measurement: "px", mode: "slider" } },
      },
    ];
  }

  _buttonSchema(btn) {
    const iconIsTemplate = this._isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} }, context: { icon_entity: "entity" } },
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
      { name: "disabled", selector: { template: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const buttons = this._config.buttons || [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ gap: 8, padding: 4, ...this._config }}
        .schema=${this._rowSchema}
        .computeLabel=${computeLabel}
        @value-changed=${this._rowChanged}
      ></ha-form>

      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${buttons.map((btn, i) => html`
        <div class="button-card">
          <div class="button-header" @click=${() => this._toggleButton(i)}>
            <span>${btn.icon && !this._isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`}</span>
            <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleButton(i); }}>
              <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </ha-icon-button>
            <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeButton(i); }}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._expandedButton === i ? html`
            <div class="button-body">
              <ha-form
                .hass=${this.hass}
                .data=${btn}
                .schema=${this._buttonSchema(btn)}
                .computeLabel=${computeLabel}
                @value-changed=${(e) => this._buttonChanged(i, e.detail.value)}
              ></ha-form>
            </div>
          ` : ""}
        </div>
      `)}
    `;
  }

  _toggleButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _rowChanged(ev) {
    const { buttons, ...rest } = this._config;
    this._fireConfig({ ...rest, ...ev.detail.value, buttons });
  }

  _addButton() {
    const buttons = [...(this._config.buttons || []), { icon: "mdi:star", variant: "filled", size: "default" }];
    this._fireConfig({ ...this._config, buttons });
    this._expandedButton = buttons.length - 1;
  }

  _removeButton(i) {
    const buttons = [...(this._config.buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    this._fireConfig({ ...this._config, buttons });
  }

  _buttonChanged(i, value) {
    const buttons = [...(this._config.buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._fireConfig({ ...this._config, buttons });
  }

  _fireConfig(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define("materia-icon-row-editor", MateriaIconRowEditor);
