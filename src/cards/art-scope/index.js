import { LitElement, html, nothing } from "lit";
import { loadCardHelpers } from "../../styles/shared.js";
import { artPalette, artUrl, themeSettings, ART_TOKENS, ART_HA_VARS } from "../../utils/art-palette.js";
import { createCardContent } from "../../primitives/sheet.js";
import { styles } from "./styles.js";
import "./editor.js";

import { kioskTracks, scopeGridColumns, panelCardConfig } from "./layout.js";
import { inheritScopeEntity } from "../../utils/media-editor-model.js";

const PANEL_CLOSE_MS = 400;

/**
 * materia-art-scope — a container that themes its children with the colours
 * of a media player's cover. It sets the standard --md-sys-color-* tokens
 * (plus HA's primary/text colours) on itself, so every Materia card inside —
 * and anything else that reads M3 tokens — follows the cover. Sheets opened
 * from inside copy those tokens, so they follow it too.
 *
 * layout: stack | row | grid (columns) | kiosk
 *
 * KIOSK is also a panel host: cover | player at exactly 50/50, and a side
 * panel that toolbar / header / ring buttons open (event
 * `materia-open-panel`). Open, the layout is cover 400 | player | panel 400.
 * `panels.<id>` is merged over the card config the button asks for, so the
 * kiosk can show e.g. the tap-style volume card where a phone shows the knob.
 * The panel closes after `panel_timeout` seconds without a touch inside it,
 * on a second tap of its button, on × and when cover + player + panel no
 * longer fit (layout.js kioskTracks); below 600 px the
 * kiosk stacks and the buttons fall back to bottom sheets.
 */
class MateriaArtScope extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { state: true },
    _cards: { state: true },
    _panelEl: { state: true },
    _panelId: { state: true },
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
    this.addEventListener("materia-open-panel", (e) => this._onOpenPanel(e));
    // Cards inside inherit the scope's volume settings (and player) unless
    // they configure their own.
    this.addEventListener("materia-volume-context", (e) => {
      if (!this.config) return;
      e.stopPropagation();
      e.detail.volume = this.config.volume;
      e.detail.entity = this.config.entity;
      e.detail.kiosk = this.config.layout === "kiosk" && !this._tracks(false).stacked;
    });
    this.addEventListener("materia-dismiss", (e) => {
      if (!this._panelId) return;
      e.stopPropagation();
      this._closePanel();
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
    if (this.config.layout !== "kiosk" && this._panelId) this._closePanel(true);
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
      if (this._panelId && !this._tracks(true).canOpen) this._closePanel(true);
    });
    this._ro.disconnect();
    if (el) this._ro.observe(el);
  }

  /* ---------------------------------------------------------------- colours */

  updated(changed) {
    this._observeKiosk();
    if (changed.has("hass") && this.hass) {
      if (this._cards) for (const el of this._cards) el.hass = this.hass;
      const panel = this._panelEl?.real ?? this._panelEl;
      if (panel) panel.hass = this.hass;
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

  /* ---------------------------------------------------------------- kiosk panel */

  /** Id of the open kiosk panel (null when closed); read by the buttons. */
  get openPanel() {
    return this._panelId ?? null;
  }

  _onOpenPanel(e) {
    // Too narrow for cover + player + panel: let the button open a sheet.
    if (this.config?.layout !== "kiosk" || !this._tracks(true).canOpen) {
      if (this._panelId) this._closePanel(true);
      return;
    }
    e.stopPropagation();
    e.detail.host = this;
    const id = e.detail.id;
    if (this._panelId === id) {
      this._closePanel();
      return;
    }
    clearTimeout(this._panelRemoveTimer);
    const el = createCardContent(panelCardConfig(e.detail.config, this.config.panels, id));
    el.hass = this.hass;
    this._panelEl = el;
    this._panelId = id;
    this._touchPanel();
    this._announce();
  }

  _closePanel(immediate = false) {
    clearTimeout(this._panelTimer);
    this._panelId = null;
    this._announce();
    // Keep the content while the column animates shut.
    clearTimeout(this._panelRemoveTimer);
    if (immediate) this._panelEl = null;
    else this._panelRemoveTimer = setTimeout(() => (this._panelEl = null), PANEL_CLOSE_MS);
  }

  /** (Re)start the auto-close timer — on open and on every touch inside the panel. */
  _touchPanel() {
    clearTimeout(this._panelTimer);
    const s = Number(this.config.panel_timeout);
    if (this._panelId && s > 0) this._panelTimer = setTimeout(() => this._closePanel(), s * 1000);
  }

  _announce() {
    this.dispatchEvent(new CustomEvent("materia-panel-changed", { detail: { id: this.openPanel } }));
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
              <div class="k-panel" @pointerdown=${this._touchPanel} ?inert=${!open}>
                <div class="k-panel-inner">${this._panelEl ?? nothing}</div>
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
  description: "Container that colours the cards inside it from a media player's cover; kiosk layout with a side panel.",
  preview: false,
});
