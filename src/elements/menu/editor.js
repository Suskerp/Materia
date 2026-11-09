import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";
import { menuItemsField } from "../../utils/media-editors.js";

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

  /** List mode: `mode: list`, or `items` without a mode (same rule as the card). */
  get _isList() {
    return this._config?.mode === "list" || (this._config?.mode == null && Array.isArray(this._config?.items));
  }

  _formData() {
    return { position: "auto", menu_variant: "surface", ...this._config, mode: this._isList ? "list" : "select" };
  }

  _sectionsSignature() {
    return this._isList ? "list" : "select";
  }

  /** Switching mode keeps the shared keys; "select" is the default and isn't written. */
  _setField(name, value) {
    if (name !== "mode") return super._setField(name, value);
    const next = { ...this._config };
    if (value === "list") {
      next.mode = "list";
      next.items ??= next.entity ? [next.entity] : [];
    } else {
      delete next.mode;
      delete next.items;
    }
    this._commit(next);
  }

  get _modeField() {
    return {
      name: "mode",
      label: "ed_menu_mode",
      selector: { select: { mode: "dropdown", options: [
        { value: "select", label: "ed_menu_mode_select" },
        { value: "list", label: "ed_menu_mode_list" },
      ] } },
    };
  }

  get _sections() {
    if (this._isList)
      return [
        {
          title: "e_content",
          icon: "mdi:card-text-outline",
          fields: [
            this._modeField,
            { name: "icon", selector: { icon: {} } },
            { name: "name", label: "ed_menu_button_label", selector: { text: {} } },
            { name: "color", label: "ed_menu_icon_color", selector: { select: { mode: "dropdown", custom_value: true, options: [
              { value: "error", label: "ed_menu_color_error" },
            ] } } },
            { name: "variant", selector: { select: { mode: "dropdown", options: [
              { value: "default", label: "e_defaul_48_px" },
              { value: "kiosk", label: "e_kiosk_44_px" },
            ] } } },
          ],
        },
      ];
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          this._modeField,
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
              { value: "auto", label: "e_auto_flips_fit" },
              { value: "below", label: "e_below" },
              { value: "above", label: "e_above" },
            ] } },
          },
        ],
      },
      {
        title: "e_substate",
        icon: "mdi:format-text-variant-outline",
        fields: [
          { name: "substate", label: "e_substa_text_templa", template: true, selector: { text: {} } },
          { name: "substate_entity", label: "e_from_entity", selector: { entity: {} } },
          { name: "substate_attribute", label: "e_entity_attrib_option", selector: { text: {} } },
          { name: "substate_separator", label: "e_separator", selector: { select: { mode: "dropdown", custom_value: true, options: [
            { value: "•", label: "e_dot" },
            { value: "–", label: "e_dash" },
            { value: "/", label: "e_slash" },
          ] } } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon", color: true, template: true, selector: { text: {} } },
          { name: "menu_variant", label: "e_menu_style", selector: { select: { mode: "dropdown", options: [
            { value: "surface", label: "e_surfac_classi" },
            { value: "expressive", label: "e_expres_contai_tone" },
          ] } } },
          { name: "menu_color", label: "e_menu_panel_color", color: true, selector: { text: {} } },
          { name: "menu_color_on", label: "e_menu_text_color", color: true, selector: { text: {} } },
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
    if (this._isList)
      return html`<div class="options-header"></div>${menuItemsField(this, this._config.items, (items) =>
        this._commit({ ...this._config, items: items ?? [] })
      )}`;
    return html`
      <div class="options-header">
        <span>${t("e_options", this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveOption(from, to),
        (this._config.options || []).map(
          (opt, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${opt.label || opt.value || t("e_option_n", this.hass, { n: i + 1 })}</span>
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
                        .schema=${localize(this._optionSchema, this.hass)}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._updateOptionForm(i, e.detail.value)}
                      ></ha-form>
                    </div>
                  `
                : ""}
            </div>
          `
        )
      )}
      ${this._renderStateColors()}
    `;
  }

  _renderStateColors() {
    const items = Array.isArray(this._config.state_colors) ? this._config.state_colors : [];
    return html`
      <div class="options-header">
        <span>${t("e_state_colors", this.hass)}</span>
        <ha-icon-button @click=${this._addStateColor}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      ${items.map(
        (it, i) => html`
          <div class="option-card">
            <div class="option-header">
              <span>${this._stateLabel(it.state) || t("e_state_n", this.hass, { n: i + 1 })}</span>
              <ha-icon-button @click=${() => this._removeStateColor(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            <div class="option-body">
              <ha-textfield
                .label=${t("e_state_csv", this.hass)}
                .value=${this._stateLabel(it.state)}
                @change=${(e) => this._updateStateColor(i, "state", this._parseStateInput(e.target.value))}
              ></ha-textfield>
              <materia-color-picker
                .hass=${this.hass}
                .label=${t("e_background", this.hass)}
                .value=${it.color || ""}
                @value-changed=${(e) => { e.stopPropagation(); this._updateStateColor(i, "color", e.detail.value); }}
              ></materia-color-picker>
              <materia-color-picker
                .hass=${this.hass}
                .label=${t("e_text_icon", this.hass)}
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

  _moveOption(from, to) {
    const options = [...(this._config.options || [])];
    const [m] = options.splice(from, 1);
    options.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
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
