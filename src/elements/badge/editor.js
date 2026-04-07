import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaBadgeEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
  `;

  setConfig(config) {
    this._config = config;
  }

  get _schema() {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "name", required: true, selector: { text: {} } },
      { name: "icon", required: true, selector: { icon: {} }, context: { icon_entity: "entity" } },
      {
        name: "variant",
        selector: {
          select: {
            options: [
              { value: "primary", label: "Primary" },
              { value: "secondary", label: "Secondary" },
              { value: "tertiary", label: "Tertiary" },
              { value: "error", label: "Error" },
              { value: "device", label: "Device" },
              { value: "primary-container", label: "Primary Container" },
              { value: "secondary-container", label: "Secondary Container" },
              { value: "error-container", label: "Error Container" },
              { value: "device-container", label: "Device Container" },
              { value: "battery", label: "Battery" },
            ],
          },
        },
      },
      { name: "show_state", selector: { boolean: {} } },
      { name: "active_state", selector: { text: {} } },
      { name: "state_display", selector: { template: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
      { name: "double_tap_action", selector: { ui_action: { default_action: "none" } } },
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
    this._config = { ...this._config, ...ev.detail.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("materia-badge-editor", MateriaBadgeEditor);
