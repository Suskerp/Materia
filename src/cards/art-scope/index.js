import { LitElement, html, nothing } from "lit";
import { loadCardHelpers } from "../../styles/shared.js";
import { artPalette, artUrl, themeSettings, ART_TOKENS, ART_HA_VARS } from "../../utils/art-palette.js";
import { PanelHostMixin } from "../../primitives/panels.js";
import { styles } from "./styles.js";
import "./editor.js";

import { kioskTracks, scopeGridColumns } from "./layout.js";
import { inheritScopeEntity } from "../../utils/media-editor-model.js";
import { availableHeight } from "../../utils/media.js";

/**
 * materia-art-scope — a container that themes its children with the colours
 * of a media player's cover. It sets the standard --md-sys-color-* tokens
 * (plus HA's primary/text colours) on itself, so every Materia card inside —
 * and anything else that reads M3 tokens — follows the cover. Sheets opened
 * from inside copy those tokens, so they follow it too.
 *
 * layout: stack | row | grid (columns) | kiosk
 *
 * KIOSK is also a panel host (primitives/panels.js): cover | player at
 * exactly 50/50, and a side column for the panels in `panels:` that buttons
 * open (`tap_action: { action: materia-panel, panel: <id> }`). Open, the
 * layout is cover 400 | player | panel 400. The panel closes after
 * `panel_timeout` seconds without a touch inside it, on a second tap of its
 * button, on × and when cover + player + panel no longer fit (layout.js
 * kioskTracks); then the same panels open as bottom sheets.
 * Other layouts host no panels: wrap the cards in materia-panel-host.
 */
