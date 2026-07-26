import { css } from "lit";
import { hostStyles, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  unavailableStyles,
  motionTokens,
  css`
    .wallet {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    /* Collapsed: slim stadium bar. Open: grows into a big rounded surface —
       radius, padding and height all morph on the expressive spatial spring
       (the wallet-card "jump"). */
    .section {
      /* Collapsed bars sit slightly muted (tint washed toward the surface);
         the OPEN section is the full-strength color moment — M3E emphasis:
         the hero gets the color, resting elements stay quieter. */
      background: color-mix(in srgb, var(--mw-bg, var(--ha-card-background, var(--card-background-color))) 72%, var(--md-sys-color-surface, var(--ha-card-background)));
      color: var(--mw-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
      border-radius: 999px;
      overflow: hidden;
      transition:
        border-radius var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects);
    }

    .section.open {
      border-radius: 28px;
      background: var(--mw-bg, var(--ha-card-background, var(--card-background-color)));
    }

    .bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: padding var(--md-sys-motion-expressive-default-spatial);
    }

    .section.open .bar {
      padding: 18px 22px 10px;
    }

    .s-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
      opacity: 0.9;
    }

    .s-title {
      font-family: var(--materia-font-display, inherit);
      font-size: 14px;
      font-weight: 600;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: font-size var(--md-sys-motion-expressive-default-spatial);
    }

    .section.open .s-title {
      font-size: 17px;
    }

    .s-info {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.7;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .s-chev {
      --mdc-icon-size: 22px;
      opacity: 0.55;
      flex-shrink: 0;
    }

    /* Height morph via the 0fr→1fr grid trick, on the expressive spring. */
    .body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .section.open .body {
      grid-template-rows: 1fr;
    }

    .body-inner {
      overflow: hidden;
      min-height: 0;
    }

    .cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 4px 12px 14px;
    }

    @media (prefers-reduced-motion: reduce) {
      .section,
      .bar,
      .s-title,
      .body {
        transition: none;
      }
    }
  `,
];
