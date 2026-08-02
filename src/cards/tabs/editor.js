import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaTabsEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .options-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .option-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .option-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .option-header span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .option-body {
        padding: 8px 12px 12px;
      }
      .option-body ha-form {
        display: block;
        width: 100%;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expanded ??= null;
  }

  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Tabs",
        icon: "mdi:tab",
        fields: [
          {
            name: "entity",
            label: "Entity holding the selected tab",
            helper: "An input_select whose options are the tab values. Conditional cards on the same entity are the tab pages.",
            selector: { entity: { domain: ["input_select", "select", "input_text"] } },
          },
          { name: "attribute", label: "Attribute (instead of the state)", selector: { text: {} } },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }

  get _itemSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "value", label: "Value (the entity state this tab means)", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "tap_action", label: "Action (overrides writing the value)", selector: { ui_action: { default_action: "none" } } },
    ];
  }

  _renderExtra() {
    const items = this._config.items || [];
    return html`
      <div class="options-header">
        <span>Tabs</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveItem(from, to),
        items.map(
          (item, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${item.label || item.value || `Tab ${i + 1}`}</span>
                <ha-icon-button @click=${() => this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeItem(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded === i
                ? html`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${item}
                        .schema=${this._itemSchema}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._updateItem(i, e.detail.value)}
                      ></ha-form>
                    </div>
                  `
                : ""}
            </div>
          `
        )
      )}
    `;
  }

  _addItem() {
    const items = [...(this._config.items || []), { label: "", value: "", icon: "" }];
    this._expanded = items.length - 1;
    this._commit({ ...this._config, items });
  }

  _removeItem(index) {
    const items = [...(this._config.items || [])];
    items.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commit({ ...this._config, items });
  }

  _moveItem(from, to) {
    const items = [...(this._config.items || [])];
    const [m] = items.splice(from, 1);
    items.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commit({ ...this._config, items });
  }

  _updateItem(index, value) {
    const items = [...(this._config.items || [])];
    // Spread preserves YAML-only keys.
    items[index] = { ...items[index], ...value };
    this._commit({ ...this._config, items });
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }
}

customElements.define("materia-tabs-editor", MateriaTabsEditor);
