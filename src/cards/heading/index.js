import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Section heading (materia-heading) — the native heading card in the family's
 * own voice. HA's heading renders Roboto at its own scale, which is the one
 * line of foreign typography left on an otherwise Materia page; this is the
 * same slot in the display face the mocks actually draw section titles in.
 *
 * `secondary` is a templatable right-aligned meta line — the mocks use that
 * corner for live summaries ("2 rooms · ~24 min"), which the native card has
 * no slot for.
 */
class MateriaHeading extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _resolvedSecondary: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-heading-editor");
  }

  static getStubConfig() {
    return { heading: "Section" };
  }

  setConfig(config) {
    this.config = { ...config };
  }

  updated(changed) {
    if (changed.has("hass") && this.hass) {
      this._resolveField("secondary", "_resolvedSecondary");
    }
  }

  get _secondary() {
    const raw = this.config.secondary;
    if (raw == null) return null;
    const v = this._isTemplate(raw) ? this._resolvedSecondary : raw;
    const t = v == null ? "" : String(v).trim();
    return t.length ? t : null;
  }

  render() {
    if (!this.config) return html``;
    const sub = this.config.heading_style === "subtitle";
    const secondary = this._secondary;
    const tappable = !!this.config.tap_action;

    return html`
      <ha-card>
        <div
          class="row ${sub ? "subtitle" : ""} ${tappable ? "tappable" : ""}"
          @click=${tappable ? () => this._handleAction(this.config.tap_action) : undefined}
        >
          ${this.config.icon ? html`<ha-icon .icon=${this.config.icon}></ha-icon>` : nothing}
          <span class="title">${this.config.heading ?? ""}</span>
          <span class="spacer"></span>
          ${secondary ? html`<span class="secondary">${secondary}</span>` : nothing}
        </div>
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 1;
  }
}

customElements.define("materia-heading", MateriaHeading);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-heading",
  name: "Materia Heading",
  description: "Section heading in the family's display voice, with a templatable right-aligned meta line.",
  preview: true,
});
