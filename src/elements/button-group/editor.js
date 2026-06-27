import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { PRESETS } from "./styles.js";

class MateriaButtonGroupEditor extends SmartEditorBase {
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

  _sectionsSignature() {
    return `${this._config?.preset || ""}|${this._config?.multi_select ? 1 : 0}`;
  }

  get _sections() {
    const presetOptions = [
      ...Object.keys(PRESETS).map((k) => ({
        value: k,
        label: k.charAt(0).toUpperCase() + k.slice(1).replace(/-/g, " "),
      })),
      { value: "custom", label: "Custom" },
    ];

    const setup = {
      title: "Setup",
      icon: "mdi:tune",
      fields: [
        { name: "entity", selector: { entity: {} } },
        { name: "attribute", selector: { text: {} } },
        { name: "preset", label: "Color preset", selector: { select: { mode: "dropdown", options: presetOptions } } },
        { name: "size", selector: { select: { mode: "dropdown", options: [
          { value: "xs", label: "XS (32dp)" },
          { value: "s", label: "S (36dp)" },
          { value: "m", label: "M (40dp)" },
          { value: "l", label: "L (48dp)" },
          { value: "xl", label: "XL (56dp)" },
        ] } } },
        { name: "variant", label: "Style", selector: { select: { mode: "dropdown", options: [
          { value: "filled", label: "Filled" },
          { value: "tonal", label: "Tonal" },
        ] } } },
        { name: "multi_select", label: "Multi-select", selector: { boolean: {} } },
        ...(this._config?.multi_select
          ? [{ name: "columns", label: "Max columns", selector: { number: { min: 1, max: 8, mode: "box" } } }]
          : []),
      ],
    };

    const sections = [setup];

    if (this._config?.preset === "custom") {
      sections.push({
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color_active", label: "Active color", color: true, template: true, selector: { text: {} } },
          { name: "color_on_active", label: "Active text color", color: true, template: true, selector: { text: {} } },
        ],
      });
    }

    return sections;
  }

  get _optionSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "value", required: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: { default_action: "call-service" } } },
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
    `;
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

customElements.define("materia-button-group-editor", MateriaButtonGroupEditor);
