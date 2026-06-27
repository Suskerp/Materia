import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaMenuEditor extends SmartEditorBase {
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
        display: flex;
        flex-direction: column;
        gap: 8px;
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

  get _sections() {
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", selector: { entity: {} } },
          { name: "name", template: true, selector: { text: {} } },
          {
            name: "icon",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
          {
            name: "position",
            selector: { select: { mode: "dropdown", options: [
              { value: "below", label: "Below" },
              { value: "above", label: "Above" },
            ] } },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / icon", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }

  get _optionSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "value", required: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ];
  }

  _renderExtra() {
    return html`
      <div class="options-header">
        <span>Options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${(this._config.options || []).map(
        (opt, i) => html`
          <div class="option-card">
            <div class="option-header">
              <span>${opt.label || opt.value || `Option ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._moveOption(i, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._moveOption(i, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._toggleExpand(i)}>
                <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeOption(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded === i
              ? html`
                  <div class="option-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${opt}
                      .schema=${this._optionSchema}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._updateOptionForm(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
      ${this._renderStateColors()}
    `;
  }

  _renderStateColors() {
    const items = Array.isArray(this._config.state_colors) ? this._config.state_colors : [];
    return html`
      <div class="options-header">
        <span>State colors</span>
        <ha-icon-button @click=${this._addStateColor}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${items.map(
        (it, i) => html`
          <div class="option-card">
            <div class="option-header">
              <span>${this._stateLabel(it.state) || `State ${i + 1}`}</span>
              <ha-icon-button @click=${() => this._removeStateColor(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="option-body">
              <ha-textfield
                label="State (comma-separated for multiple)"
                .value=${this._stateLabel(it.state)}
                @change=${(e) => this._updateStateColor(i, "state", this._parseStateInput(e.target.value))}
              ></ha-textfield>
              <materia-color-picker
                label="Background"
                .value=${it.color || ""}
                @value-changed=${(e) => { e.stopPropagation(); this._updateStateColor(i, "color", e.detail.value); }}
              ></materia-color-picker>
              <materia-color-picker
                label="Text / icon"
                .value=${it.color_on || ""}
                @value-changed=${(e) => { e.stopPropagation(); this._updateStateColor(i, "color_on", e.detail.value); }}
              ></materia-color-picker>
            </div>
          </div>
        `
      )}
    `;
  }

  _stateLabel(state) {
    return Array.isArray(state) ? state.join(", ") : (state || "");
  }

  _parseStateInput(value) {
    const v = (value || "").trim();
    if (v.includes(",")) return v.split(",").map((s) => s.trim()).filter(Boolean);
    return v;
  }

  _addStateColor() {
    const list = [...(this._config.state_colors || []), {}];
    this._commit({ ...this._config, state_colors: list });
  }

  _removeStateColor(i) {
    const list = [...(this._config.state_colors || [])];
    list.splice(i, 1);
    const next = { ...this._config };
    if (list.length) next.state_colors = list;
    else delete next.state_colors;
    this._commit(next);
  }

  _updateStateColor(i, key, value) {
    const list = (this._config.state_colors || []).map((x) => ({ ...x }));
    if (!list[i]) return;
    if (value === "" || value == null) delete list[i][key];
    else list[i][key] = value;
    this._commit({ ...this._config, state_colors: list });
  }

  _addOption() {
    const options = [...(this._config.options || []), { label: "", value: "", icon: "" }];
    this._expanded = options.length - 1;
    this._commit({ ...this._config, options });
  }

  _removeOption(index) {
    const options = [...(this._config.options || [])];
    options.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commit({ ...this._config, options });
  }

  _moveOption(index, direction) {
    const options = [...(this._config.options || [])];
    const target = index + direction;
    if (target < 0 || target >= options.length) return;
    [options[index], options[target]] = [options[target], options[index]];
    if (this._expanded === index) this._expanded = target;
    this._commit({ ...this._config, options });
  }

  _updateOptionForm(index, value) {
    const options = [...(this._config.options || [])];
    options[index] = { ...options[index], ...value };
    this._commit({ ...this._config, options });
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }
}

customElements.define("materia-menu-editor", MateriaMenuEditor);
