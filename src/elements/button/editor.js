import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaButtonEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
    _actionRows: { state: true },
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
    // Working rows in local state so a blank row isn't dropped before it's
    // filled in. Initialized once from config.
    this._actionRows ??= Object.entries(config.tap_action_map || {}).map(
      ([state, tap_action]) => ({ state, tap_action })
    );
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

  _renderExtra() {
    const rows = this._actionRows || [];
    return html`
      <div class="section-header">
        <span>Action mappings</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${rows.map(
        (row, i) => html`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${row.state || `Mapping ${i + 1}`}</span>
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
                      .data=${row}
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

  get _mappingSchema() {
    return [
      { name: "state", required: true, helper: "Use 'default' for the fallback", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }

  _addMapping() {
    this._actionRows = [...(this._actionRows || []), { state: "" }];
    this._expanded = this._actionRows.length - 1;
  }

  _updateMapping(i, value) {
    this._actionRows = (this._actionRows || []).map((r, idx) => (idx === i ? { ...r, ...value } : r));
    this._commitActionRows();
  }

  _removeMapping(i) {
    this._actionRows = (this._actionRows || []).filter((_, idx) => idx !== i);
    if (this._expanded === i) this._expanded = null;
    this._commitActionRows();
  }

  _commitActionRows() {
    const map = {};
    for (const r of this._actionRows || []) {
      if (r.state && r.tap_action) map[r.state] = r.tap_action;
    }
    const { tap_action_map, ...rest } = this._config;
    this._commit(Object.keys(map).length ? { ...rest, tap_action_map: map } : rest);
  }
}

customElements.define("materia-button-editor", MateriaButtonEditor);
