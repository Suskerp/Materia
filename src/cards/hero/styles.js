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
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Everything below scales off the card's own width. */
      container-type: inline-size;
    }

    /* Connected group: a 2dp seam, and the members' facing corners tighten so
       the hero and its alert strip read as ONE object. */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* Asymmetric expressive container — three big corners and one small,
       which is what stops it reading as a plain rounded rectangle. */
    .hero {
      position: relative;
      overflow: hidden;
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--mh-bg);
      color: var(--mh-fg);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* Bottom corners tighten only while something is attached below. */
    .hero.attached {
      border-radius: 32px 32px 8px 8px;
    }

    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px clamp(16px, 4.5cqi, 22px);
      /* Mirror of the hero: small where they meet, large on the outside, and
         the one tight corner kept at bottom-right so the silhouette still has
         the family's asymmetry. */
      border-radius: 8px 8px 14px 32px;
      background: var(--mh-alert-bg);
      color: var(--mh-alert-fg);
      cursor: pointer;
      box-sizing: border-box;
      font-size: clamp(13px, 3.7cqi, 15px);
      font-weight: 600;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .alert ha-icon {
      --mdc-icon-size: clamp(18px, 5cqi, 22px);
      flex-shrink: 0;
    }

    .alert span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .burst {
      position: absolute;
      right: -8cqi;
      top: -8cqi;
      width: 36cqi;
      height: 36cqi;
      /* Sits in the container tint, never competing with the text. */
      fill: color-mix(in srgb, currentColor 9%, transparent);
      pointer-events: none;
    }

    .burst.spin {
      transform-box: fill-box;
      transform-origin: center;
      animation: mh-spin 9s linear infinite;
    }

    /* Alert: the spike turns markedly faster AND swells toward the viewer.
       Rotation and scale can't share one transform, so the swell lives on a
       nested group — together they read as looming rather than merely turning. */
    .burst.alarm {
      animation-duration: 3.6s;
    }

    .loom {
      transform-box: fill-box;
      transform-origin: center;
      animation: mh-loom 2s ease-in-out infinite alternate;
    }

    @keyframes mh-loom {
      to {
        transform: scale(1.12);
      }
    }

    @keyframes mh-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .burst.spin,
      .loom {
        animation: none;
      }
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .eyebrow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
      min-width: 0;
    }

    .eyebrow span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .eyebrow ha-icon {
      --mdc-icon-size: clamp(15px, 4.4cqi, 18px);
      flex-shrink: 0;
    }

    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(21px, 7.6cqi, 32px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-top: 6px;
    }

    .figure {
      display: flex;
      align-items: flex-end;
      gap: 6px;
      margin-top: 2px;
      min-width: 0;
    }

    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(40px, 17cqi, 70px);
      font-weight: 700;
      letter-spacing: -0.06em;
      /* Generous enough that the display face's tall digits never clip. */
      line-height: 1.12;
      font-variant-numeric: tabular-nums;
    }

    .unit {
      font-size: clamp(14px, 4.6cqi, 20px);
      font-weight: 600;
      padding-bottom: clamp(6px, 2.8cqi, 11px);
    }

    .caption {
      font-size: clamp(12px, 3.4cqi, 14px);
      padding-bottom: clamp(8px, 3.6cqi, 15px);
      opacity: 0.62;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .secondary {
      font-size: clamp(13px, 3.7cqi, 15px);
      opacity: 0.62;
      margin-top: 6px;
    }
  `,
];
