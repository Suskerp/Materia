import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  // The unavailable treatment is keyed on ha-card.unavailable, which is why
  // the class goes on the card rather than the tile inside it.
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .tile {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 24px;
      /* Symmetric, and the same 14/16 materia-bar-select uses — NOT trimmed
         to let the 44dp handle's own overhang double as bottom padding. That
         trim is what put the handle 2.5px from this tile's 24px corner arc:
         still inside it, but close enough to read as escaping the card. At
         14dp the same corner clears by 11dp. The handle is 2.75x the track's
         height, so it, not the track, is what the padding has to clear. */
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 0;
      box-sizing: border-box;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .level-row.with-control {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 56px;
      align-items: center;
      gap: 12px;
    }

    .control {
      width: 56px;
      height: 56px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--md-sys-color-on-secondary-container);
      background: var(--md-sys-color-secondary-container);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .control.on {
      border-radius: 18px;
      color: var(--md-sys-color-on-primary);
      background: var(--md-sys-color-primary);
    }

    .control ha-icon {
      --mdc-icon-size: 24px;
    }

    /* Flat is for composed mixer/control surfaces where the parent supplies
       the card surface. It keeps the level row's typography and touch target
       without nesting another rounded container inside it. */
    .tile.flat {
      background: transparent;
      border-radius: 0;
      padding: 4px 0;
    }

    .head {
      display: flex;
      align-items: baseline;
      gap: 10px;
      min-width: 0;
    }

    .head ha-icon {
      --mdc-icon-size: 20px;
      flex: none;
      color: var(--ml-accent);
      /* Baseline alignment would hang a glyph off the text baseline. */
      align-self: center;
      opacity: 0.9;
    }

    /* The head row is a NAME and a READING side by side, so both sit on the
       M3 type scale one step apart rather than three. The 11px uppercase
       eyebrow over a 20px/700 numeral that shipped first came from
       materia-bar-select, where the two are stacked in a narrow column and
       the size jump is what separates them; laid out horizontally and
       baseline-aligned the same pair reads as a mismatch. title-small against
       title-medium keeps the reading dominant without shouting. */

    /* M3 title-small: 14sp / 500 / 20sp line / +0.1px tracking. */
    .label {
      flex: 1;
      min-width: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.85;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 title-medium: 16sp / 500 / 24sp line / +0.15px tracking. Accent
       coloured so the number and the track it belongs to read as one thing. */
    .value {
      flex: none;
      font-family: var(--materia-font-display, inherit);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: var(--ml-accent);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    /* M3 label-medium: 12sp / 500 / 16sp line / +0.5px tracking. */
    .unit {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.7;
      margin-left: 0.15em;
    }

    materia-slider {
      display: block;
      width: 100%;
    }

    /* ---- variant: vertical — a mixer column ---- */
    ha-card.vertical {
      height: 100%;
      min-height: 320px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 8px 0;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .vhead {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .vhead .label {
      font-size: 13px;
      line-height: 18px;
      color: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
      text-align: center;
    }

    .vhead .value {
      font-size: 34px;
      line-height: 40px;
      font-weight: 400;
      font-variant-numeric: tabular-nums;
    }

    ha-card.vertical materia-vslider {
      flex: 1 1 auto;
      min-height: 160px;
      --vs-active: var(--ml-accent);
    }

    .vfoot {
      display: flex;
      gap: 4px;
      height: 56px;
      width: 100%;
      max-width: 220px;
    }

    .vfoot.dead,
    ha-card.vertical.off .vfoot {
      opacity: 0.38;
      pointer-events: none;
    }

    .vfoot button {
      display: grid;
      place-items: center;
      border: 0;
      padding: 0;
      cursor: pointer;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .vfoot .step {
      flex: 1;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .vfoot .step.first {
      border-radius: 28px 10px 10px 28px;
    }

    .vfoot .step.last {
      border-radius: 10px 28px 28px 10px;
    }

    .vfoot .step:active {
      border-radius: 16px;
    }

    .vfoot .mute {
      width: 64px;
      border-radius: 10px;
      background: var(--md-sys-color-surface-container-highest, var(--secondary-background-color));
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .vfoot .mute.on {
      border-radius: 20px;
      background: var(--ml-accent);
      color: var(--md-sys-color-on-primary, #fff);
    }
  `,
];
