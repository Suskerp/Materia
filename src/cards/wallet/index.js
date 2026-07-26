import { LitElement, html, nothing } from "lit";
import { ActionMixin } from "../../utils/action-handler.js";
import { loadCardHelpers } from "../../styles/shared.js";
import { styles } from "./styles.js";
import "./editor.js";

/**
 * Wallet stack (POC): sections rendered as slim horizontal bars — icon,
 * title, one piece of user-chosen info — that spring open expressively when
 * tapped, revealing the section's full cards (accordion: one open at a time).
 * Meant to replace swipe-card paging: everything visible, one tap to focus.
 *
 * config:
 *   sections:
 *     - title: Climate
 *       icon: m3o:mode-heat
 *       info_entity: climate.vicare        # collapsed-bar info (state)
 *       color: var(...)                    # optional bar tint
 *       cards: [ ...any cards... ]
 *   expanded: 0        # initially open section (false = all collapsed)
 */
class MateriaWallet extends ActionMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _open: { state: true },
    _ready: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-wallet-editor");
  }

  static getStubConfig() {
    return { sections: [], expanded: 0 };
  }

  setConfig(config) {
    if (!config.sections?.length) throw new Error("Materia Wallet: add at least one section");
    this.config = { expanded: 0, ...config };
    // Wallet invariant: exactly ONE section is always large.
    this._open = Math.max(0, Number(this.config.expanded) || 0);
    this._cardEls = null;
    if (this.isConnected) this._createCards();
  }

  firstUpdated() {
    this._createCards();
  }

  async _createCards() {
    const gen = (this._cardsGen = (this._cardsGen || 0) + 1);
    const helpers = await loadCardHelpers();
    const sections = this.config.sections || [];
    const els = await Promise.all(
      sections.map(async (s) => {
        const cards = await Promise.all(
          (s.cards || []).map(async (c) => {
            try {
              const el = await helpers.createCardElement(c);
              el.hass = this.hass;
              return el;
            } catch {
              return null; // one bad child must not kill the section
            }
          })
        );
        return cards.filter(Boolean);
      })
    );
    if (gen !== this._cardsGen) return; // stale run — a newer setConfig won
    this._cardEls = els;
    this._ready = !this._ready; // poke render
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._cardEls) {
      // Only the open section's children need live updates.
      this._cardEls.forEach((cards, i) => {
        if (i === this._open) cards.forEach((el) => { el.hass = this.hass; });
      });
    }
  }

  _info(s) {
    if (s.info) return s.info;
    if (s.info_entity) {
      const st = this.hass.states[s.info_entity];
      if (!st) return "";
      return this.hass.formatEntityState?.(st) ?? st.state;
    }
    return "";
  }

  _toggle(i) {
    // One section is ALWAYS open — tapping the open bar does nothing;
    // you switch focus, you never fully fold the wallet.
    if (this._open === i) return;
    this._open = i;
    this._fireHaptic("light");
    if (this._cardEls?.[i]) {
      // Catch-up hass for children that were dormant while collapsed.
      this._cardEls[i].forEach((el) => { el.hass = this.hass; });
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;
    const sections = this.config.sections || [];
    return html`
      <div class="wallet">
        ${sections.map((s, i) => {
          const open = this._open === i;
          const style = `${s.color ? `--mw-bg:${s.color};` : ""}${s.color_on ? `--mw-fg:${s.color_on};` : ""}`;
          return html`
            <div class="section ${open ? "open" : ""}" style=${style}>
              <div class="bar" @click=${() => this._toggle(i)}>
                ${s.icon ? html`<ha-icon class="s-icon" icon=${s.icon}></ha-icon>` : ""}
                <span class="s-title">${s.title ?? ""}</span>
                <span class="s-info">${open ? "" : this._info(s)}</span>
${open ? "" : html`<ha-icon class="s-chev" icon="m3of:arrow-drop-down"></ha-icon>`}
              </div>
              <div class="body">
                <div class="body-inner">
                  ${open && this._cardEls?.[i]?.length
                    ? html`<div class="cards">${this._cardEls[i]}</div>`
                    : nothing}
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  getGridOptions() {
    return { columns: 12, rows: "auto" };
  }

  getCardSize() {
    return 2 + (this.config?.sections?.length || 0);
  }
}

customElements.define("materia-wallet", MateriaWallet);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-wallet",
  name: "Materia Wallet",
  description: "POC: wallet-style stack — slim section bars that spring open to reveal full card sections.",
  preview: false,
});
