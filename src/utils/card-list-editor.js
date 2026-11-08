import { LitElement, html, css, nothing } from "lit";
import { sortableList } from "./editor-helpers.js";
import { loadCardHelpers } from "../styles/shared.js";
import { t, tr } from "./i18n.js";

/**
 * Editor controls for nested cards, in HA's own UI: hui-card-picker to add,
 * hui-card-element-editor to edit. Both live in a lazy frontend chunk;
 * asking a vertical stack for its config element imports it.
 *
 *   <materia-card-list-editor .hass .cards label hint add-button>
 *       a sortable list (add, edit, reorder, delete); value-changed { value: cards[] }
 *   <materia-card-slot-editor .hass .card label>
 *       one card (pick, edit, clear); value-changed { value: card | undefined }
 */

let huiLoad = null;

/** Resolves once hui-card-picker and hui-card-element-editor are defined. */
export function ensureHuiEditors() {
  if (customElements.get("hui-card-element-editor") && customElements.get("hui-card-picker")) return Promise.resolve();
  huiLoad ??= (async () => {
    const helpers = await loadCardHelpers();
    const stack = await helpers.createCardElement({ type: "vertical-stack", cards: [] });
    await stack.constructor.getConfigElement();
  })().catch(() => {
    huiLoad = null;
  });
  return huiLoad;
}

const fire = (el, value) =>
  el.dispatchEvent(new CustomEvent("value-changed", { detail: { value }, bubbles: true, composed: true }));

/** The nested HA editors' own value-changed events must not leave this
 *  element: only the list / slot value does (fired from the host). */
const stop = (e) => e.stopPropagation();

const cardType = (c) => c?.type || "card";

const styles = css`
  :host {
    display: block;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
  }
  .hint,
  .loading {
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
  .drag-handle {
    cursor: grab;
    opacity: 0.5;
    --mdc-icon-size: 20px;
    flex-shrink: 0;
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
  .slot-body {
    margin-top: 8px;
  }
`;

class HuiHost extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    label: { type: String },
    _ready: { state: true },
  };

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    if (!this._ready) ensureHuiEditors().then(() => (this._ready = !!customElements.get("hui-card-picker")));
  }

  _picker(onPick) {
    if (!this._ready) return html`<div class="loading">${t("ed_loading_picker", this.hass)}</div>`;
    return html`<div @value-changed=${stop}><hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      @config-changed=${(e) => {
        e.stopPropagation();
        onPick(e.detail.config);
      }}
    ></hui-card-picker></div>`;
  }

  _editor(cfg, onChange) {
    if (!this._ready) return html`<div class="loading">${t("ed_loading_editor", this.hass)}</div>`;
    return html`<div @value-changed=${stop}><hui-card-element-editor
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .value=${cfg}
      @config-changed=${(e) => {
        e.stopPropagation();
        onChange(e.detail.config);
      }}
    ></hui-card-element-editor></div>`;
  }

  _iconButton(icon, label, onClick) {
    return html`<ha-icon-button .label=${label} @click=${onClick}><ha-icon icon=${icon}></ha-icon></ha-icon-button>`;
  }
}

class MateriaCardListEditor extends HuiHost {
  static properties = {
    cards: { attribute: false },
    hint: { type: String },
    /** Show the picker only after a + tap (for lists that sit beside others). */
    addButton: { type: Boolean, attribute: "add-button" },
    _editing: { state: true },
    _adding: { state: true },
  };

  get _cards() {
    return Array.isArray(this.cards) ? this.cards : [];
  }

  _write(cards) {
    this.cards = cards;
    fire(this, cards);
  }

  _move(from, to) {
    const cards = [...this._cards];
    const [m] = cards.splice(from, 1);
    cards.splice(to, 0, m);
    if (this._editing === from) this._editing = to;
    this._write(cards);
  }

  _remove(i) {
    const cards = [...this._cards];
    cards.splice(i, 1);
    if (this._editing === i) this._editing = null;
    this._write(cards);
  }

  _update(i, card) {
    const cards = [...this._cards];
    cards[i] = card;
    this._write(cards);
  }

  render() {
    const cards = this._cards;
    const i = this._editing;
    if (i != null && cards[i]) {
      return html`
        <div class="edit-head">
          ${this._iconButton("mdi:arrow-left", t("ed_back", this.hass), () => (this._editing = null))}
          <span>${t("ed_card_n", this.hass, { n: i + 1, type: cardType(cards[i]) })}</span>
        </div>
        ${this._editor(cards[i], (c) => this._update(i, c))}
      `;
    }
    const picking = !this.addButton || this._adding;
    return html`
      <div class="head">
        <span>${tr(this.label, this.hass) ?? ""}</span>
        ${this.addButton
          ? this._iconButton(this._adding ? "mdi:close" : "mdi:plus", t("ed_add_card", this.hass), () => (this._adding = !this._adding))
          : nothing}
      </div>
      ${this.hint ? html`<div class="hint">${tr(this.hint, this.hass)}</div>` : nothing}
      ${sortableList(
        (from, to) => this._move(from, to),
        cards.map(
          (c, j) => html`<div class="card-row">
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
            <span>${cardType(c)}</span>
            ${this._iconButton("mdi:pencil", t("ed_edit_card", this.hass), () => (this._editing = j))}
            ${this._iconButton("mdi:delete", t("ed_remove_card", this.hass), () => this._remove(j))}
          </div>`
        )
      )}
      ${picking
        ? this._picker((c) => {
            this._adding = false;
            this._write([...this._cards, c]);
          })
        : nothing}
    `;
  }
}

class MateriaCardSlotEditor extends HuiHost {
  static properties = {
    card: { attribute: false },
    _open: { state: true },
  };

  _write(card) {
    this.card = card;
    fire(this, card);
  }

  render() {
    const card = this.card && typeof this.card === "object" ? this.card : null;
    return html`
      <div class="head"><span>${tr(this.label, this.hass) ?? t("ed_card", this.hass)}</span></div>
      ${card
        ? html`<div class="card-row">
              <span>${cardType(card)}</span>
              ${this._iconButton(this._open ? "mdi:chevron-up" : "mdi:pencil", t("ed_edit_card", this.hass), () => (this._open = !this._open))}
              ${this._iconButton("mdi:delete", t("ed_remove_card", this.hass), () => {
                this._open = false;
                this._write(undefined);
              })}
            </div>
            ${this._open ? html`<div class="slot-body">${this._editor(card, (c) => this._write(c))}</div>` : nothing}`
        : this._picker((c) => {
            this._open = true;
            this._write(c);
          })}
    `;
  }
}

customElements.define("materia-card-list-editor", MateriaCardListEditor);
customElements.define("materia-card-slot-editor", MateriaCardSlotEditor);
