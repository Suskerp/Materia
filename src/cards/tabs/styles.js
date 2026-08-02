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

    /* M3 Tabs (secondary style, inline icon + label): a quiet bar, not a
       column of buttons. The container is transparent with a 1dp
       outline-variant divider on the edge facing the content; the active
       tab wears primary ink and a 2dp primary indicator on that edge.
       Vertical is the same grammar rotated. */
    .rail {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-left: 1px solid var(--md-sys-color-outline-variant);
    }

    .tab {
      position: relative;
      flex: none;
      min-height: 48px;
      border: none;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      font-family: inherit;
      background: transparent;
      color: var(--md-sys-color-on-surface-variant);
      -webkit-tap-highlight-color: transparent;
      transition: color var(--md-sys-motion-fast-effects);
    }

    .tab.on {
      color: var(--md-sys-color-primary);
    }

    /* The indicator: 2dp primary, on the divider edge, growing in on the
       spatial spring. */
    .tab::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--md-sys-color-primary);
      transform: scaleY(0);
      transform-origin: center;
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .tab.on::after {
      transform: scaleY(1);
    }

    .glyph {
      --mdc-icon-size: 24px;
    }

    .label {
      /* title-small — the tabs spec's label style. */
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.01em;
      line-height: 1.2;
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
      border-left: none;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    :host([horizontal]) .tab {
      flex: 1 1 0;
      min-width: 0;
    }

    :host([horizontal]) .tab::after {
      left: 0;
      right: 0;
      top: auto;
      bottom: 0;
      width: auto;
      height: 2px;
      transform: scaleX(0);
    }

    :host([horizontal]) .tab.on::after {
      transform: scaleX(1);
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
      .tab::before,
      .tab::after {
        transition: none;
      }
    }
  `,
];
