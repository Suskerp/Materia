import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";

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

  _formData() {
    return { variant: "filled", size: "m", shape: "round", ...this._config };
  }

  get _sections() {
    return [
      {
        title: "e_button",
        icon: "mdi:gesture-tap-button",
        fields: [
          { name: "icon", template: true, selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "label", template: true, selector: { text: {} } },
          {
            name: "variant",
            selector: { select: { mode: "dropdown", options: [
              { value: "elevated", label: "e_elevated" },
              { value: "filled", label: "e_filled" },
              { value: "tonal", label: "e_tonal" },
              { value: "outlined", label: "e_outlined" },
              { value: "text", label: "e_text" },
            ] } },
          },
          {
            name: "role",
            label: "e_color_role",
            helper: "e_unset_each_varian",
            selector: { select: { mode: "dropdown", options: [
              { value: "primary", label: "e_primary" },
              { value: "secondary", label: "e_secondary" },
              { value: "tertiary", label: "e_tertiary" },
              { value: "error", label: "gt_state_error" },
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
              { value: "round", label: "e_round_pill" },
              { value: "square", label: "e_square" },
            ] } },
          },
          { name: "wide", selector: { boolean: {} } },
          { name: "entity", selector: { entity: {} } },
          DISABLED_FIELD,
        ],
      },
      {
        title: "e_behavior",
        icon: "mdi:tune",
        fields: [
          { name: "active_state", label: "e_active_state", helper: "e_state_s_consid", selector: { text: {} } },
          { name: "morph_on_active", label: "e_morph_shape_when", selector: { boolean: {} } },
          {
            name: "active_variant",
            label: "e_varian_when_active",
            selector: {
              select: {
                mode: "dropdown",
                options: ["filled", "tonal", "outlined", "elevated", "text"],
              },
            },
          },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", label: "e_defaul_action", selector: { ui_action: {} } },
        ],
      },
    ];
  }

  _renderExtra() {
    const rows = this._actionRows || [];
    return html`
      <div class="section-header">
        <span>${t("e_action_mappings", this.hass)}</span>
        <ha-icon-button @click=${this._addMapping}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${rows.map(
        (row, i) => html`
          <div class="mapping-card">
            <div class="mapping-header">
              <span>${row.state || t("e_mapping_n", this.hass, { n: i + 1 })}</span>
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
                      .schema=${localize(this._mappingSchema, this.hass)}
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
      { name: "state", required: true, helper: "e_use_defaul_for", selector: { text: {} } },
      { name: "tap_action", label: "sched_action", selector: { ui_action: {} } },
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
