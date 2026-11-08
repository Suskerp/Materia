import { html, css, nothing } from "lit";
import { createCardContent, openSheet } from "./sheet.js";
import { t } from "../utils/i18n.js";
import {
  PANEL_OPEN_EVENT,
  PANEL_CHANGED_EVENT,
  DISMISS_EVENT,
  panelSpec,
  panelCardConfig,
  hostCanShow,
  setPanelSheetFallback,
} from "./panel-protocol.js";

/**
 * Panels: any Materia button, chip or tile can open a named panel with
 *
 *   tap_action: { action: materia-panel, panel: volume }
 *
 * The request bubbles to the nearest panel host (materia-panel-host, or a
 * kiosk materia-art-scope) whose `panels:` registry knows the id. The host
 * shows it inline, beside the cards or in a bottom sheet, draws the chrome
 * (heading, the entry's `actions` cards, back / close; `head: false` leaves
 * that row out) and closes it on a second tap of the same button,
 * on `materia-dismiss` from inside, or after its timeout. Without a host the
 * action can still carry its own `card:` (and `heading:`), which then opens
 * in a bottom sheet. The content is any card; it needs no panel awareness.
 */

export {
  PANEL_OPEN_EVENT,
  PANEL_CHANGED_EVENT,
  DISMISS_EVENT,
  panelSpec,
  panelCardConfig,
  hostCanShow,
  openPanel,
} from "./panel-protocol.js";

setPanelSheetFallback((origin, spec, hass) => openSheet(origin, panelCardConfig(spec), hass, spec.heading, undefined, spec));

/**
 * Mixin for a LitElement that hosts panels. The element provides:
 *  - `_panelRegistry()` → its `panels:` object
 *  - `_panelMode()` → "inline" | "side" | "sheet", or null to let the request
 *    pass to an outer host (or the opener's sheet fallback)
 *  - `_panelTimeout()` → seconds without a touch before an open panel closes (0 = never)
 * and renders `this._renderPanel(back)` where the panel goes (inline / side).
 */
