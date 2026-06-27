import { html, css } from "lit";
import { computeLabel } from "../../utils/editor-helpers.js";
import { SmartEditorBase, isTemplate } from "../../utils/smart-editor.js";
import { applyCardFormDefaults } from "../card/editor.js";

class MateriaRoomEditor extends SmartEditorBase {
  static properties = {
    _selectedCard: { state: true },
    _expandedButton: { state: true },
  };

  static styles = [
    SmartEditorBase.styles,
    css`
      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 16px 0 4px;
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
      .toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        overflow-x: auto;
      }
      .tabs {
        display: flex;
        gap: 4px;
        flex: 1;
        overflow-x: auto;
      }
      .tab {
        padding: 6px 14px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 999px;
        font-size: 13px;
        cursor: pointer;
        background: var(--secondary-background-color, transparent);
        color: var(--primary-text-color);
        flex-shrink: 0;
      }
      .tab.selected {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .card-actions {
        display: flex;
        gap: 4px;
        margin-top: 8px;
        justify-content: flex-end;
      }
      #editor {
        margin-top: 12px;
      }
    `,
  ];

  setConfig(config) {
    super.setConfig(config);
    this._selectedCard = -1;
    this._expandedButton = null;
  }

  _formData() {
    return { columns: 2, ...applyCardFormDefaults(this._config) };
  }

  _sectionsSignature() {
    return this._config?.entity?.split(".")[0] || "";
  }

