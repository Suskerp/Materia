import { LitElement, html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";

class MateriaIconButtonEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  static styles = css`
    :host { display: block; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .mapping-card {
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .mapping-header {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0,0,0,0.04));
    }
    .mapping-header span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mapping-body {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .mapping-body ha-form {
      display: block;
      width: 100%;
    }
  `;

  setConfig(config) {
    this._config = config;
  }

  _isTemplate(val) {
    return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
  }

  get _schema() {
    const iconIsTemplate = this._isTemplate(this._config?.icon);
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
      { name: "tap_action", label: "Default action", selector: { ui_action: {} } },
    ];
  }

  get _mappingSchema() {
    return [
      { name: "state", required: true, selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  get _stateMappings() {
    const map = this._config.tap_action_map || {};
    return Object.keys(map).map(state => ({ state, tap_action: map[state] }));
  }

  _expanded = null;

  render() {
    if (!this.hass || !this._config) return html``;
    const mappings = this._stateMappings;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <div class="section-header">
        <span>Action mappings</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${mappings.map(
        (m, i) => html`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${m.state || `Mapping ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._toggleExpand(i)}>
                <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeMapping(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded === i
              ? html`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${m}
                      .schema=${this._mappingSchema}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._updateMapping(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
    this.requestUpdate();
  }

  _valueChanged(ev) {
    const updated = { ...this._config, ...ev.detail.value };
    this._fireConfig(updated);
  }

  _addMapping() {
    const mappings = [...this._stateMappings, { state: "" }];
    this._applyMappings(mappings);
    this._expanded = mappings.length - 1;
  }

  _removeMapping(index) {
    const mappings = [...this._stateMappings];
    mappings.splice(index, 1);
    this._applyMappings(mappings);
    if (this._expanded === index) this._expanded = null;
  }

  _updateMapping(index, value) {
    const mappings = [...this._stateMappings];
    mappings[index] = { ...mappings[index], ...value };
    this._applyMappings(mappings);
  }

  _applyMappings(mappings) {
    const { tap_action_map, ...rest } = this._config;
    const newMap = {};
    for (const m of mappings) {
      if (m.state && m.tap_action) newMap[m.state] = m.tap_action;
    }
    const updated = Object.keys(newMap).length
      ? { ...rest, tap_action_map: newMap }
      : rest;
    this._fireConfig(updated);
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
