import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    /* The rail must be able to stretch to whatever slot it sits beside —
       a layout-card grid row, a section cell — so the whole chain is 100%. */
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      height: 100%;
    }

    /* Connected button group, not Tabs — see index.js for why. One joined
       well; each segment computes its own corner radius in JS (button-
       group's own formula), so there is no container clip or divider here
       to fight it. */
    .rail {
      display: flex;
      flex-direction: column;
      gap: 2px;
      height: 100%;
    }

    .tab {
      position: relative;
      flex: 1 0 auto;
      border: none;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      /* Quiet filled well when unselected — the carousel-tile treatment,
         so an unselected tab never reads as disabled. */
      background: var(--md-sys-color-surface-container, color-mix(in srgb, var(--md-sys-color-on-surface, #1c1b1f) 5%, transparent));
      color: var(--md-sys-color-on-surface-variant);
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* The selected segment grows AND opens its seam corner to a full pill —
       the shape+size morph button-group already established, not a new one. */
    .tab.on {
      flex-grow: 1.4;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .glyph {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
    }

    .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.01em;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 state layer */
    .tab::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .tab:hover::before {
      opacity: 0.08;
    }

    .tab:active::before {
      opacity: 0.12;
    }

    .tab:focus-visible {
      outline: 3px solid var(--md-sys-color-primary, currentColor);
      outline-offset: -3px;
      z-index: 1;
    }

    /* Embedded pages: content left, rail right, one seam. */
    .wrap {
      display: grid;
      grid-template-columns: minmax(0, 1fr) var(--mtabs-rail-width, 148px);
      gap: 8px;
      height: 100%;
    }

    /* Every pane occupies the SAME cell; hidden ones keep their box so the
       stage holds the tallest pane's height — no reflow on switch, and
       pane-internal state (a map's zoom) survives. */
    .stage {
      display: grid;
      min-width: 0;
    }

    .pane {
      grid-area: 1 / 1;
      min-width: 0;
      /* Heavy panes (a live map) must not tax the rest of the page. */
      contain: layout style;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* visibility alone is NOT enough: a child may set visibility:visible
       under a hidden ancestor — the map card's zoom overlay does exactly
       that and punched through the rooms grid. Opacity can't be overridden
       from below. Both stay applied: visibility skips paint for honest
       children, opacity guarantees the rest. */
    .pane:not(.on) {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }

    .pane-card > * {
      display: block;
    }

    /* ---- horizontal bar (vertical: false) ---- */

    :host([horizontal]) .rail {
      flex-direction: row;
      height: auto;
    }

    :host([horizontal]) .tab {
      min-width: 0;
    }

    /* Bar above, pages below — markup stays stage-then-rail. */
    :host([horizontal]) .wrap {
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      height: auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .tab,
      .tab::before {
        transition: none;
      }
    }
  `,
];
