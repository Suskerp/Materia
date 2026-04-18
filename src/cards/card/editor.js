import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

const DOMAINS_WITH_SUB_BUTTONS = new Set(["cover"]);

function isTemplate(val) {
  return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
}

/** Apply implicit defaults so the form reflects runtime behavior. */
export function applyCardFormDefaults(config) {
  if (!config?.entity) return { ...config };
  const domain = config.entity.split(".")[0];
  const defaults = { show_sub_buttons: false, show_stop: true, show_state: true };
  if (DOMAINS_WITH_SUB_BUTTONS.has(domain)) defaults.show_sub_buttons = true;
  return { ...defaults, ...config };
}

export class MateriaCardEditor extends LitElement {
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

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("light.")) || "light.example";
    return { entity };
  }

  setConfig(config) {
    this._config = config;
    this._expandedButton = null;
  }

  get _mainSchema() {
    const domain = this._config?.entity?.split(".")[0];
    const isCover = domain === "cover";
    const isLight = domain === "light";
    const hasSlider = isLight || isCover;
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { template: {} } },
      { name: "subtitle", selector: { template: {} } },
      { name: "icon", selector: { template: {} }, context: { icon_entity: "entity" } },
      ...(hasSlider ? [{ name: "show_slider", selector: { boolean: {} } }] : []),
      ...(isLight ? [{ name: "slider_turn_off", label: "Slider can turn off", selector: { boolean: {} } }] : []),
      { name: "show_state", selector: { boolean: {} } },
      { name: "show_sub_buttons", selector: { boolean: {} } },
      ...(isCover ? [{ name: "show_stop", label: "Show stop", selector: { boolean: {} } }] : []),
      { name: "show_last_changed", label: "Show last changed", selector: { boolean: {} } },
      { name: "color", selector: { template: {} } },
      { name: "color_on", selector: { template: {} } },
      { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
    ];
  }

  _subButtonSchema(btn) {
    const iconIsTemplate = isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} } },
      { name: "name", label: "Label (optional)", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const subButtons = Array.isArray(this._config.sub_buttons) ? this._config.sub_buttons : [];
    const formData = applyCardFormDefaults(this._config);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${this._mainSchema}
        .computeLabel=${computeLabel}
        @value-changed=${this._mainChanged}
      ></ha-form>

      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${subButtons.map((btn, i) => html`
        <div class="button-card">
          <div class="button-header" @click=${() => this._toggleButton(i)}>
            <span>${btn.name || (btn.icon && !isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`)}</span>
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
                .schema=${this._subButtonSchema(btn)}
                .computeLabel=${computeLabel}
                @value-changed=${(e) => this._subButtonChanged(i, e.detail.value)}
              ></ha-form>
            </div>
          ` : ""}
        </div>
      `)}
    `;
  }

  _mainChanged(ev) {
    const { sub_buttons, ...rest } = this._config;
    const next = { ...rest, ...ev.detail.value };
    if (sub_buttons !== undefined) next.sub_buttons = sub_buttons;
    this._fireConfig(next);
  }

  _toggleButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addButton() {
    const buttons = [...(this._config.sub_buttons || []), { icon: "mdi:star" }];
    this._fireConfig({ ...this._config, sub_buttons: buttons });
    this._expandedButton = buttons.length - 1;
  }

  _removeButton(i) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    const next = { ...this._config };
    if (buttons.length === 0) delete next.sub_buttons;
    else next.sub_buttons = buttons;
    this._fireConfig(next);
  }

  _subButtonChanged(i, value) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._fireConfig({ ...this._config, sub_buttons: buttons });
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

customElements.define("materia-card-editor", MateriaCardEditor);
