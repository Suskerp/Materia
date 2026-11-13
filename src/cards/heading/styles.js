import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    .row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      padding: 14px 6px 2px;
      color: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .row.subtitle {
      padding-top: 8px;
    }

    .row.tappable {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: 12px;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    /* Pressed: a 10% state layer and slightly tighter corners. */
    .row.tappable:active,
    .row.tappable[data-pressed] {
      background: color-mix(in srgb, currentColor 10%, transparent);
      border-radius: 8px;
    }

    ha-icon {
      --mdc-icon-size: 22px;
      align-self: center;
      flex: none;
      opacity: 0.9;
    }

    /* The display voice, bold with tight tracking — at a FIXED size. This
       used to scale with the card's container width (cqi), which made the
       same "Rooms" heading render smaller in a narrow column than a wide one.
       A section title is a landmark: it must hold rank everywhere on the
       page, so it holds one size — M3's title-large, 22px. */
    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .row.subtitle .title {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.01em;
      opacity: 0.85;
    }

    .row.subtitle ha-icon {
      --mdc-icon-size: 18px;
    }

    .spacer {
      flex: 1;
    }

    .secondary {
      font-size: 14px;
      font-weight: 500;
      opacity: 0.62;
      white-space: nowrap;
    }
  `,
];
