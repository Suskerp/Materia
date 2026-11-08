import { LitElement, html, css, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { currentStationIndex } from "../../utils/media.js";
import { t } from "../../utils/i18n.js";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";
import "./editor.js";

/**
 * materia-station-grid — radio stations as white square logos; the station
 * that plays now is ringed. Tapping one runs its `tap_action` (or the short
 * form `action: script.x` + `data`), then closes the sheet it lives in.
 * The media header opens it in a sheet (phone) or the kiosk side panel.
 */
class MateriaStationGrid extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
  };

  static styles = [
    hostStyles,
    motionTokens,
    mediaTokens,
    css`
      ha-card {
        border: none;
        border-radius: 28px;
        box-shadow: var(--ha-card-box-shadow, none);
        background: var(--ha-card-background, var(--mx-s1));
        color: var(--mx-on);
        padding: 16px;
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 18px;
      }
      .head h3 {
        flex: 1;
        margin: 0;
        font-size: 22px;
        line-height: 28px;
        font-weight: 400;
      }
      .grid {
        display: grid;
        grid-template-columns: var(--sg-cols, repeat(auto-fill, minmax(96px, 1fr)));
        gap: 14px;
        align-content: start;
      }
      .grid button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-width: 0;
        font-size: 13px;
        color: var(--mx-onv);
      }
      .grid button span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .logo {
        width: 100%;
        aspect-ratio: 1;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 20px;
        background: #fff center / contain no-repeat;
        background-origin: content-box;
        transition: border-radius var(--md-sys-motion-expressive-fast-spatial);
      }
      /* logo_fill: the image fills the tile, no white frame around it. */
      .grid.fill .logo {
        padding: 0;
        background-size: cover;
        background-origin: border-box;
      }
      .grid button.on .logo {
        border-radius: 32px;
        outline: 3px solid var(--mx-p);
        outline-offset: 3px;
      }
      .grid button.on span {
        color: var(--mx-on);
      }
    `,
  ];

  static getConfigElement() {
    return document.createElement("materia-station-grid-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return { entity, stations: [{ name: "Radio 1", image: "", tap_action: { action: "none" } }] };
  }

  setConfig(config) {
    if (!Array.isArray(config.stations)) throw new Error("stations is required");
    this.config = config;
  }

  _actionOf(st) {
    if (st.tap_action) return st.tap_action;
    if (typeof st.action === "string" && st.action.includes(".")) {
      return { action: "perform-action", perform_action: st.action, data: st.data ?? {} };
    }
    return null;
  }

  _pick(st) {
    const action = this._actionOf(st);
    if (action) this._handleAction(action);
    // The choice is made: a panel or sheet showing this grid closes
    // (close_on_select: false keeps it open).
    if (this.config.close_on_select !== false) {
      this.dispatchEvent(new CustomEvent("materia-dismiss", { bubbles: true, composed: true }));
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const c = this.config;
    const stations = c.stations;
    const current = currentStationIndex(stations, c.entity ? this.hass.states[c.entity] : null);
    const cols = c.columns;
    return html`
      <ha-card>
        ${c.name ? html`<div class="head"><h3>${c.name}</h3></div>` : nothing}
        <div class="grid ${c.logo_fill ? "fill" : ""}" style=${cols ? `--sg-cols:repeat(${Number(cols)}, minmax(0, 1fr));` : ""}>
          ${stations.map(
            (st, i) => html`<button class=${i === current ? "on" : ""} aria-pressed=${i === current ? "true" : "false"} @click=${() => this._pick(st)}>
              <div class="logo" style=${st.image ? `background-image:url('${st.image}')` : ""}></div>
              <span>${st.name ?? ""}</span>
            </button>`
          )}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return Math.ceil((this.config?.stations?.length ?? 3) / 3) * 2;
  }
}

customElements.define("materia-station-grid", MateriaStationGrid);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-station-grid",
  name: "Materia Station Grid",
  description: "Radio stations as white square logos; the current one is ringed. Each runs its action.",
  preview: true,
});
