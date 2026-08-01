import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
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
    return { group: "connected", size: "m", variant: "tonal", ...this._config };
  }

  _sectionsSignature() {
    return `${this._config?.group || ""}|${this._config?.preset || ""}|${this._config?.multi_select ? 1 : 0}`;
  }

  get _sections() {
    const standard = this._config?.group === "standard";
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
        { name: "group", label: "Configuration", selector: { select: { mode: "dropdown", options: [
          { value: "connected", label: "Connected (segmented, entity-driven)" },
          { value: "standard", label: "Standard (spaced row of buttons)" },
        ] } } },
        ...(standard ? [] : [
          { name: "entity", selector: { entity: {} } },
          { name: "attribute", selector: { text: {} } },
          { name: "preset", label: "Color preset", selector: { select: { mode: "dropdown", options: presetOptions } } },
        ]),
        { name: "size", label: "Size (applies to the whole group)", selector: { select: { mode: "dropdown", options: [
          { value: "xs", label: "XS (32dp)" },
          { value: "s", label: "S (40dp)" },
          { value: "m", label: "M (56dp)" },
          { value: "l", label: "L (96dp)" },
          { value: "xl", label: "XL (136dp)" },
        ] } } },
        { name: "variant", label: "Style", selector: { select: { mode: "dropdown", options: [
          { value: "filled", label: "Filled" },
          { value: "tonal", label: "Tonal" },
        ] } } },
        ...(standard ? [
        ] : []),
        ...(standard ? [] : [{ name: "multi_select", label: "Multi-select", selector: { boolean: {} } }]),
        ...(!standard && this._config?.multi_select
          ? [{ name: "columns", label: "Max columns", selector: { number: { min: 1, max: 8, mode: "box" } } }]
          : []),
      ],
    };

    const sections = [setup];

    sections.push({
      title: "Disabled",
      icon: "mdi:cancel",
      expanded: false,
      fields: [DISABLED_FIELD],
    });

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
      { name: "entity", label: "Entity (optional — this button's own state)", selector: { entity: {} } },
      { name: "value", label: "Value (state that = active; blank = on/truthy)", selector: { text: {} } },
      { name: "active", label: "Active template (overrides everything, e.g. attribute logic)", template: true, selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: { default_action: "call-service" } } },
    ];
  }

  /* A standard group's buttons are full materia-buttons, so the form edits
     the button contract, not the option contract. Split buttons keep their
     menu/`tap_action_map` keys via the spread; the header marks them. */
  get _buttonSchema() {
    return [
      { name: "label", template: true, selector: { text: {} } },
      { name: "icon", template: true, selector: { icon: {} } },
      { name: "entity", label: "Entity (optional — drives active state)", selector: { entity: {} } },
      {
        name: "variant",
        selector: { select: { mode: "dropdown", options: [
          { value: "filled", label: "Filled" },
          { value: "tonal", label: "Tonal" },
        ] } },
      },
      { name: "wide", label: "Wide (stretch to share the row)", selector: { boolean: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: { default_action: "call-service" } } },
    ];
  }

  /** Which list this group actually reads: standard renders `buttons`,
   *  connected renders `options`. Editing the other one edits dead config. */
  get _listKey() {
    return this._config?.group === "standard" ? "buttons" : "options";
  }

  _renderExtra() {
    const key = this._listKey;
    const standard = key === "buttons";
    const items = this._config[key] || [];
    const schema = standard ? this._buttonSchema : this._optionSchema;
    return html`
      <div class="options-header">
        <span>${standard ? "Buttons" : "Options"}</span>
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
                <span>${opt.label || opt.value || `${standard ? "Button" : "Option"} ${i + 1}`}</span>
                ${opt.type === "split" || opt.options
                  ? html`<span class="glyph-note">split · menu in YAML</span>`
                  : ""}
                ${opt.tap_action_map
                  ? html`<span class="glyph-note">state-mapped action (YAML)</span>`
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
                        .schema=${schema}
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
