import { html, css } from "lit";
import { sortableList } from "../../utils/editor-helpers.js";
import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { t, tr } from "../../utils/i18n.js";

export class MateriaExpanderEditor extends SmartEditorBase {
  static properties = {
    _editingCard: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .cards-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        font-weight: 600;
        font-size: 14px;
      }
      .cards-hint {
        font-size: 12px;
        opacity: 0.6;
        margin-bottom: 4px;
      }
      .card-row {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 2px 4px 2px 12px;
        margin-top: 6px;
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
        margin-top: 8px;
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

  /** Every boolean the card defaults to TRUE has to be seeded, or an absent
   *  key arrives undefined, ha-form draws the switch off, and merely opening
   *  and saving the editor would silently write show_switch: false. */
  _formData() {
    return { expanded: false, show_switch: true, flat: false, ...this._config };
  }

  /** The name field is only required while there is no entity to borrow a
   *  friendly name from — which makes the schema config-dependent. */
  _sectionsSignature() {
    return this._config?.entity ? "entity" : "no-entity";
  }

  get _sections() {
    const hasEntity = !!this._config?.entity;
    return [
      {
        title: "e_content",
        icon: "mdi:card-text-outline",
        fields: [
          {
            name: "entity",
            label: "e_entity_option",
            helper: "e_with_entity_header",
            selector: { entity: {} },
          },
          {
            name: "name",
            label: hasEntity ? "e_name_tpl_default" : "e_name_tpl",
            required: !hasEntity,
            // The other half of the same inconsistency: the card resolved
            // secondary and not name, and the editor offered template mode for
            // secondary and not name. Both now match.
            template: true,
            selector: { text: {} },
          },
          { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
          { name: "secondary", label: "e_second_text_templa", template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_behaviour",
        icon: "mdi:arrow-expand-vertical",
        fields: [
          { name: "expanded", label: "e_open_by_defaul", selector: { boolean: {} } },
          {
            name: "show_switch",
            label: "e_show_switch_in",
            helper: "e_only_applie_when",
            selector: { boolean: {} },
          },
          { name: "flat", label: "e_flat_no_card", selector: { boolean: {} } },
        ],
      },
      {
        title: "e_appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "color", label: "e_row_color_escala", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "e_text_icon_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color", label: "e_switch_track_color", color: true, template: true, selector: { text: {} } },
          { name: "switch_color_on", label: "e_switch_thumb_color", color: true, template: true, selector: { text: {} } },
        ],
      },
      {
        title: "e_actions",
        icon: "mdi:gesture-tap",
        fields: [
          {
            name: "tap_action",
            label: "e_switch_action_overri",
            selector: { ui_action: { default_action: "toggle" } },
          },
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

  _cards() {
    return Array.isArray(this._config?.cards) ? this._config.cards : [];
  }

  /** Heading and hint above the card list; container editors that reuse this list override them. */
  get _cardsTitle() {
    return "e_behind_chevron";
  }

  get _cardsHint() {
    return "e_behind_chevron_hint";
  }

  _renderExtra() {
    if (this._editingCard != null) return this._renderCardEditor();
    const cards = this._cards();
    return html`
      <div class="cards-header"><span>${tr(this._cardsTitle, this.hass)}</span></div>
      <div class="cards-hint">${tr(this._cardsHint, this.hass)}</div>

      ${sortableList(
        (from, to) => this._moveCard(from, to),
        cards.map(
          (c, i) => html`
            <div class="card-row">
              <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
              <span>${c?.type || "card"}</span>
              <ha-icon-button @click=${() => (this._editingCard = i)}>
                <ha-icon icon="mdi:pencil"></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${() => this._removeCard(i)}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
          `
        )
      )}

      ${customElements.get("hui-card-picker")
        ? html`
            <hui-card-picker
              .hass=${this.hass}
              @config-changed=${(e) => {
                e.stopPropagation();
                this._addCard(e.detail.config);
              }}
            ></hui-card-picker>
          `
        : html`<div style="font-size:12px;opacity:.6;">${t("e_loading_picker", this.hass)}</div>`}
    `;
  }

  _renderCardEditor() {
    const i = this._editingCard;
    const cfg = this._cards()[i];
    if (!cfg) {
      this._editingCard = null;
      return html``;
    }
    return html`
      <div class="edit-head">
        <ha-icon-button @click=${() => (this._editingCard = null)}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </ha-icon-button>
        <span>${t("e_card_n", this.hass, { n: i + 1 })} · ${cfg.type || "card"}</span>
      </div>
      ${customElements.get("hui-card-element-editor")
        ? html`
            <hui-card-element-editor
              .hass=${this.hass}
              .value=${cfg}
              @config-changed=${(e) => {
                e.stopPropagation();
                this._updateCard(i, e.detail.config);
              }}
            ></hui-card-element-editor>
          `
        : html`<div style="font-size:12px;opacity:.6;">${t("e_loading_editor", this.hass)}</div>`}
    `;
  }

  _writeCards(cards) {
    this._commit({ ...this._config, cards });
  }

  _addCard(cardConfig) {
    this._writeCards([...this._cards(), cardConfig]);
  }

  _removeCard(i) {
    const cards = [...this._cards()];
    cards.splice(i, 1);
    if (this._editingCard === i) this._editingCard = null;
    this._writeCards(cards);
  }

  _updateCard(i, cardConfig) {
    const cards = [...this._cards()];
    cards[i] = cardConfig;
    this._writeCards(cards);
  }

  _moveCard(from, to) {
    const cards = [...this._cards()];
    const [m] = cards.splice(from, 1);
    cards.splice(to, 0, m);
    if (this._editingCard === from) this._editingCard = to;
    this._writeCards(cards);
  }
}

customElements.define("materia-expander-editor", MateriaExpanderEditor);
