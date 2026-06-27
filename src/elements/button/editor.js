import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaButtonEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
    _expandedIcon: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .mapping-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .mapping-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
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
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expanded ??= null;
    this._expandedIcon ??= null;
  }

  get _sections() {
    return [
      {
        title: "Button",
        icon: "mdi:gesture-tap-button",
        fields: [
          { name: "icon", template: true, selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "label", template: true, selector: { text: {} } },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "elevated", label: "Elevated" },
              { value: "filled", label: "Filled" },
              { value: "tonal", label: "Tonal" },
              { value: "outlined", label: "Outlined" },
              { value: "text", label: "Text" },
            ] } },
          },
          {
            name: "size",
            selector: { select: { mode: "dropdown", options: [
              { value: "xs", label: "XS (32)" },
              { value: "s", label: "S (40)" },
              { value: "m", label: "M (56)" },
              { value: "l", label: "L (96)" },
              { value: "xl", label: "XL (136)" },
            ] } },
          },
          {
            name: "shape",
            selector: { select: { mode: "dropdown", options: [
              { value: "round", label: "Round (pill)" },
              { value: "square", label: "Square" },
            ] } },
          },
          { name: "wide", selector: { boolean: {} } },
          { name: "entity", selector: { entity: {} } },
          { name: "disabled", helper: "Template returning true / false", selector: { template: {} } },
        ],
      },
      {
        title: "Behavior",
        icon: "mdi:tune",
        fields: [
          { name: "active_state", label: "Active state", helper: "State(s) considered active (defaults by domain)", selector: { text: {} } },
          { name: "morph_on_active", label: "Morph shape when active", selector: { boolean: {} } },
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", label: "Default action", selector: { ui_action: {} } },
        ],
      },
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
    return Object.keys(map).map((state) => ({ state, tap_action: map[state] }));
  }

  _renderExtra() {
    const mappings = this._stateMappings;
    return html`
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
      ${this._renderIconMappings()}
    `;
  }

  _renderIconMappings() {
    const icons = this._iconMappings;
    return html`
      <div class="section-header">
        <span>Icon mappings</span>
        <ha-icon-button @click=${this._addIconMap}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${icons.map(
        (m, i) => html`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${m.state || `Icon ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._toggleExpandIcon(i)}>
                <ha-icon icon=${this._expandedIcon === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeIconMap(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedIcon === i
              ? html`
                  <div class="mapping-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${m}
                      .schema=${this._iconMapSchema}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._updateIconMap(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  get _iconMapSchema() {
    return [
      { name: "state", required: true, helper: "Use 'default' for the fallback icon", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }

  get _iconMappings() {
    const map = this._config.icon_map || {};
    return Object.keys(map).map((state) => ({ state, icon: map[state] }));
  }

  _toggleExpandIcon(i) {
    this._expandedIcon = this._expandedIcon === i ? null : i;
  }

  _addIconMap() {
    const icons = [...this._iconMappings, { state: "" }];
    this._applyIconMap(icons);
    this._expandedIcon = icons.length - 1;
  }

  _removeIconMap(index) {
    const icons = [...this._iconMappings];
    icons.splice(index, 1);
    this._applyIconMap(icons);
    if (this._expandedIcon === index) this._expandedIcon = null;
  }

  _updateIconMap(index, value) {
    const icons = [...this._iconMappings];
    icons[index] = { ...icons[index], ...value };
    this._applyIconMap(icons);
  }

  _applyIconMap(icons) {
    const { icon_map, ...rest } = this._config;
    const newMap = {};
    for (const m of icons) {
      if (m.state && m.icon) newMap[m.state] = m.icon;
    }
    const updated = Object.keys(newMap).length ? { ...rest, icon_map: newMap } : rest;
    this._commit(updated);
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
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
    const updated = Object.keys(newMap).length ? { ...rest, tap_action_map: newMap } : rest;
    this._commit(updated);
  }
}

customElements.define("materia-button-editor", MateriaButtonEditor);
