import { LitElement, html, css, nothing } from "lit";
import { t } from "./i18n.js";
import { panelList, panelView, patchPanel, renamePanel, addPanel, removePanel, setPanel } from "./panels-model.js";
import "./card-list-editor.js";

/**
 * <materia-panels-editor .hass .panels> — a panel host's `panels:` registry
 * as a list: add, remove and rename a panel id; per panel its heading, the
 * head row toggle and two card lists (actions, content).
 * Fires value-changed { value: panels object | undefined }.
 */

const TEXT = { text: {} };
const BOOL = { boolean: {} };

class MateriaPanelsEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    panels: { attribute: false },
    _open: { state: true },
    _badId: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .panel {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      margin-top: 8px;
      overflow: hidden;
    }
    .panel-head {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 4px 4px 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    }
    .panel-head span {
      flex: 1;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
    }
    ha-textfield,
    ha-selector {
      display: block;
      width: 100%;
    }
  `;

  _emit(panels) {
    this.panels = panels;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: panels }, bubbles: true, composed: true }));
  }

  _patch(id, entry, patch) {
    this._emit(setPanel(this.panels, id, patchPanel(entry, patch)));
  }

  _rename(id, ev) {
    const field = ev.target;
    const next = renamePanel(this.panels, id, field.value);
    if (!next) {
      this._badId = id;
      field.value = id;
      return;
    }
    this._badId = null;
    if (next === this.panels) return;
    if (this._open === id) this._open = Object.keys(next).find((k) => !(k in (this.panels ?? {})));
    this._emit(next);
  }

  _add() {
    const { id, panels } = addPanel(this.panels);
    this._open = id;
    this._emit(panels);
  }

  _iconButton(icon, label, onClick) {
    return html`<ha-icon-button .label=${label} @click=${onClick}><ha-icon icon=${icon}></ha-icon></ha-icon-button>`;
  }

  /** value-changed from a child control → patch; stops it from reaching the card editor. */
  _on(id, entry, key, map = (v) => v) {
    return (e) => {
      e.stopPropagation();
      this._patch(id, entry, { [key]: map(e.detail.value) });
    };
  }

  _renderPanel({ id, entry }) {
    const h = this.hass;
    const v = panelView(entry);
    const open = this._open === id;
    return html`<div class="panel">
      <div class="panel-head">
        <span>${v.heading ? `${id} · ${v.heading}` : id}</span>
        ${this._iconButton(open ? "mdi:chevron-up" : "mdi:chevron-down", id, () => (this._open = open ? null : id))}
        ${this._iconButton("mdi:delete", t("ed_remove_panel", h), () => this._emit(removePanel(this.panels, id)))}
      </div>
      ${open
        ? html`<div class="body">
            <ha-textfield
              .label=${t("ed_panel_id", h)}
              .value=${id}
              .invalid=${this._badId === id}
              .errorMessage=${t("ed_panel_id_taken", h)}
              @change=${(e) => this._rename(id, e)}
            ></ha-textfield>
            <ha-selector
              .hass=${h}
              .selector=${TEXT}
              .label=${t("ed_panel_heading", h)}
              .value=${v.heading}
              @value-changed=${this._on(id, entry, "heading")}
            ></ha-selector>
            <ha-selector
              .hass=${h}
              .selector=${BOOL}
              .label=${t("ed_panel_head", h)}
              .value=${v.head}
              @value-changed=${this._on(id, entry, "head", (x) => x !== false)}
            ></ha-selector>
            ${v.head
              ? html`<materia-card-list-editor
                  add-button
                  .hass=${h}
                  .lovelace=${this.lovelace}
                  .label=${t("ed_panel_actions", h)}
                  .cards=${v.actions}
                  @value-changed=${this._on(id, entry, "actions")}
                ></materia-card-list-editor>`
              : nothing}
            <materia-card-list-editor
              add-button
              .hass=${h}
              .lovelace=${this.lovelace}
              .label=${t("ed_panel_cards", h)}
              .cards=${v.cards}
              @value-changed=${this._on(id, entry, "cards")}
            ></materia-card-list-editor>
          </div>`
        : nothing}
    </div>`;
  }

  render() {
    if (!this.hass) return nothing;
    return html`
      <div class="head">
        <span>${t("ed_panels", this.hass)}</span>
        ${this._iconButton("mdi:plus", t("ed_add_panel", this.hass), () => this._add())}
      </div>
      ${panelList(this.panels).map((p) => this._renderPanel(p))}
    `;
  }
}

customElements.define("materia-panels-editor", MateriaPanelsEditor);
