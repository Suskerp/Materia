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
      background: var(--ha-card-background, var(--card-background-color));
      overflow: hidden;
      container-type: inline-size;
    }

    /* ---- countdown bar ---- */

    /* The design's draining strip. Width is driven per-second from render; the
       1s linear transition is what turns the stepped updates into a glide. */
    .countbar {
      height: 8px;
      background: var(--md-sys-color-surface-container-high);
    }

    .countbar .fill {
      height: 100%;
      background: var(--md-sys-color-primary);
      transition: width 1s linear, background-color var(--md-sys-motion-default-effects);
    }

    /* The bar's colour settles with the phase — urgent while the ring is
       live, container-soft once it's been answered, outline-quiet when it
       lapsed. System tokens only; the design's palette is illustrative. */
    .countbar.buzzed .fill,
    .countbar.opened .fill {
      background: var(--md-sys-color-primary-container);
    }

    .countbar.lapsed .fill {
      background: var(--md-sys-color-outline-variant);
    }

    .body {
      padding: clamp(18px, 4cqi, 30px) clamp(18px, 4.5cqi, 34px) clamp(20px, 4.5cqi, 32px);
      display: flex;
      flex-direction: column;
      gap: clamp(14px, 3cqi, 22px);
    }

    /* ---- header ---- */

    .head {
      display: flex;
      align-items: center;
      gap: clamp(12px, 3cqi, 20px);
    }

    /* The bell chip is a CIRCLE while ringing and settles square-ish at rest —
       the same active-morphs-toward-a-pole language as the toggle buttons and
       the lock. */
    .chip {
      width: clamp(56px, 15cqi, 84px);
      height: clamp(56px, 15cqi, 84px);
      flex: none;
      display: grid;
      place-items: center;
      border-radius: 28px;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface-variant);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects),
        border-radius var(--md-sys-motion-expressive-default-spatial);
    }

    .chip ha-icon {
      --mdc-icon-size: clamp(28px, 8cqi, 42px);
    }

    .chip.live {
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .chip.soft {
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
    }

    .chip.ringing {
      border-radius: 50%;
    }

    .chip.ringing ha-icon {
      animation: mdb-bellshake 1.5s ease-in-out infinite;
    }

    @keyframes mdb-bellshake {
      0%, 54%, 100% { transform: rotate(0deg); }
      58% { transform: rotate(-12deg); }
      62% { transform: rotate(10deg); }
      66% { transform: rotate(-8deg); }
      70% { transform: rotate(6deg); }
      74% { transform: rotate(-4deg); }
      78% { transform: rotate(0deg); }
    }

    .headline {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .eyebrow {
      font-size: clamp(11px, 2.6cqi, 14px);
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--md-sys-color-on-surface-variant);
    }

    .eyebrow.accent {
      color: var(--md-sys-color-primary);
    }

    .title {
      font-size: clamp(24px, 6.4cqi, 46px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: var(--md-sys-color-on-surface);
      text-wrap: balance;
    }

    .title.accent {
      color: var(--md-sys-color-primary);
    }

    .subtitle {
      font-size: clamp(13px, 3cqi, 16px);
      color: var(--md-sys-color-on-surface-variant);
    }

    .count {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      flex: none;
    }

    .count .num {
      font-size: clamp(26px, 6cqi, 42px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1;
      color: var(--md-sys-color-on-surface-variant);
      font-variant-numeric: tabular-nums;
    }

    .count .num.accent {
      color: var(--md-sys-color-primary);
    }

    .count .cap {
      font-size: clamp(11px, 2.6cqi, 13px);
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.8;
      text-align: right;
    }

    /* ---- the two panels ---- */

    /* Asymmetric connected-group radii, exactly the split-button grammar:
       big outer corners, small facing corners, one 6px seam. */
    .panels {
      display: flex;
      gap: 6px;
      align-items: stretch;
    }

    .panel {
      background: var(--md-sys-color-surface-container);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .panel.buzz {
      flex: none;
      width: 39%;
      border-radius: 44px 16px 16px 44px;
      padding: clamp(14px, 3cqi, 20px) clamp(12px, 2.6cqi, 18px) clamp(16px, 3.4cqi, 24px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .panel.buzz.busy {
      background: var(--md-sys-color-secondary-container);
    }

    .panel.open {
      flex: 1;
      min-width: 0;
      border-radius: 16px 44px 44px 16px;
      padding: clamp(16px, 3.6cqi, 24px) clamp(16px, 3.8cqi, 26px) clamp(18px, 3.8cqi, 26px);
      display: flex;
      flex-direction: column;
    }

    /* OPENED wears materia-lock's unlocked pair — the device token, the
       palette's "this device is in its active state" colour — so the popup
       and the lock card below it flood the same way when the door is open.
       Copy inverts to the pair's own ink, exactly like the lock's body. */
    .panel.open.done {
      background: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
    }

    .panel.open.done .open-copy .big {
      color: inherit;
    }

    .panel.open.done .open-copy .small {
      color: inherit;
      opacity: 0.75;
    }

    /* And the slider inverts against it, like the lock's unlocked handle:
       the surface's ink becomes the handle, the surface becomes its glyph.
       Named explicitly, not currentColor — same shadow-DOM resolution trap
       materia-lock documents. */
    .panel.open.done materia-drag-confirm {
      --mdc-track: color-mix(in srgb, var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container)) 14%, transparent);
      --mdc-ink: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      --mdc-handle: var(--md-sys-cust-color-on-device, var(--md-sys-color-on-primary-container));
      --mdc-handle-ink: var(--md-sys-cust-color-device, var(--md-sys-color-primary-container));
    }

    /* Stacked when the card is narrow (the mobile bottom sheet): the buzz
       panel keeps the big top corners, the open panel the big bottom ones, so
       the pair still reads as one split object. */
    @container (max-width: 560px) {
      .panels {
        flex-direction: column;
      }
      .panel.buzz {
        width: auto;
        border-radius: 44px 44px 16px 16px;
      }
      .panel.open {
        border-radius: 16px 16px 44px 44px;
      }
    }

    /* ---- buzz cookie ---- */

    .cookie-stage {
      position: relative;
      width: clamp(150px, 42cqi, 238px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    .cookie-stage svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .wave path {
      fill: var(--md-sys-color-primary-container);
    }

    .wave {
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
    }

    .busy .wave.one {
      animation: mdb-wave 1.25s ease-out infinite;
    }

    .busy .wave.two {
      animation: mdb-wave 1.25s ease-out 0.62s infinite;
    }

    @keyframes mdb-wave {
      0% { transform: scale(0.78) rotate(0deg); opacity: 0.6; }
      100% { transform: scale(1.42) rotate(38deg); opacity: 0; }
    }

    /* The breathe NEVER stops and the spin rides a different element on a
       different property, so entering and leaving the buzz can't hitch: the
       design put breathe and spin on one transform, and swapping them
       restarted both from frame zero — a visible jump. Here .cookie only ever
       scales and its path only ever rotates. When the spin animation is
       removed the rotation snaps home, and on a 9-lobe cookie (40 degree
       symmetry) that snap is imperceptible — materia-lock's documented
       insight, reused. */
    .cookie {
      transform-box: fill-box;
      transform-origin: center;
      animation: mdb-breathe 5s ease-in-out infinite;
    }

    .cookie path {
      transform-box: fill-box;
      transform-origin: center;
    }

    /* One lobe passes about every 1.1s — a slow churn, not a spinner. At 5s
       per turn the 9-lobe silhouette read as frantic. */
    .busy .cookie path {
      animation: mdb-spin 10s linear infinite;
    }

    /* Press acknowledgement on the stage, not the cookie — the cookie's scale
       belongs to the breathe. */
    .cookie-stage {
      transition: scale 0.3s var(--md-sys-motion-expressive-default-spatial-easing, cubic-bezier(0.2, 1.5, 0.3, 1));
    }

    .panel.buzz:active .cookie-stage {
      scale: 0.93;
    }

    @keyframes mdb-spin {
      to { rotate: 360deg; }
    }

    @keyframes mdb-breathe {
      0%, 100% { scale: 1; }
      50% { scale: 1.04; }
    }

    .cookie path {
      fill: var(--md-sys-color-primary-container);
      transition: fill var(--md-sys-motion-default-effects);
    }

    .busy .cookie path {
      fill: var(--md-sys-color-primary);
    }

    .cookie-face {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      color: var(--md-sys-color-on-primary-container);
      transition: color var(--md-sys-motion-default-effects);
      pointer-events: none;
    }

    .busy .cookie-face {
      color: var(--md-sys-color-on-primary);
    }

    .cookie-face ha-icon {
      --mdc-icon-size: clamp(38px, 10cqi, 56px);
    }

    .cookie-face .word {
      font-size: clamp(13px, 3cqi, 15px);
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .buzz-caption {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-align: center;
    }

    .buzz-caption .big {
      font-size: clamp(17px, 3.8cqi, 20px);
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--md-sys-color-on-surface);
    }

    .buzz-caption .small {
      font-size: clamp(13px, 2.8cqi, 14px);
      line-height: 1.4;
      color: var(--md-sys-color-on-surface-variant);
      text-wrap: pretty;
    }

    /* ---- open panel ---- */

    .open-head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .open-glyph {
      width: clamp(44px, 10cqi, 56px);
      height: clamp(44px, 10cqi, 56px);
      flex: none;
      border-radius: 20px;
      display: grid;
      place-items: center;
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .open-glyph ha-icon {
      --mdc-icon-size: clamp(22px, 5cqi, 28px);
    }

    .done .open-glyph {
      border-radius: 50%;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
    }

    .open-copy {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .open-copy .big {
      font-size: clamp(18px, 4.4cqi, 24px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      color: var(--md-sys-color-on-surface);
    }

    .open-copy .small {
      font-size: clamp(13px, 2.8cqi, 14px);
      line-height: 1.4;
      color: var(--md-sys-color-on-surface-variant);
      text-wrap: pretty;
    }

    .open-spacer {
      flex: 1;
      min-height: 18px;
    }

    /* Global doors status — the header's right column outside the ringing
       countdown: which doors are open / were opened for this visit. */
    .doors {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      flex: none;
    }

    .door {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(13px, 2.8cqi, 14px);
      font-weight: 600;
      color: var(--md-sys-color-on-surface-variant);
      opacity: 0.65;
      transition: color var(--md-sys-motion-default-effects),
        opacity var(--md-sys-motion-default-effects);
    }

    .door ha-icon {
      --mdc-icon-size: 18px;
    }

    .door.yes {
      color: var(--md-sys-color-primary);
      opacity: 1;
    }

    materia-drag-confirm {
      width: 100%;
    }

    /* ---- bottom row ---- */

    .row {
      display: flex;
      gap: 6px;
      align-items: center;
      height: clamp(52px, 11cqi, 64px);
    }

    .row button {
      height: 100%;
      border: none;
      padding: 0 clamp(20px, 4.6cqi, 32px);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      font-family: inherit;
      font-size: clamp(14px, 3cqi, 15px);
      font-weight: 600;
      background: var(--md-sys-color-surface-container-high);
      color: var(--md-sys-color-on-surface-variant);
      border-radius: 10px;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .row button ha-icon {
      --mdc-icon-size: 22px;
    }

    .row .lead {
      border-radius: 32px 10px 10px 32px;
    }

    .row .trail {
      border-radius: 10px 32px 32px 10px;
    }

    /* The active mute is the one INVERSE moment on the card — a held-down
       state, not a container tint. */
    .row .muted {
      background: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
    }

    .row .gap {
      flex: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .chip.ringing ha-icon,
      .cookie,
      .busy .cookie path,
      .busy .wave.one,
      .busy .wave.two {
        animation: none;
      }
    }
  `,
];
