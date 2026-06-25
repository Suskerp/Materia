import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate } from "../../utils/smart-editor.js";

class MateriaIconRowEditor extends SmartEditorBase {
  static properties = {
    _expandedButton: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 8px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
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
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expandedButton = null;
  }

  _formData() {
    return { gap: 8, padding: 4, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Layout",
        icon: "mdi:tune",
        fields: [
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
        ],
      },
    ];
  }

  _buttonSchema(btn) {
    const iconIsTemplate = isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} }, context: { icon_entity: "entity" } },
      {
        name: "variant",
        selector: { select: { options: [
          { value: "standard", label: "Standard" },
          { value: "outlined", label: "Outlined" },
          { value: "filled", label: "Filled" },
          { value: "filled-tonal", label: "Filled Tonal" },
        ] } },
      },
      {
        name: "size",
        selector: { select: { options: [
          { value: "default", label: "Default (48px)" },
          { value: "large", label: "Large (56px)" },
        ] } },
      },
      { name: "entity", selector: { entity: {} } },
      { name: "disabled", selector: { template: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    const buttons = this._config.buttons || [];
    return html`
      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${buttons.map(
        (btn, i) => html`
          <div class="button-card">
            <div class="button-header" @click=${() => this._toggleButton(i)}>
              <span>${btn.icon && !isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`}</span>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleButton(i); }}>
                <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeButton(i); }}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton === i
              ? html`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${btn}
                      .schema=${this._buttonSchema(btn)}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._buttonChanged(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  _toggleButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addButton() {
    const buttons = [...(this._config.buttons || []), { icon: "mdi:star", variant: "filled", size: "default" }];
    this._expandedButton = buttons.length - 1;
    this._commit({ ...this._config, buttons });
  }

  _removeButton(i) {
    const buttons = [...(this._config.buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    this._commit({ ...this._config, buttons });
  }

  _buttonChanged(i, value) {
    const buttons = [...(this._config.buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._commit({ ...this._config, buttons });
  }
}

customElements.define("materia-icon-row-editor", MateriaIconRowEditor);
