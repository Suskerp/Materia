import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { localize, t } from "../../utils/i18n.js";

class MateriaBarsEditor extends SmartEditorBase {
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
      .options-note {
        font-size: 12px;
        opacity: 0.65;
        padding: 0 4px 4px;
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

  /* No booleans and one number on this card, but the rule stands: anything
     with a card-side default is seeded here, or opening and saving the editor
     writes ha-form's idea of empty instead. `max` and `precision` are
     deliberately NOT seeded — both are "unset means derive it", and seeding
     them would turn an automatic scale into a hardcoded one on first save. */
  _formData() {
    return { ...this._config };
  }

  _sectionsSignature() {
    return [
      (this._config?.rows || []).length,
      this._config?.status ? "s" : "",
      this._config?.max != null ? "m" : "",
      this._config?.footnote ? "f" : "",
    ].join("|");
  }

  get _sections() {
    return [
      {
        title: "e_scale",
        icon: "mdi:ruler",
        fields: [
          {
            name: "max",
            label: "e_full_scale_value",
            helper:
              "e_all_bars_share",
            selector: { number: { min: 0, step: "any", mode: "box" } },
          },
          {
            name: "precision",
            label: "e_decima_places_option",
            helper: "e_leave_empty_choose",
            selector: { number: { min: 0, max: 4, step: 1, mode: "box" } },
          },
        ],
      },
      {
        title: "e_words",
        icon: "mdi:text-long",
        fields: [
          {
            name: "eyebrow",
            label: "e_block_label_option",
            helper: "e_sits_top_left",
            template: true,
            selector: { text: {} },
          },
          {
            name: "meta",
            label: "e_freshn_note_option",
            helper:
              "e_top_right_quiete",
            template: true,
            selector: { text: {} },
          },
          {
            name: "status",
            label: "e_status_line",
            helper:
              "e_senten_page_opened",
            template: true,
            selector: { text: {} },
          },
          { name: "status_icon", label: "e_status_icon", template: true, selector: { icon: {} } },
          { name: "status_color", label: "e_status_icon_colour", color: true, template: true, selector: { text: {} } },
          {
            name: "footnote",
            label: "e_footno_option",
            helper: "e_quiete_than_status",
            template: true,
            selector: { text: {} },
          },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "background", label: "e_card_backgr", color: true, selector: { text: {} } },
          { name: "background_on", label: "e_card_text", color: true, selector: { text: {} } },
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

  get _rowSchema() {
    return [
      { name: "entity", label: "e_entity", selector: { entity: {} } },
      {
        name: "attribute",
        label: "e_attrib_option",
        helper: "e_read_attrib_instea",
        selector: { attribute: {} },
        context: { filter_entity: "entity" },
      },
      { name: "label", label: "e_label_option_defaul", template: true, selector: { text: {} } },
      { name: "unit", label: "e_unit_option_defaul", selector: { text: {} } },
      { name: "color", label: "e_bar_colour", color: true, selector: { text: {} } },
    ];
  }

  _rows() {
    return Array.isArray(this._config?.rows) ? this._config.rows : [];
  }

  _commitRows(rows) {
    const next = { ...this._config };
    if (rows.length) next.rows = rows;
    else delete next.rows;
    this._commit(next);
  }

  _addRow() {
    const rows = [...this._rows(), { entity: "" }];
    this._expanded = rows.length - 1;
    this._commitRows(rows);
  }

  _removeRow(index) {
    const rows = [...this._rows()];
    rows.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._commitRows(rows);
  }

  _moveRow(from, to) {
    const rows = [...this._rows()];
    const [m] = rows.splice(from, 1);
    rows.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commitRows(rows);
  }

  _updateRow(index, value) {
    const rows = [...this._rows()];
    // Spread preserves keys the form does not manage.
    rows[index] = { ...rows[index], ...value };
    this._commitRows(rows);
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }

  _rowTitle(row, i) {
    if (row.label && !String(row.label).includes("{{")) return row.label;
    const st = row.entity ? this.hass?.states[row.entity] : null;
    return st?.attributes?.friendly_name || row.entity || t("e_row_n", this.hass, { n: i + 1 });
  }

  _renderExtra() {
    const rows = this._rows();
    return html`
      <div class="options-header">
        <span>${t("e_bars", this.hass)}</span>
        <ha-icon-button @click=${this._addRow}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>
      <div class="options-note">
        Rows are drawn in this order, top to bottom — the card does not reorder
        them, so put the one that answers the question first. A row whose value
        is missing draws as unknown rather than as zero.
      </div>

      ${sortableList(
        (from, to) => this._moveRow(from, to),
        rows.map(
          (row, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${this._rowTitle(row, i)}</span>
                <ha-icon-button @click=${() => this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeRow(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded === i
                ? html`
                    <div class="option-body">
                      <ha-form
                        .hass=${this.hass}
                        .data=${row}
                        .schema=${localize(this._rowSchema, this.hass)}
                        .computeLabel=${computeLabel}
                        @value-changed=${(e) => this._updateRow(i, e.detail.value)}
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
}

customElements.define("materia-bars-editor", MateriaBarsEditor);
