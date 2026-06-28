import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate } from "../../utils/smart-editor.js";

class MateriaSplitButtonEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 13px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .opt-body ha-form {
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
    return { variant: "tonal", size: "s", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Leading button",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "icon", template: true, selector: { icon: {} } },
          { name: "label", template: true, selector: { text: {} } },
          { name: "tap_action", label: "Action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "filled", label: "Filled" },
              { value: "tonal", label: "Tonal" },
              { value: "elevated", label: "Elevated" },
              { value: "outlined", label: "Outlined" },
            ] } },
          },
          {
            name: "size",
            selector: { select: { mode: "dropdown", options: [
              { value: "xs", label: "Extra small" },
              { value: "s", label: "Small" },
              { value: "m", label: "Medium" },
              { value: "l", label: "Large" },
              { value: "xl", label: "Extra large" },
            ] } },
          },
          { name: "color", label: "Background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Text / icon", color: true, template: true, selector: { text: {} } },
        ],
      },
    ];
  }

  _optionSchema(opt) {
    return [
      isTemplate(opt?.icon)
        ? { name: "icon", selector: { template: {} } }
        : { name: "icon", selector: { icon: {} } },
      { name: "label", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    const options = Array.isArray(this._config.options) ? this._config.options : [];
    return html`
      <div class="opt-header">
        <span>Menu options</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${options.map(
        (opt, i) => html`
          <div class="opt-card">
            <div class="opt-row">
              <span>${opt.label || (opt.icon && !isTemplate(opt.icon) ? opt.icon : `Option ${i + 1}`)}</span>
              <ha-icon-button @click=${() => this._moveOption(i, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._moveOption(i, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._toggleOption(i)}>
                <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeOption(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expanded === i
              ? html`
                  <div class="opt-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${opt}
                      .schema=${this._optionSchema(opt)}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._optionChanged(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}
    `;
  }

  _addOption() {
    const options = [...(this._config.options || []), { icon: "mdi:circle-outline" }];
    this._expanded = options.length - 1;
    this._commit({ ...this._config, options });
  }

  _removeOption(i) {
    const options = [...(this._config.options || [])];
    options.splice(i, 1);
    if (this._expanded === i) this._expanded = null;
    this._commit({ ...this._config, options });
  }

  _moveOption(i, delta) {
    const options = [...(this._config.options || [])];
    const to = i + delta;
    if (to < 0 || to >= options.length) return;
    [options[i], options[to]] = [options[to], options[i]];
    if (this._expanded === i) this._expanded = to;
    this._commit({ ...this._config, options });
  }

  _optionChanged(i, value) {
    const options = [...(this._config.options || [])];
    options[i] = { ...options[i], ...value };
    this._commit({ ...this._config, options });
  }

  _toggleOption(i) {
    this._expanded = this._expanded === i ? null : i;
  }
}

customElements.define("materia-split-button-editor", MateriaSplitButtonEditor);
