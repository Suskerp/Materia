import { html, css } from "lit";
import { ref } from "lit/directives/ref.js";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate } from "../../utils/smart-editor.js";
import "../../elements/button/editor.js";

class MateriaIconRowEditor extends SmartEditorBase {
  static properties = {
    _expandedButton: { state: true },
    _expandedOption: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 8px;
        font-weight: 600;
        font-size: 14px;
      }
      .button-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 12px;
        margin-top: 8px;
        overflow: hidden;
      }
      .button-header {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 4px 4px 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
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
      .opt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        font-weight: 600;
        font-size: 13px;
      }
      .opt-header .hint {
        font-weight: 400;
        font-size: 11px;
        opacity: 0.7;
      }
      .opt-card {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        margin-top: 6px;
        overflow: hidden;
      }
      .opt-row {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 2px 2px 2px 10px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .opt-row span {
        flex: 1;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .opt-body {
        padding: 8px 10px 10px;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expandedButton ??= null;
  }

  _formData() {
    return { gap: 8, padding: 4, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Layout",
        icon: "mdi:tune",
        fields: [
          {
            name: "gap",
            label: "Gap between buttons",
            selector: { number: { min: 0, max: 64, step: 4, unit_of_measurement: "px", mode: "slider" } },
          },
          {
            name: "padding",
            label: "Vertical padding",
            selector: { number: { min: 0, max: 48, step: 4, unit_of_measurement: "px", mode: "slider" } },
          },
        ],
      },
    ];
  }

  _renderExtra() {
    const buttons = this._config.buttons || [];
    return html`
      <div class="section-header">
        <span>Buttons</span>
        <ha-icon-button @click=${this._addButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveButton(from, to),
        buttons.map(
        (btn, i) => html`
          <div class="button-card">
            <div class="button-header" @click=${() => this._toggleButton(i)}>
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${btn.icon && !isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`}${btn.options?.length ? " · split" : ""}</span>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleButton(i); }}>
                <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeButton(i); }}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton === i
              ? html`
                  <div class="button-body">
                    <materia-button-editor
                      .hass=${this.hass}
                      ${ref((el) => {
                        if (el && el.__materiaIdx !== i) {
                          el.__materiaIdx = i;
                          el.setConfig(btn);
                        }
                      })}
                      @config-changed=${(e) => {
                        e.stopPropagation();
                        this._buttonChanged(i, e.detail.config);
                      }}
                    ></materia-button-editor>

                    <div class="opt-header">
                      <span>Menu options <span class="hint">(adding one makes a split button)</span></span>
                      <ha-icon-button @click=${(e) => { e.stopPropagation(); this._addOption(i); }}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                      </ha-icon-button>
                    </div>
                    ${btn.options?.length
                      ? html`<ha-form
                          .hass=${this.hass}
                          .data=${{ menu_position: btn.menu_position || "bottom-right" }}
                          .schema=${[{ name: "menu_position", label: "Menu alignment", selector: { select: { mode: "dropdown", options: [
                            { value: "bottom-right", label: "Below · right-aligned" },
                            { value: "bottom-left", label: "Below · left-aligned" },
                            { value: "top-right", label: "Above · right-aligned" },
                            { value: "top-left", label: "Above · left-aligned" },
                          ] } } }]}
                          .computeLabel=${computeLabel}
                          @value-changed=${(e) => this._buttonChanged(i, { ...btn, menu_position: e.detail.value.menu_position })}
                        ></ha-form>`
                      : ""}
                    ${sortableList(
                      (from, to) => this._moveOption(i, from, to),
                      (btn.options || []).map(
                        (opt, j) => html`
                          <div class="opt-card">
                            <div class="opt-row">
                              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                              <span>${opt.label || (opt.icon && !isTemplate(opt.icon) ? opt.icon : `Option ${j + 1}`)}</span>
                              <ha-icon-button @click=${() => this._toggleOption(j)}>
                                <ha-icon icon=${this._expandedOption === j ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                              </ha-icon-button>
                              <ha-icon-button @click=${() => this._removeOption(i, j)}>
                                <ha-icon icon="mdi:delete"></ha-icon>
                              </ha-icon-button>
                            </div>
                            ${this._expandedOption === j
                              ? html`
                                  <div class="opt-body">
                                    <ha-form
                                      .hass=${this.hass}
                                      .data=${opt}
                                      .schema=${this._optionSchema(opt)}
                                      .computeLabel=${computeLabel}
                                      @value-changed=${(e) => this._optionChanged(i, j, e.detail.value)}
                                    ></ha-form>
                                  </div>
                                `
                              : ""}
                          </div>
                        `
                      )
                    )}
                  </div>
                `
              : ""}
          </div>
        `
        )
      )}
    `;
  }

  _moveButton(from, to) {
    const buttons = [...(this._config.buttons || [])];
    const [m] = buttons.splice(from, 1);
    buttons.splice(to, 0, m);
    // Collapse — the per-button sub-editor caches its index, so keep it simple.
    this._expandedButton = null;
    this._commit({ ...this._config, buttons });
  }

  _toggleButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addButton() {
    const buttons = [...(this._config.buttons || []), { icon: "mdi:star", variant: "filled", size: "default" }];
    this._expandedButton = buttons.length - 1;
    this._commit({ ...this._config, buttons });
  }

  _removeButton(i) {
    const buttons = [...(this._config.buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    this._commit({ ...this._config, buttons });
  }

  _buttonChanged(i, config) {
    const buttons = [...(this._config.buttons || [])];
    // Preserve menu options the button editor doesn't manage.
    const opts = buttons[i]?.options;
    buttons[i] = opts && !config.options ? { ...config, options: opts } : config;
    this._commit({ ...this._config, buttons });
  }

  /* ---- per-button split-menu options ---- */

  _optionSchema(opt) {
    return [
      isTemplate(opt?.icon)
        ? { name: "icon", selector: { template: {} } }
        : { name: "icon", selector: { icon: {} } },
      { name: "label", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  _withButtonOptions(i, mutate) {
    const buttons = [...(this._config.buttons || [])];
    const btn = { ...buttons[i] };
    const options = [...(btn.options || [])];
    mutate(options);
    if (options.length) btn.options = options;
    else delete btn.options;
    buttons[i] = btn;
    this._commit({ ...this._config, buttons });
  }

  _addOption(i) {
    this._withButtonOptions(i, (options) => {
      options.push({ icon: "mdi:circle-outline" });
      this._expandedOption = options.length - 1;
    });
  }

  _removeOption(i, j) {
    if (this._expandedOption === j) this._expandedOption = null;
    this._withButtonOptions(i, (options) => options.splice(j, 1));
  }

  _moveOption(i, from, to) {
    this._withButtonOptions(i, (options) => {
      const [m] = options.splice(from, 1);
      options.splice(to, 0, m);
    });
    if (this._expandedOption === from) this._expandedOption = to;
  }

  _optionChanged(i, j, value) {
    this._withButtonOptions(i, (options) => {
      options[j] = { ...options[j], ...value };
    });
  }

  _toggleOption(j) {
    this._expandedOption = this._expandedOption === j ? null : j;
  }
}

customElements.define("materia-icon-row-editor", MateriaIconRowEditor);