export const PanelHostMixin = (superClass) =>
  class extends superClass {
    static properties = {
      _panelId: { state: true },
      _panelEl: { state: true },
      _panelHeading: { state: true },
      _panelActions: { state: true },
      _panelHead: { state: true },
    };

    constructor() {
      super();
      this.addEventListener(PANEL_OPEN_EVENT, (e) => this._onPanelRequest(e));
      this.addEventListener(DISMISS_EVENT, (e) => {
        if (!this._panelId) return;
        e.stopPropagation();
        this.closePanel();
      });
    }

    /** Id of the open panel (null when closed); openers read it for their active state. */
    get openPanel() {
      return this._panelId ?? null;
    }

    _onPanelRequest(e) {
      const { request } = e.detail;
      const mode = this._panelMode?.();
      const registry = this._panelRegistry?.();
      if (!mode || !hostCanShow(registry, request)) return; // an outer host, or a sheet
      e.stopPropagation();
      e.detail.host = this;
      const id = request.panel ?? "__card";
      if (this._panelId === id) {
        this.closePanel();
        return;
      }
      const spec = panelSpec(registry?.[request.panel], request);
      if (mode === "sheet") {
        this.closePanel(true);
        this.__panelSheet = openSheet(this, panelCardConfig(spec), this.hass, spec.heading, () => {
          if (this._panelId === id) this._setPanel(null);
        }, spec);
        this._setPanel(id, null, spec.heading);
        return;
      }
      clearTimeout(this.__panelRemoveTimer);
      this._beforePanelOpen?.(mode);
      const el = createCardContent(panelCardConfig(spec));
      el.hass = this.hass;
      this._panelHead = spec.head;
      this._panelActions = spec.head
        ? spec.actions.map((c) => {
            const a = createCardContent(c);
            a.hass = this.hass;
            return a;
          })
        : [];
      this._setPanel(id, el, spec.heading);
      this._touchPanel();
    }

    _setPanel(id, el, heading = "") {
      this._panelId = id;
      if (el !== undefined) this._panelEl = el;
      this._panelHeading = heading;
      this.dispatchEvent(new CustomEvent(PANEL_CHANGED_EVENT, { detail: { id: this.openPanel } }));
    }

    /** Closes the open panel; `immediate` skips the close animation. */
    closePanel(immediate = false) {
      clearTimeout(this.__panelTimer);
      if (this.__panelSheet?.open) this.__panelSheet.close();
      this.__panelSheet = null;
      if (!this._panelId && !this._panelEl) return;
      const animate = !immediate && this._panelMode?.() === "side";
      this._setPanel(null, animate ? undefined : null);
      clearTimeout(this.__panelRemoveTimer);
      if (animate) this.__panelRemoveTimer = setTimeout(() => (this._panelEl = null), 400);
      else this._panelActions = [];
    }

    /** (Re)starts the auto-close timer: on open and on every touch inside the panel. */
    _touchPanel() {
      clearTimeout(this.__panelTimer);
      const s = Number(this._panelTimeout?.() ?? 0);
      if (this._panelId && this._panelEl && s > 0) this.__panelTimer = setTimeout(() => this.closePanel(), s * 1000);
    }

    /**
     * Head row [back (inline) | heading | actions | × (side)] above the panel
     * content; none with `head: false`.
     */
    _renderPanel(back) {
      if (!this._panelEl) return nothing;
      const dismiss = () => this.closePanel();
      const actions = this._panelActions ?? [];
      return html`<div class="m-panel" @pointerdown=${this._touchPanel}>
        ${this._panelHead === false
          ? nothing
          : html`<div class="m-panel-head">
              ${back
                ? html`<button class="m-panel-btn back" aria-label=${t("media_back", this.hass)} @click=${dismiss}>
                    <ha-icon icon="mdi:arrow-left"></ha-icon>
                  </button>`
                : nothing}
              <h3>${this._panelHeading ?? ""}</h3>
              ${actions.length ? html`<div class="m-panel-actions">${actions}</div>` : nothing}
              ${back
                ? nothing
                : html`<button class="m-panel-btn" aria-label=${t("media_close", this.hass)} @click=${dismiss}>
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>`}
            </div>`}
        <div class="m-panel-body">${this._panelEl}</div>
      </div>`;
    }

    updated(changed) {
      super.updated?.(changed);
      if (changed.has("hass") && this.hass) {
        for (const el of [this._panelEl, ...(this._panelActions ?? [])]) {
          const target = el?.real ?? el;
          if (target) target.hass = this.hass;
        }
        if (this.__panelSheet?.open) this.__panelSheet.setHass(this.hass);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      clearTimeout(this.__panelTimer);
      clearTimeout(this.__panelRemoveTimer);
      if (this.__panelSheet?.open) this.__panelSheet.close();
      this.__panelSheet = null;
    }
  };

/**
 * Chrome of a hosted panel: head row + body; content cards lose their own
 * surface. The head row keeps the volume knob's header metrics: title-large
 * heading, 12 px gaps, 40 px icon buttons, the back arrow optically aligned.
 */
export const panelChromeStyles = css`
  .m-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
  }
  .m-panel-head {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .m-panel-head h3 {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-size: 22px;
    line-height: 28px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface, var(--primary-text-color));
  }
  .m-panel-actions {
    flex: none;
    display: flex;
    align-items: center;
    gap: 12px;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
  }
  .m-panel-btn {
    width: 40px;
    height: 40px;
    flex: none;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 20px;
    background: none;
    font: inherit;
    color: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .m-panel-btn.back {
    margin-inline-start: -8px;
    color: var(--md-sys-color-on-surface, var(--primary-text-color));
  }
  .m-panel-btn:hover {
    background: color-mix(in srgb, currentColor 8%, transparent);
  }
  .m-panel-btn:focus-visible {
    outline: 3px solid var(--md-sys-color-secondary, currentColor);
    outline-offset: -3px;
  }
  .m-panel-body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    /* The content fills the panel (a slider column stretches to it); taller
       content still scrolls. */
    display: flex;
    flex-direction: column;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
  }
  .m-panel-body > * {
    flex: 1 0 auto;
  }
`;