  get _sections() {
    const domain = this._config?.entity?.split(".")[0];
    const isCover = domain === "cover";
    const isLight = domain === "light";
    const hasSlider = isLight || isCover;

    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "entity", required: true, selector: { entity: {} } },
          { name: "name", template: true, selector: { text: {} } },
          { name: "subtitle", template: true, selector: { text: {} } },
          {
            name: "icon",
            template: true,
            selector: { icon: {} },
            context: { icon_entity: "entity" },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "columns", selector: { number: { min: 1, max: 6, mode: "slider" } } },
          { name: "color", label: "Active background", color: true, template: true, selector: { text: {} } },
          { name: "color_on", label: "Active text / icon", color: true, template: true, selector: { text: {} } },
          { name: "show_state", selector: { boolean: {} } },
          { name: "show_last_changed", label: "Show last changed", selector: { boolean: {} } },
          { name: "subtitle_inline", label: "Subtitle inline with state", selector: { boolean: {} } },
          ...(hasSlider ? [{ name: "show_slider", selector: { boolean: {} } }] : []),
          ...(isLight ? [{ name: "slider_turn_off", label: "Slider can turn off", selector: { boolean: {} } }] : []),
          { name: "show_sub_buttons", selector: { boolean: {} } },
          ...(isCover ? [{ name: "show_stop", label: "Show stop", selector: { boolean: {} } }] : []),
        ],
      },
      {
        title: "Actions",
        icon: "mdi:gesture-tap",
        fields: [
          { name: "tap_action", selector: { ui_action: { default_action: "toggle" } } },
        ],
      },
    ];
  }

  /* ---- Sub-buttons + nested cards ------------------------------- */

  _subButtonSchema(btn) {
    const iconIsTemplate = isTemplate(btn?.icon);
    return [
      iconIsTemplate
        ? { name: "icon", required: true, selector: { template: {} } }
        : { name: "icon", required: true, selector: { icon: {} } },
      { name: "name", label: "Label (optional)", selector: { text: {} } },
      { name: "tap_action", label: "Action", selector: { ui_action: {} } },
    ];
  }

  _renderExtra() {
    const cards = this._config.cards || [];
    const numCards = cards.length;
    const selected = this._selectedCard;
    const showPicker = selected === numCards;
    const showEditor = selected >= 0 && selected < numCards;
    const subButtons = Array.isArray(this._config.sub_buttons) ? this._config.sub_buttons : [];

    return html`
      <div class="section-header">
        <span>Custom sub-buttons (overrides auto)</span>
        <ha-icon-button @click=${this._addSubButton}>
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      ${subButtons.map(
        (btn, i) => html`
          <div class="button-card">
            <div class="button-header" @click=${() => this._toggleSubButton(i)}>
              <span>${btn.name || (btn.icon && !isTemplate(btn.icon) ? btn.icon : `Button ${i + 1}`)}</span>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._toggleSubButton(i); }}>
                <ha-icon icon=${this._expandedButton === i ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
              </ha-icon-button>
              <ha-icon-button @click=${(e) => { e.stopPropagation(); this._removeSubButton(i); }}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </ha-icon-button>
            </div>
            ${this._expandedButton === i
              ? html`
                  <div class="button-body">
                    <ha-form
                      .hass=${this.hass}
                      .data=${btn}
                      .schema=${this._subButtonSchema(btn)}
                      .computeLabel=${computeLabel}
                      @value-changed=${(e) => this._subButtonChanged(i, e.detail.value)}
                    ></ha-form>
                  </div>
                `
              : ""}
          </div>
        `
      )}

      <div class="section-header"><span>Cards</span></div>

      <div class="toolbar">
        <div class="tabs">
          ${cards.map(
            (_c, i) => html`
              <div
                class="tab ${selected === i ? "selected" : ""}"
                @click=${() => (this._selectedCard = i)}
              >${i + 1}</div>
            `
          )}
        </div>
        <ha-icon-button
          class="${showPicker ? "selected" : ""}"
          @click=${() => (this._selectedCard = numCards)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </ha-icon-button>
      </div>

      <div id="editor">
        ${showPicker
          ? html`
              <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._handleCardPicked}
              ></hui-card-picker>
            `
          : showEditor
          ? html`
              <div class="card-actions">
                <ha-icon-button ?disabled=${selected === 0} @click=${() => this._moveCard(-1)}>
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </ha-icon-button>
                <ha-icon-button ?disabled=${selected === numCards - 1} @click=${() => this._moveCard(1)}>
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </ha-icon-button>
                <ha-icon-button @click=${this._removeCard}>
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              <hui-card-element-editor
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                .value=${cards[selected]}
                @config-changed=${this._handleChildChanged}
              ></hui-card-element-editor>
            `
          : ""}
      </div>
    `;
  }

  _toggleSubButton(i) {
    this._expandedButton = this._expandedButton === i ? null : i;
  }

  _addSubButton() {
    const buttons = [...(this._config.sub_buttons || []), { icon: "mdi:star" }];
    this._commit({ ...this._config, sub_buttons: buttons });
    this._expandedButton = buttons.length - 1;
  }

  _removeSubButton(i) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons.splice(i, 1);
    if (this._expandedButton === i) this._expandedButton = null;
    const next = { ...this._config };
    if (buttons.length === 0) delete next.sub_buttons;
    else next.sub_buttons = buttons;
    this._commit(next);
  }

  _subButtonChanged(i, value) {
    const buttons = [...(this._config.sub_buttons || [])];
    buttons[i] = { ...buttons[i], ...value };
    this._commit({ ...this._config, sub_buttons: buttons });
  }

  _handleCardPicked(ev) {
    ev.stopPropagation();
    const cards = [...(this._config.cards || []), ev.detail.config];
    this._selectedCard = cards.length - 1;
    this._commit({ ...this._config, cards });
  }

  _handleChildChanged(ev) {
    ev.stopPropagation();
    if (ev.detail.error) return;
    const cards = [...(this._config.cards || [])];
    cards[this._selectedCard] = ev.detail.config;
    this._commit({ ...this._config, cards });
  }

  _moveCard(delta) {
    const cards = [...(this._config.cards || [])];
    const from = this._selectedCard;
    const to = from + delta;
    if (to < 0 || to >= cards.length) return;
    const [card] = cards.splice(from, 1);
    cards.splice(to, 0, card);
    this._selectedCard = to;
    this._commit({ ...this._config, cards });
  }

  _removeCard() {
    const cards = [...(this._config.cards || [])];
    cards.splice(this._selectedCard, 1);
    this._selectedCard = Math.max(0, Math.min(this._selectedCard, cards.length - 1));
    if (cards.length === 0) this._selectedCard = -1;
    this._commit({ ...this._config, cards });
  }
}

customElements.define("materia-room-editor", MateriaRoomEditor);
