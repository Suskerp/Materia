import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      container-type: inline-size;
      border-radius: 28px;
      padding: clamp(12px, 5cqi, 24px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(4px, 2cqi, 12px);
    }

    .dial-wrap {
      position: relative;
      width: min(100%, 340px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    .dial {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      /* The svg itself is inert — only the hit-ring interacts, so swipes and
         scrolls starting over the card body pass through (swipe-card etc). */
      pointer-events: none;
    }

    .hit-ring {
      fill: none;
      stroke: transparent;
      stroke-width: 16;
      stroke-linecap: round;
      pointer-events: stroke;
      touch-action: none;
      cursor: pointer;
    }

    .track {
      fill: none;
      stroke: var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.08));
      stroke-width: 5;
      stroke-linecap: round;
    }

    .sweep {
      fill: none;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .current-dot {
      fill: var(--md-sys-color-on-surface-variant);
      opacity: 0.7;
    }

    .current-knob {
      stroke: var(--md-sys-color-surface, #fff);
      stroke-width: 1.4;
    }

    /* Handle: a SOLID accent circle with the cookie as negative space inside
       (two layers — not a ring around a disc around a cookie). */
    .thumb {
      stroke: none;
    }

    .thumb-cookie {
      fill: var(--md-sys-color-surface, #fff);
    }

    /* Off: setpoint still visible, just quiet. */
    .thumb.muted {
      fill: var(--md-sys-color-on-surface-variant, #888);
      opacity: 0.8;
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .mode-label {
      font-size: clamp(14px, 6cqi, 18px);
      font-weight: 500;
      opacity: 0.85;
    }

    .target {
      font-size: clamp(44px, 22cqi, 72px);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.02em;
      display: flex;
      align-items: flex-start;
    }

    .target .deg {
      font-size: 0.38em;
      font-weight: 600;
      margin-top: 0.18em;
      opacity: 0.9;
    }

    .current-label {
      font-size: clamp(12px, 5cqi, 15px);
      font-weight: 500;
      opacity: 0.7;
    }

    .nudge {
      display: flex;
      gap: 2px; /* connected-group spec seam */
      margin-top: calc(-1 * clamp(8px, 4cqi, 20px));
    }

    /* Side layout: dial and a LARGE vertical +/- column side by side. */
    .dial-row {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .dial-row.side {
      gap: clamp(10px, 4cqi, 22px);
    }

    .dial-row.side .dial-wrap {
      width: min(72%, 300px);
    }

    /* M3 Expressive connected pair: outer corners pill, inner corners small
       (the connected-group silhouette). Pressing a segment EXPANDS it while
       its neighbor compresses (animated flex-grow) and its shape morphs to a
       full pill — the signature expressive button-group interaction. Colors
       follow the active mode's climate palette. */
    .nudge {
      width: min(72%, 280px);
    }

    /* Matches materia-button-group "tonal" segments exactly — the steppers
       and the mode row below read as one component family. */
    .nudge .seg {
      flex: 1 1 0;
      height: clamp(48px, 16cqi, 58px);
      border: none;
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .nudge .seg.minus {
      border-radius: 999px 10px 10px 999px;
    }

    .nudge .seg.plus {
      border-radius: 10px 999px 999px 10px;
    }

    .nudge .seg ha-icon {
      --mdc-icon-size: clamp(22px, 8cqi, 26px);
    }

    .nudge .seg:active {
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, var(--md-sys-color-secondary-container));
    }

    /* Vertical column (steppers: side) — MUST come after the generic .nudge
       rules: equal specificity means source order decides the cascade. */
    /* EXACTLY materia-button-group's construction, rotated: a pill container
       whose overflow clips the outer corners, buttons with one uniform
       size-scaled inner radius, a 2px seam, currentColor state layer, and the
       expressive flex-grow press morph. */
    .nudge.vertical {
      flex-direction: column;
      margin: 0;
      gap: 2px;
      width: clamp(56px, 18cqi, 74px);
      height: clamp(154px, 54cqi, 222px);
      border-radius: 999px;
      overflow: hidden;
    }

    .nudge.vertical .seg {
      flex: 1 1 0;
      width: 100%;
      height: auto;
      /* group innerCorner ratio (16 @ 48px l, 20 @ 56px xl) scaled to width */
      border-radius: clamp(18px, 6cqi, 26px);
      position: relative;
      overflow: hidden;
    }

    .nudge.vertical .seg::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    .nudge.vertical .seg:hover::before {
      opacity: 0.08;
    }

    .nudge.vertical .seg:active::before {
      opacity: 0.12;
    }

    .nudge.vertical .seg ha-icon {
      --mdc-icon-size: clamp(24px, 8cqi, 28px);
    }

    /* Press = icon-button feedback (shape morph + state layer), NOT the
       group's flex-grow selection morph — steppers get mashed repeatedly and
       a layout reflow inside the clipping pill container both clips on
       release and looks frantic under rapid taps. */
    .nudge.vertical .seg:active {
      border-radius: 999px;
    }

    materia-button-group {
      width: 100%;
      margin-top: clamp(4px, 2cqi, 10px);
    }
  `,
];
