import { LitElement, html } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Simple entity list: an optional header (icon + title) and one row per
 * entity — name left, state right. States render via hass.formatEntityState
 * so they're localized and honor display precision. Replaces the
 * button-card/entities-list stacks used for sensor readouts.
 */
class MateriaList extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-list-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("sensor.")) || "";
    return { entities: entity ? [entity] : [] };
  }

  setConfig(config) {
    if (!config.entities?.length) throw new Error("Materia List: add at least one entity");
    this.config = { ...config };
  }

  _rowState(cfg, stateObj) {
    if (!stateObj) return "—";
    if (cfg.attribute) {
      const v = stateObj.attributes?.[cfg.attribute];
      return v == null ? "—" : `${v}${cfg.unit ? ` ${cfg.unit}` : ""}`;
    }
    if (this._isUnavailable(stateObj)) {
      return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
    }
    if (cfg.unit) {
      const n = Number(stateObj.state);
      return Number.isFinite(n) ? `${n} ${cfg.unit}` : stateObj.state;
    }
    return this.hass.formatEntityState?.(stateObj) ?? stateObj.state;
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const rows = (this.config.entities || []).map((e) => (typeof e === "string" ? { entity: e } : e));

    return html`
      <ha-card>
        ${this.config.title
          ? html`<div class="header">
              ${this.config.icon ? html`<ha-icon icon=${this.config.icon}></ha-icon>` : ""}
              <span>${this.config.title}</span>
            </div>`
          : ""}
        <div class="rows">
          ${rows.map((r) => {
            const stateObj = this.hass.states[r.entity];
            const name = r.name || stateObj?.attributes?.friendly_name || r.entity;
            return html`
              <div
                class="row ${stateObj && this._isUnavailable(stateObj) ? "unavailable" : ""}"
                @click=${() => this._handleAction(r.tap_action || { action: "more-info", entity: r.entity })}
              >
                ${r.icon ? html`<ha-icon class="row-icon" icon=${r.icon}></ha-icon>` : ""}
                <span class="name">${name}</span>
                <span class="state">${this._rowState(r, stateObj)}</span>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 1 + (this.config?.entities?.length || 0);
  }
}

customElements.define("materia-list", MateriaList);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-list",
  name: "Materia List",
  description: "Entity rows with localized states — name left, value right, optional header.",
  preview: true,
});
