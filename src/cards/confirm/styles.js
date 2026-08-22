import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { disabledConditionStyles } from "../../utils/conditions.js";
import { motionTokens } from "../../utils/motion.js";

/* SPEC SOURCES — every value below is one of these, never invented:

   * The gesture track's own geometry belongs to materia-drag-confirm, which
     already sits on the M3 button size ladder (96dp large rung, 32dp icon,
     28dp square corner). This card themes it through the primitive's custom
     properties and does NOT re-declare its size, so the two can never drift.
   * The deactivate button is the same 96dp rung with the .size-l 28px square
     corner, from src/elements/button/styles.js — so the two faces of this card
     occupy exactly the same footprint and the card cannot change height when
     it flips. That is the whole reason it is not a smaller button.
   * M3 type scale: title-medium 16/500/24 for the active label, body-medium
     14/20 for the caption, label-medium 12/500/16 for the eyebrow.
   * M3 state layers: hover 8%, press 10%.
   * M3 disabled content: 38%.
   * Colours: --md-sys-color-* only, plus the repo custom roles. The active
     face defaults to the TERTIARY container pair — M3 defines tertiary as the
     contrasting accent that balances primary, which is what an override that
     is deliberately running against the normal behaviour needs. It is not the
     error pair: an override someone switched on on purpose is not a fault.
   * Motion from src/utils/motion.js only. */

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  disabledConditionStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 2.5cqi, 12px);
      /* No background of its own: this card is a control, not a panel, so it
         sits on whatever it is placed on. The track and the active face carry
         all the colour. */
      background: transparent;
    }

    /* label-medium, uppercase — the quiet line that says what this control is
       for, above a track whose own label is an instruction. */
    .eyebrow {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      opacity: 0.65;
      padding: 0 4px;
    }

    materia-drag-confirm {
      width: 100%;
      --mdc-track: var(--mc-track);
      --mdc-ink: var(--mc-ink);
      --mdc-handle: var(--mc-handle);
      --mdc-handle-ink: var(--mc-handle-ink);
    }

    /* THE ACTIVE FACE. Same 96px rung and same 28px corner as the track it
       replaces, so flipping between them never moves anything else on the
       dashboard by a pixel. */
    button.active-face {
      width: 100%;
      height: 96px;
      box-sizing: border-box;
      border: none;
      border-radius: 28px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      background: var(--mc-active-bg);
      color: var(--mc-active-fg);
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    button.active-face:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    button.active-face .layer {
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button.active-face:hover .layer {
      opacity: 0.08;
    }

    button.active-face:active .layer {
      opacity: 0.1;
    }

    button.active-face ha-icon {
      --mdc-icon-size: 32px;
      flex-shrink: 0;
    }

    .face-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }

    /* M3 title-medium. */
    .face-label {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 label-medium — the "tap to stop" half of the active face. */
    .face-hint {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.8;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* THE WARNING, and the reason this card can replace a modal at all.
       M3 body-medium. A confirmation dialog shows its warning only after you
       have already committed to acting, and only once; this line is on screen
       BEFORE the gesture is touched and stays there while it is held. That is
       strictly more informative than the dialog it replaces, which is what
       makes dropping the dialog defensible rather than a shortcut. */
    .caption {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
      opacity: 0.78;
      padding: 0 4px;
    }

    .caption.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.7;
      text-align: center;
      padding: 8px 4px;
    }

    @media (prefers-reduced-motion: reduce) {
      button.active-face,
      button.active-face .layer {
        transition: none;
      }
    }
  `,
];