class MateriaArtScope extends PanelHostMixin(LitElement) {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _cards: { state: true },
    /** Content-box width of the kiosk: the ONE measurement its layout uses. */
    _kw: { state: true },
  };

  static styles = styles;

  static getConfigElement() {
    return document.createElement("materia-art-scope-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states || {}).find((e) => e.startsWith("media_player.")) || "";
    return {
      entity,
      cards: [
        // Media cards inside take the scope's entity; none is repeated here.
        { type: "custom:materia-media-header" },
        { type: "custom:materia-media", variant: "player" },
        { type: "custom:materia-media-progress", variant: "player" },
        { type: "custom:materia-button-group", group: "transport" },
        { type: "custom:materia-button-group", group: "toolbar" },
      ],
    };
  }

  constructor() {
    super();
    // Cards inside inherit the scope's player unless they configure their own.
    this.addEventListener("materia-scope-context", (e) => {
      if (!this.config) return;
      e.stopPropagation();
      e.detail.entity = this.config.entity;
      e.detail.scope = this;
      // From the config, not the measurement: a card that asks before the
      // first ResizeObserver callback must get the same answer as one after.
      e.detail.kiosk = this.config.layout === "kiosk";
    });
  }

  setConfig(config) {
    if (!config.entity) throw new Error("entity is required");
    if (!Array.isArray(config.cards)) throw new Error("cards is required");
    this.config = { layout: "stack", gap: 16, background: true, panel_timeout: 10, ...config };
    const sig = JSON.stringify([config.entity, config.cards]);
    if (this.__cardsSig !== sig) {
      this.__cardsSig = sig;
      this._cards = null;
      this._buildCards();
    }
    if (this._panelMode() !== "side" && this._panelEl) this.closePanel(true);
  }

  /* ---- panel host (kiosk side column only) ---- */

  /** Kiosk: a side column while cover + player + panel fit, else its panels open as sheets. */
  _panelMode() {
    if (this.config?.layout !== "kiosk") return null;
    return this._tracks(true).canOpen ? "side" : "sheet";
  }

  _panelRegistry() {
    return this.config?.panels ?? {};
  }

  _panelTimeout() {
    return this.config?.panel_timeout ?? 10;
  }

  async _buildCards() {
    const sig = this.__cardsSig;
    const helpers = await loadCardHelpers();
    const els = await Promise.all(
      this.config.cards.map(async (c) => {
        const el = await helpers.createCardElement(inheritScopeEntity(c, this.config.entity));
        if (this.hass) el.hass = this.hass;
        return el;
      })
    );
    if (this.__cardsSig === sig) this._cards = els;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._panelTimer);
    this._ro?.disconnect();
    this._observed = null;
    this._watchViewport(false);
    cancelAnimationFrame(this._fillRaf);
  }

  /** Kiosk tracks for the measured width. */
  _tracks(open) {
    return kioskTracks(this._kw ?? 0, open);
  }

  /** Watch the kiosk's content box; close the panel when it no longer fits. */
  _observeKiosk() {
    const el = this.renderRoot?.querySelector(".kiosk");
    if (el === this._observed) return;
    this._observed = el;
    this._ro ??= new ResizeObserver((entries) => {
      this._kw = Math.floor(entries[0].contentRect.width);
      if (this._panelEl && !this._tracks(true).canOpen) this.closePanel(true);
      this._announceLayout();
      this._scheduleFill();
    });
    this._ro.disconnect();
    if (el) this._ro.observe(el);
    this._watchViewport(!!el);
  }

  /** Tell cards that read the scope context (kiosk or not) when it changes. */
  _announceLayout() {
    const kiosk = this.config?.layout === "kiosk";
    if (kiosk === this._lastKiosk) return;
    this._lastKiosk = kiosk;
    this.dispatchEvent(new CustomEvent("materia-scope-changed", { detail: { kiosk } }));
  }

  /* ---- kiosk height: measured, so it is right with HA's header shown or hidden ---- */

  _watchViewport(on) {
    this._onViewport ??= () => this._scheduleFill();
    const vv = window.visualViewport;
    window.removeEventListener("resize", this._onViewport);
    window.removeEventListener("orientationchange", this._onViewport);
    vv?.removeEventListener("resize", this._onViewport);
    if (!on) return;
    window.addEventListener("resize", this._onViewport);
    window.addEventListener("orientationchange", this._onViewport);
    vv?.addEventListener("resize", this._onViewport);
    this._scheduleFill();
  }

  _scheduleFill() {
    cancelAnimationFrame(this._fillRaf);
    this._fillRaf = requestAnimationFrame(() => this._measureFill());
  }

  /**
   * Available height = visible viewport height − the scope's top. That is
   * right whether HA's header is shown (top ≈ 56) or hidden by a kiosk mode
   * (top ≈ 0); the bottom safe area is subtracted in CSS. Until measured, the
   * CSS falls back to 100dvh minus the header.
   */
  _measureFill() {
    const card = this.renderRoot?.querySelector("ha-card.fill");
    if (!card) {
      this.style.removeProperty("--k-fill-px");
      return;
    }
    const top = card.getBoundingClientRect().top + (window.scrollY || 0);
    const h = availableHeight(window.visualViewport?.height ?? window.innerHeight, top);
    if (h > 0 && h !== this._fillPx) {
      this._fillPx = h;
      this.style.setProperty("--k-fill-px", `${h}px`);
    }
  }

  /* ---------------------------------------------------------------- colours */

  updated(changed) {
    super.updated(changed);
    this._observeKiosk();
    this._announceLayout();
    if (changed.has("hass") && this.hass) {
      if (this._cards) for (const el of this._cards) el.hass = this.hass;
      this._palette();
    }
  }

  _palette() {
    const url = artUrl(this.hass.states[this.config.entity]);
    const dark = this.hass.themes?.darkMode ?? window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const settings = themeSettings(this.hass);
    const key = `${url}|${dark}|${JSON.stringify(settings)}`;
    if (key === this._paletteKey) return;
    this._paletteKey = key;
    const apply = (tokens) => {
      if (key !== this._paletteKey) return; // a newer cover arrived meanwhile
      for (const token of Object.keys(ART_TOKENS)) {
        const v = `--md-sys-color-${token}`;
        if (tokens?.[token]) this.style.setProperty(v, tokens[token]);
        else this.style.removeProperty(v);
      }
      for (const [v, token] of Object.entries(ART_HA_VARS)) {
        if (tokens?.[token]) this.style.setProperty(v, tokens[token]);
        else this.style.removeProperty(v);
      }
    };
    if (!url) return apply(null);
    artPalette(url, settings, dark).then(apply, () => apply(null));
  }

  /* ---------------------------------------------------------------- render */

  _childStyle() {
    const c = this.config;
    if (c.layout === "grid") return `grid-template-columns:${scopeGridColumns(c.columns)};`;
    return "";
  }

  render() {
    if (!this.config) return html``;
    const c = this.config;
    const cards = this._cards ?? [];
    const pad = c.padding ?? (c.background === false ? 0 : 16);
    const kiosk = c.layout === "kiosk";
    const open = kiosk && !!this._panelId;
    const tracks = this._tracks(open);
    // Kiosk fills the viewport below HA's header (panel view or a full-width
    // section); fill: false opts out.
    const fill = kiosk && c.fill !== false;
    return html`
      <ha-card
        class="${c.background === false ? "bare" : ""} ${fill ? "fill" : ""}"
        style="padding:${Number(pad)}px;--k-pad:${Number(pad)}px;"
      >
        ${kiosk
          ? html`<div
              class="kiosk ${open ? "open" : ""} ${tracks.stacked ? "stacked" : ""}"
              style=${tracks.columns ? `grid-template-columns:${tracks.columns};--k-panel:${tracks.panel}px;` : ""}
            >
              <div class="k-cover">${cards[0] ?? nothing}</div>
              <div class="k-player" style="gap:${Number(c.gap)}px;">${cards.slice(1)}</div>
              <div class="k-panel" ?inert=${!open}>
                <div class="k-panel-inner">${this._renderPanel(false)}</div>
              </div>
            </div>`
          : html`<div class="children ${c.layout}" style="gap:${Number(c.gap)}px;${this._childStyle()}">${cards}</div>`}
      </ha-card>
    `;
  }

  getGridOptions() {
    return { columns: "full", rows: "auto" };
  }

  getCardSize() {
    return 12;
  }
}

customElements.define("materia-art-scope", MateriaArtScope);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "materia-art-scope",
  name: "Materia Art Scope",
  description: "Container that colours the cards inside it from a media player's cover; kiosk layout with side panels.",
  preview: false,
});
