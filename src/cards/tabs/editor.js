import { html, css } from "lit";
import { computeLabel, sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { loadCardHelpers } from "../../styles/shared.js";

class MateriaTabsEditor extends SmartEditorBase {
  static properties = {
    _expanded: { state: true },
    _editingCard: { state: true },
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
      .cards-head {
        font-size: 13px;
        font-weight: 600;
        margin-top: 4px;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px 2px 12px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
      }
      .card-row span {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      hui-card-picker {
        display: block;
      }
      .edit-head {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._expanded ??= null;
    this._editingCard ??= null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadHuiElements();
  }

  /** hui-card-picker / hui-card-element-editor are lazy-loaded by HA;
   *  requesting a stack card's config element pulls them in. */
  async _loadHuiElements() {
    if (customElements.get("hui-card-element-editor") && customElements.get("hui-card-picker")) return;
    const helpers = await loadCardHelpers();
    const stack = await helpers.createCardElement({ type: "vertical-stack", cards: [] });
    await stack.constructor.getConfigElement();
    this.requestUpdate();
  }

  _formData() {
    return { vertical: true, ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Tabs",
        icon: "mdi:tab",
        fields: [
          {
            name: "entity",
            label: "Entity holding the selected tab (optional)",
            helper: "Leave empty for per-device tabs (each screen keeps its own). Set an input_select only when the selection must be shared or drive conditional cards elsewhere.",
            selector: { entity: { domain: ["input_select", "select", "input_text"] } },
          },
          { name: "attribute", label: "Attribute (instead of the state)", selector: { text: {} } },
          { name: "vertical", label: "Vertical rail (off = horizontal tab bar)", selector: { boolean: {} } },
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

  get _itemSchema() {
    return [
      { name: "label", selector: { text: {} } },
      { name: "value", label: "Value (the entity state this tab means)", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      { name: "tap_action", label: "Action (overrides selecting the tab)", selector: { ui_action: { default_action: "none" } } },
    ];
  }

  _itemCards(item) {
    if (Array.isArray(item?.cards)) return item.cards;
    return item?.card ? [item.card] : [];
  }

  _renderExtra() {
    if (this._editingCard) return this._renderCardEditor();
    const items = this._config.items || [];
    return html`
      <div class="options-header">
        <span>Tabs</span>
        <ha-icon-button @click=${this._addItem}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${sortableList(
        (from, to) => this._moveItem(from, to),
        items.map(
          (item, i) => html`
            <div class="option-card">
              <div class="option-header">
                <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
                <span>${item.label || item.value || `Tab ${i + 1}`}</span>
                <ha-icon-button @click=${() => this._toggleExpand(i)}>
                  <ha-icon icon=${this._expanded === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${() => this._removeItem(i)}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._expanded === i ? this._renderItemBody(item, i) : ""}
            </div>
          `
        )
      )}
    `;
  }

  _renderItemBody(item, i) {
    const cards = this._itemCards(item);
    return html`
      <div class="option-body">
        <ha-form
          .hass=${this.hass}
          .data=${item}
          .schema=${this._itemSchema}
          .computeLabel=${computeLabel}
          @value-changed=${(e) => this._updateItem(i, e.detail.value)}
        ></ha-form>

        <div class="cards-head">This tab's cards</div>
        ${cards.map(
          (c, j) => html`
            <div class="card-row">
              <span>${c?.type || "card"}</span>
              <ha-icon-button @click=${() => (this._editingCard = { item: i, card: j })}>
                <ha-icon icon="mdi:pencil"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeCard(i, j)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
          `
        )}
        ${customElements.get("hui-card-picker")
          ? html`
              <hui-card-picker
                .hass=${this.hass}
                @config-changed=${(e) => {
                  e.stopPropagation();
                  this._addCard(i, e.detail.config);
                }}
              ></hui-card-picker>
            `
          : html`<div style="font-size:12px;opacity:.6;">Loading card picker…</div>`}
      </div>
    `;
  }

  _renderCardEditor() {
    const { item, card } = this._editingCard;
    const cfg = this._itemCards(this._config.items?.[item])[card];
    if (!cfg) {
      this._editingCard = null;
      return html``;
    }
    return html`
      <div class="edit-head">
        <ha-icon-button @click=${() => (this._editingCard = null)}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </ha-icon-button>
        <span>${this._config.items[item]?.label || `Tab ${item + 1}`} · card ${card + 1}</span>
      </div>
      ${customElements.get("hui-card-element-editor")
        ? html`
            <hui-card-element-editor
              .hass=${this.hass}
              .value=${cfg}
              @config-changed=${(e) => {
                e.stopPropagation();
                this._updateCard(item, card, e.detail.config);
              }}
            ></hui-card-element-editor>
          `
        : html`<div style="font-size:12px;opacity:.6;">Loading card editor…</div>`}
    `;
  }

  /** All card writes normalize onto `cards` (dropping one-card `card`
   *  sugar), so the editor and the card read the same key. */
  _writeCards(i, cards) {
    const items = [...(this._config.items || [])];
    const item = { ...items[i], cards };
    delete item.card;
    items[i] = item;
    this._commit({ ...this._config, items });
  }

  _addCard(i, cardConfig) {
    this._writeCards(i, [...this._itemCards(this._config.items?.[i]), cardConfig]);
  }

  _removeCard(i, j) {
    const cards = [...this._itemCards(this._config.items?.[i])];
    cards.splice(j, 1);
    if (this._editingCard?.item === i && this._editingCard?.card === j) this._editingCard = null;
    this._writeCards(i, cards);
  }

  _updateCard(i, j, cardConfig) {
    const cards = [...this._itemCards(this._config.items?.[i])];
    cards[j] = cardConfig;
    this._writeCards(i, cards);
  }

  _addItem() {
    const items = [...(this._config.items || []), { label: "", value: "", icon: "" }];
    this._expanded = items.length - 1;
    this._commit({ ...this._config, items });
  }

  _removeItem(index) {
    const items = [...(this._config.items || [])];
    items.splice(index, 1);
    if (this._expanded === index) this._expanded = null;
    this._editingCard = null;
    this._commit({ ...this._config, items });
  }

  _moveItem(from, to) {
    const items = [...(this._config.items || [])];
    const [m] = items.splice(from, 1);
    items.splice(to, 0, m);
    if (this._expanded === from) this._expanded = to;
    this._commit({ ...this._config, items });
  }

  _updateItem(index, value) {
    const items = [...(this._config.items || [])];
    // Spread preserves keys the form doesn't manage (cards, card).
    items[index] = { ...items[index], ...value };
    this._commit({ ...this._config, items });
  }

  _toggleExpand(i) {
    this._expanded = this._expanded === i ? null : i;
  }
}

customElements.define("materia-tabs-editor", MateriaTabsEditor);
