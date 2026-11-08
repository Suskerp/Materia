import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";

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
    return { variant: "tonal", size: "s", menu_position: "bottom-right", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_leadin_button",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "icon", template: true, selector: { icon: {} } },
          { name: "label", template: true, selector: { text: {} } },
          { name: "tap_action", label: "sched_action", selector: { ui_action: { default_action: "more-info" } } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "filled", label: "e_filled" },
              { value: "tonal", label: "e_tonal" },
              { value: "elevated", label: "e_elevated" },
              { value: "outlined", label: "e_outlined" },
            ] } },
          },
          {
            name: "size",
            selector: { select: { mode: "dropdown", options: [
              { value: "xs", label: "e_extra_small" },
              { value: "s", label: "e_small" },
              { value: "m", label: "e_medium" },
              { value: "l", label: "e_large" },
              { value: "xl", label: "e_extra_large" },
            ] } },
          },
          {
            name: "menu_position",
            label: "e_menu_alignm",
            selector: { select: { mode: "dropdown", options: [
              { value: "bottom-right", label: "e_below_right_aligne" },
              { value: "bottom-left", label: "e_below_left_aligne" },
              { value: "top-right", label: "e_above_right_aligne" },
              { value: "top-left", label: "e_above_left_aligne" },
            ] } },
          },
          { name: "color", label: "e_background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }

  _optionSchema(opt) {
    return [
      isTemplate(opt?.icon)
        ? { name: "icon", selector: { template: {} } }
        : { name: "icon", selector: { icon: {} } },
      { name: "label", selector: { text: {} } },
      { name: "tap_action", label: "sched_action", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    const options = Array.isArray(this._config.options) ? this._config.options : [];
    return html`
      <div class="opt-header">
        <span>${t("e_menu_options", this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveOption(from, to),
        options.map(
          (opt, i) => html`
            <div class="opt-card">
              <div class="opt-row">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${opt.label || (opt.icon && !isTemplate(opt.icon) ? opt.icon : t("e_option_n", this.hass, { n: i + 1 }))}</span>
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
                        .schema=${localize(this._optionSchema(opt), this.hass)}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._optionChanged(i, e.detail.value)}
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

  _moveOption(from, to) {
    const options = [...(this._config.options || [])];
    const [m] = options.splice(from, 1);
    options.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
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
