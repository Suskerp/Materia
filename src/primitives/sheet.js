import { LitElement, html, css } from "lit";
import { motionTokens } from "../utils/motion.js";
import { hostStyles } from "../styles/card-styles.js";
import { ART_VARIABLES } from "../utils/art-palette.js";
import { loadCardHelpers } from "../styles/shared.js";
import { volumeKnobConfig } from "../utils/media.js";

/**
 * <materia-sheet> — M3 bottom sheet that hosts any card (the volume knob, the
 * station grid, …). Not a dashboard card: open it with openSheet().
 *
 * - Lives on document.body, so no card's overflow clips it.
 * - Copies the art-scope colour tokens from the element that opened it, so a
 *   sheet opened inside <materia-art-scope> keeps the cover's colours.
 * - Drag handle (drag down to close), scrim tap and Escape close it.
 * - Content can close it by firing `materia-dismiss` (bubbles, composed);
 *   the kiosk panel host listens for the same event.
 * - Only one sheet is open at a time.
 */
class MateriaSheet extends LitElement {
  static properties = {
    heading: { type: String },
    _open: { state: true },
  };

  static styles = [
    hostStyles,
    motionTokens,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 9;
        pointer-events: none;
      }
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--md-sys-color-scrim, #000);
        opacity: 0;
        transition: opacity var(--md-sys-motion-default-effects);
        pointer-events: auto;
      }
      .sheet {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0 auto;
        max-width: 640px;
        max-height: 92svh;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 16px calc(16px + env(safe-area-inset-bottom, 0px));
        border-radius: 28px 28px 0 0;
        background: var(--md-sys-color-surface-container-low, var(--card-background-color));
        color: var(--md-sys-color-on-surface, var(--primary-text-color));
        transform: translateY(105%);
        transition: transform var(--md-sys-motion-standard-slow-spatial);
        pointer-events: auto;
        outline: none;
        overscroll-behavior: contain;
      }
      .sheet.dragging {
        transition: none;
      }
      :host([open]) .scrim {
        opacity: 0.32;
      }
      :host([open]) .sheet {
        transform: none;
      }
      .grab {
        padding: 16px 0 12px;
        cursor: grab;
        touch-action: none;
      }
      .grab i {
        display: block;
        width: 32px;
        height: 4px;
        border-radius: 2px;
        margin: 0 auto;
        background: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
        opacity: 0.4;
      }
      .heading {
        margin: 0 4px 8px;
        font-size: 22px;
        line-height: 28px;
        font-weight: 400;
      }
      ::slotted(*) {
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
      }
    `,
  ];

  constructor() {
    super();
    this._onKey = (e) => {
      if (e.key === "Escape") this.close();
    };
    this.addEventListener("materia-dismiss", (e) => {
      e.stopPropagation();
      this.close();
    });
  }

  render() {
    return html`
      <div class="scrim" @click=${this.close}></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-label=${this.heading || ""} tabindex="-1">
        <div
          class="grab"
          @pointerdown=${this._dragStart}
          @pointermove=${this._dragMove}
          @pointerup=${this._dragEnd}
          @pointercancel=${this._dragEnd}
        ><i></i></div>
        ${this.heading ? html`<div class="heading">${this.heading}</div>` : ""}
        <slot></slot>
      </div>
    `;
  }

  _dragStart(e) {
    this._y0 = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
    this.renderRoot.querySelector(".sheet").classList.add("dragging");
  }

  _dragMove(e) {
    if (this._y0 == null) return;
    this.renderRoot.querySelector(".sheet").style.transform = `translateY(${Math.max(0, e.clientY - this._y0)}px)`;
  }

  _dragEnd(e) {
    if (this._y0 == null) return;
    const sheet = this.renderRoot.querySelector(".sheet");
    const dy = e.clientY - this._y0;
    this._y0 = null;
    sheet.classList.remove("dragging");
    sheet.style.transform = "";
    if (dy > 80) this.close();
  }

  /** Shows `content` above `origin`, inheriting origin's art-scope tokens. */
  show(origin, content) {
    if (origin) {
      const cs = getComputedStyle(origin);
      for (const v of ART_VARIABLES) {
        const value = cs.getPropertyValue(v).trim();
        if (value) this.style.setProperty(v, value);
      }
    }
    this.replaceChildren(content);
    this.content = content;
    document.body.appendChild(this);
    document.addEventListener("keydown", this._onKey);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        this.setAttribute("open", "");
        this.renderRoot.querySelector(".sheet")?.focus({ preventScroll: true });
      })
    );
  }

  close() {
    if (this._closing) return;
    this._closing = true;
    this.removeAttribute("open");
    document.removeEventListener("keydown", this._onKey);
    setTimeout(() => {
      this.remove();
      this.content = null;
    }, 350);
    this.onclose?.();
  }
}

customElements.define("materia-sheet", MateriaSheet);

let current = null;

export function createCardContent(cardConfig) {
  const tag = String(cardConfig.type || "").replace(/^custom:/, "");
  if (tag.startsWith("materia-") && customElements.get(tag)) {
    const el = document.createElement(tag);
    el.setConfig(cardConfig);
    return el;
  }
  // Any other card: build it the way a stack does. The placeholder is swapped
  // for the real card once HA's card helpers resolve.
  const holder = document.createElement("div");
  loadCardHelpers().then(async (helpers) => {
    const el = await helpers.createCardElement(cardConfig);
    el.hass = holder.hass;
    holder.replaceWith(el);
    holder.real = el;
  });
  return holder;
}

/**
 * Opens a card config in a sheet. Returns a controller: setHass() keeps the
 * content live (the opener forwards its own hass updates), close() closes it,
 * and `open` reports whether it is still showing.
 */
export function openSheet(origin, cardConfig, hass, heading) {
  current?.close();
  const content = createCardContent({ ...cardConfig, in_sheet: true });
  content.hass = hass;
  const sheet = document.createElement("materia-sheet");
  sheet.heading = heading || "";
  const controller = {
    open: true,
    setHass(h) {
      const target = sheet.content?.real ?? sheet.content;
      if (target) target.hass = h;
    },
    close: () => sheet.close(),
  };
  sheet.onclose = () => {
    controller.open = false;
    if (current === sheet) current = null;
  };
  sheet.show(origin, content);
  current = sheet;
  return controller;
}

/**
 * Asks an enclosing panel host (materia-art-scope, layout: kiosk) to show
 * `cardConfig` as panel `id`. Returns the host when it took the request, or
 * null when there is none or it is too narrow — then the caller opens a sheet.
 * A host closes the panel instead when `id` is already open (a second tap on
 * the same button), and still returns itself.
 */
export function requestPanel(origin, id, cardConfig) {
  const detail = { id, config: cardConfig, host: null };
  origin.dispatchEvent(new CustomEvent("materia-open-panel", { detail, bubbles: true, composed: true }));
  return detail.host;
}

/**
 * What an enclosing materia-art-scope offers its cards: its `volume:` block
 * and its entity ({} when there is no scope, or before `el` is connected).
 */
export function volumeContext(el) {
  const detail = { volume: undefined, entity: undefined };
  if (el.isConnected) {
    el.dispatchEvent(new CustomEvent("materia-volume-context", { detail, bubbles: true, composed: true }));
  }
  return detail;
}

/**
 * Mixin for elements that open a card in a kiosk panel or a bottom sheet:
 * forwards every hass update to an open sheet, tracks which panel of its
 * host is open (for the buttons' active state) and closes its sheet when the
 * opener leaves the DOM.
 */
export const SheetOpenerMixin = (superClass) =>
  class extends superClass {
    // Lit merges reactive properties up the class chain on finalize.
    static properties = { _openPanel: { state: true } };

    /**
     * The enclosing art scope's context ({ volume, entity, kiosk, scope }).
     * Subscribes to the scope's `materia-scope-changed`, so a layout change
     * (first measurement, kiosk ↔ stacked) re-renders this element at once
     * instead of waiting for the next hass update.
     */
    _scopeContext() {
      const ctx = volumeContext(this);
      if (ctx.scope !== this.__scope) {
        this.__scope?.removeEventListener("materia-scope-changed", this.__onScope);
        this.__scope = ctx.scope ?? null;
        this.__onScope ??= () => this.requestUpdate();
        this.__scope?.addEventListener("materia-scope-changed", this.__onScope);
      }
      return ctx;
    }

    /** Volume panel config: own `volume:` block, else the art scope's, else one zone. */
    _volumeKnobConfig() {
      const ctx = this._scopeContext();
      return volumeKnobConfig(this.config, this.config?.volume ? undefined : ctx);
    }

    /** Panel `id` of an enclosing kiosk host when there is one, else a bottom sheet. */
    _openSheet(origin, cardConfig, heading, id = null) {
      const host = id ? requestPanel(origin, id, cardConfig) : null;
      if (host) {
        if (this.__panelHost !== host) {
          this.__panelHost?.removeEventListener("materia-panel-changed", this.__onPanel);
          this.__panelHost = host;
          this.__onPanel ??= (e) => (this._openPanel = e.detail.id);
          host.addEventListener("materia-panel-changed", this.__onPanel);
        }
        this._openPanel = host.openPanel;
        return;
      }
      this.__sheet = openSheet(origin, cardConfig, this.hass, heading);
    }

    updated(changed) {
      super.updated?.(changed);
      if (changed.has("hass") && this.__sheet?.open) this.__sheet.setHass(this.hass);
    }

    connectedCallback() {
      super.connectedCallback();
      // (Re)attached, e.g. inside an art scope: ask its context again.
      this.requestUpdate();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this.__sheet?.open) this.__sheet.close();
      this.__sheet = null;
      this.__panelHost?.removeEventListener("materia-panel-changed", this.__onPanel);
      this.__panelHost = null;
      this.__scope?.removeEventListener("materia-scope-changed", this.__onScope);
      this.__scope = null;
    }
  };
