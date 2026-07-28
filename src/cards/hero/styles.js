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
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Inline "I've done it" affordance. Inherits the strip's own foreground so
       it reads at the right severity without a second colour decision. */
    .alert-action {
      flex: none;
      width: 32px;
      height: 32px;
      margin: -4px -6px -4px 0;
      border: none;
      border-radius: 50%;
      display: grid;
      place-items: center;
      cursor: pointer;
      color: inherit;
      background: color-mix(in srgb, currentColor 12%, transparent);
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .alert-action ha-icon {
      --mdc-icon-size: 18px;
    }

    .alert-action:hover {
      background: color-mix(in srgb, currentColor 22%, transparent);
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

    /* Static at rest. Motion means the robot is doing something, so a docked
       machine gets a still shape — nothing moving for no reason. */
    .burst {
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working {
      animation: mh-spin 9s linear infinite;
    }

    .burst.alarm {
      animation: mh-spin 45s linear infinite;
    }

    /* Alert is the one exception to "only when running": a fault should keep
       drawing the eye. Ominously slow rather than urgent — 45s per revolution
       on a 15-point star repeats only every ~3s of symmetry. Rotation and
       scale can't share one transform, so the swell rides a nested group. */
    .loom {
      transform-box: fill-box;
      transform-origin: center;
      animation: mh-loom 7s ease-in-out infinite alternate;
    }

    /* Calm counterpart to .loom — and, like the rotation, only while working. */
    .drift {
      transform-box: fill-box;
      transform-origin: center;
    }

    .burst.working .drift {
      animation: mh-drift 13s ease-in-out infinite alternate;
    }

    @keyframes mh-drift {
      to {
        transform: scale(1.03);
      }
    }

    @keyframes mh-loom {
      to {
        transform: scale(1.05);
      }
    }

    @keyframes mh-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .burst,
      .loom,
      .drift {
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
