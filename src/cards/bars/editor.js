import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

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
        title: "Scale",
        icon: "mdi:ruler",
        fields: [
          {
            name: "max",
            label: "Full-scale value (optional)",
            helper:
              "All bars share one scale, or they cannot be compared. Set this when the domain has a real ceiling — an inverter's kW rating, say — so the bars stop rescaling every time the largest reading moves. Leave empty to scale to the largest current value.",
            selector: { number: { min: 0, step: "any", mode: "box" } },
          },
          {
            name: "precision",
            label: "Decimal places (optional)",
            helper: "Leave empty to choose per value: whole numbers above 100, one decimal below.",
            selector: { number: { min: 0, max: 4, step: 1, mode: "box" } },
          },
        ],
      },
      {
        title: "Words",
        icon: "mdi:text-long",
        fields: [
          {
            name: "eyebrow",
            label: "Block label (optional)",
            helper: "Sits top-left, uppercased — what this block is. Rendered as a quiet eyebrow, not a headline.",
            template: true,
            selector: { text: {} },
          },
          {
            name: "meta",
            label: "Freshness note (optional)",
            helper:
              'Top-right, quieter still — how current the readings are ("bijgewerkt 1 min"). Templatable, so it can be a relative time.',
            template: true,
            selector: { text: {} },
          },
          {
            name: "status",
            label: "Status line",
            helper:
              "The sentence the page is opened to read. Templatable, so the install supplies its own wording in its own language — this card ships no prose.",
            template: true,
            selector: { text: {} },
          },
          { name: "status_icon", label: "Status icon", template: true, selector: { icon: {} } },
          { name: "status_color", label: "Status icon colour", color: true, template: true, selector: { text: {} } },
          {
            name: "footnote",
            label: "Footnote (optional)",
            helper: "Quieter than the status it qualifies — a confidence note, a caveat, when the reading was taken.",
            template: true,
            selector: { text: {} },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "background", label: "Card background", color: true, selector: { text: {} } },
          { name: "background_on", label: "Card text", color: true, selector: { text: {} } },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }

  get _rowSchema() {
    return [
      { name: "entity", label: "Entity", selector: { entity: {} } },
      {
        name: "attribute",
        label: "Attribute (optional)",
        helper: "Read an attribute instead of the state — for a sensor that carries several numbers at once.",
        selector: { attribute: {} },
        context: { filter_entity: "entity" },
      },
      { name: "label", label: "Label (optional — defaults to the entity name)", template: true, selector: { text: {} } },
      { name: "unit", label: "Unit (optional — defaults to the entity's own)", selector: { text: {} } },
      { name: "color", label: "Bar colour", color: true, selector: { text: {} } },
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
    return st?.attributes?.friendly_name || row.entity || `Row ${i + 1}`;
  }

  _renderExtra() {
    const rows = this._rows();
    return html`
      <div class="options-header">
        <span>Bars</span>
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
                        .schema=${this._rowSchema}
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
