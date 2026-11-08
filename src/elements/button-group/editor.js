import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { PRESETS } from "./styles.js";
import { localize, t } from "../../utils/i18n.js";

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
      .option-header .glyph-note {
        flex: none;
        font-size: 11px;
        opacity: 0.6;
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

  /* gap and padding only reach the DOM in the standard group, which is also the
     only group that shows those fields — so seeding them unconditionally is
     safe. Max columns stays out: the card reads a missing value as 0 ("as many
     as fit"), which the 1–8 selector cannot represent. */
  _formData() {
    // The media groups size themselves; seeding size/variant would write
    // config they never read.
    if (["transport", "toolbar"].includes(this._config?.group)) return { ...this._config };
    return { group: "connected", size: "m", variant: "tonal", ...this._config };
  }

  _sectionsSignature() {
    return `${this._config?.group || ""}|${this._config?.preset || ""}|${this._config?.multi_select ? 1 : 0}`;
  }

  /** transport / toolbar: a media player's controls, not an options list. */
  get _mediaSections() {
    const group = this._config?.group;
    return [
      {
        title: "e_setup",
        icon: "mdi:tune",
        fields: [
          this._groupField,
          {
            name: "entity",
            label: "e_player_in_art",
            selector: { entity: { domain: "media_player" } },
          },
          ...(group === "transport"
            ? [{ name: "size", label: "e_height_defaul_88", selector: { select: { mode: "dropdown", options: [
                { value: "m", label: "M (56dp)" },
                { value: "l", label: "L (96dp)" },
                { value: "xl", label: "XL (136dp)" },
              ] } } }]
            : [
                { name: "align", label: "e_alignment", selector: { select: { mode: "dropdown", options: [
                  { value: "center", label: "e_centre" },
                  { value: "start", label: "e_left" },
                ] } } },
              ]),
        ],
      },
      ...(group === "toolbar"
        ? [
            {
              title: "e_buttons",
              icon: "mdi:gesture-tap-button",
              fields: [
                {
                  name: "buttons",
                  render: (value) => html`<materia-toolbar-buttons-editor
                    .hass=${this.hass}
                    .value=${value}
                    @value-changed=${(e) => {
                      e.stopPropagation();
                      this._setField("buttons", e.detail.value);
                    }}
                  ></materia-toolbar-buttons-editor>`,
                },
              ],
            },
          ]
        : []),
    ];
  }

  get _groupField() {
    return { name: "group", label: "e_configuratio", selector: { select: { mode: "dropdown", options: [
      { value: "connected", label: "e_connec_segmen_entity" },
      { value: "standard", label: "e_standa_spaced_row" },
      { value: "transport", label: "e_media_transp_prev" },
      { value: "toolbar", label: "e_media_toolba_shuffl" },
    ] } } };
  }

  get _isMediaGroup() {
    return ["transport", "toolbar"].includes(this._config?.group);
  }

  get _sections() {
    if (this._isMediaGroup) return this._mediaSections;
    const standard = this._config?.group === "standard";
    const presetOptions = [
      ...Object.keys(PRESETS).map((k) => ({
        value: k,
        label: k.charAt(0).toUpperCase() + k.slice(1).replace(/-/g, " "),
      })),
      { value: "custom", label: "al_mode_custom" },
    ];

    const setup = {
      title: "e_setup",
      icon: "mdi:tune",
      fields: [
        this._groupField,
        ...(standard ? [] : [
          { name: "entity", selector: { entity: {} } },
          { name: "attribute", selector: { text: {} } },
          { name: "preset", label: "e_color_preset", selector: { select: { mode: "dropdown", options: presetOptions } } },
        ]),
        { name: "size", label: "e_size_applie_whole", selector: { select: { mode: "dropdown", options: [
          { value: "xs", label: "XS (32dp)" },
          { value: "s", label: "S (40dp)" },
          { value: "m", label: "M (56dp)" },
          { value: "l", label: "L (96dp)" },
          { value: "xl", label: "XL (136dp)" },
        ] } } },
        { name: "variant", label: "e_style", selector: { select: { mode: "dropdown", options: [
          { value: "filled", label: "e_filled" },
          { value: "tonal", label: "e_tonal" },
        ] } } },
        ...(standard ? [
        ] : []),
        ...(standard ? [] : [{ name: "multi_select", label: "e_multi_select", selector: { boolean: {} } }]),
        ...(!standard && this._config?.multi_select
          ? [{ name: "columns", label: "e_max_column", selector: { number: { min: 1, max: 8, mode: "box" } } }]
          : []),
      ],
    };

    const sections = [setup];

    sections.push({
      title: "e_disabled",
      icon: "mdi:cancel",
      expanded: false,
      fields: [DISABLED_FIELD],
    });

    if (this._config?.preset === "custom") {
      sections.push({
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color_active", label: "e_active_color", color: true, template: true, selector: { text: {} } },
          { name: "color_on_active", label: "e_active_text_color", color: true, template: true, selector: { text: {} } },
        ],
      });
    }

    return sections;
  }

  get _optionSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "entity", label: "e_entity_option_button", selector: { entity: {} } },
      { name: "value", label: "e_value_state_active", selector: { text: {} } },
      { name: "active", label: "e_active_templa_overri", template: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "tap_action", label: "sched_action", selector: { ui_action: { default_action: "call-service" } } },
    ];
  }

  /* A standard group's buttons are full materia-buttons, so the form edits
     the button contract, not the option contract. Split buttons keep their
     menu/`tap_action_map` keys via the spread; the header marks them. */
  get _buttonSchema() {
    return [
      { name: "label", template: true, selector: { text: {} } },
      { name: "icon", template: true, selector: { icon: {} } },
      { name: "entity", label: "e_entity_option_drives", selector: { entity: {} } },
      {
        name: "variant",
        selector: { select: { mode: "dropdown", options: [
          { value: "filled", label: "e_filled" },
          { value: "tonal", label: "e_tonal" },
        ] } },
      },
      { name: "wide", label: "e_wide_stretc_share", selector: { boolean: {} } },
      { name: "tap_action", label: "sched_action", selector: { ui_action: { default_action: "call-service" } } },
    ];
  }

  /** Which list this group actually reads: standard renders `buttons`,
   *  connected renders `options`. Editing the other one edits dead config. */
  get _listKey() {
    return this._config?.group === "standard" ? "buttons" : "options";
  }

  _renderExtra() {
    if (this._isMediaGroup) return html``;
    const key = this._listKey;
    const standard = key === "buttons";
    const items = this._config[key] || [];
    const schema = standard ? this._buttonSchema : this._optionSchema;
    return html`
      <div class="options-header">
        <span>${t(standard ? "e_buttons" : "e_options", this.hass)}</span>
        <ha-icon-button @click=${this._addOption}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveOption(from, to),
        items.map(
          (opt, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${opt.label || opt.value || t(standard ? "e_button_n" : "e_option_n", this.hass, { n: i + 1 })}</span>
                ${opt.type === "split" || opt.options
                  ? html`<span class="glyph-note">${t("e_split_yaml", this.hass)}</span>`
                  : ""}
                ${opt.tap_action_map
                  ? html`<span class="glyph-note">${t("e_mapped_yaml", this.hass)}</span>`
                  : ""}
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
                        .schema=${localize(schema, this.hass)}
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
    `;
  }

  _addOption() {
    const key = this._listKey;
    const items = [
      ...(this._config[key] || []),
      key === "buttons" ? { icon: "", variant: "tonal" } : { label: "", value: "", icon: "" },
    ];
    this._expanded = items.length - 1;
    this._commit({ ...this._config, [key]: items });
  }

  _removeOption(index) {
    const key = this._listKey;
    const items = [...(this._config[key] || [])];
    items.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commit({ ...this._config, [key]: items });
  }

  _moveOption(from, to) {
    const key = this._listKey;
    const items = [...(this._config[key] || [])];
    const [m] = items.splice(from, 1);
    items.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commit({ ...this._config, [key]: items });
  }

  _updateOptionForm(index, value) {
    const key = this._listKey;
    const items = [...(this._config[key] || [])];
    // Spread preserves YAML-only keys (split menus, tap_action_map, flex…).
    items[index] = { ...items[index], ...value };
    this._commit({ ...this._config, [key]: items });
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }
}

customElements.define("materia-button-group-editor", MateriaButtonGroupEditor);
