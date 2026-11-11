import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

/* Tones: the warning colour fills the badge; the row is a tonal container
   mixed from it, so text stays on-surface and readable in light and dark. */
export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    :host {
      --al-yellow: var(--materia-alert-yellow, #f2c94c);
      --al-orange: var(--materia-alert-orange, #f2994a);
      --al-red: var(--materia-alert-red, var(--md-sys-color-error, #e5484d));
      --al-surface: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      --al-on: var(--md-sys-color-on-surface, var(--primary-text-color));
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .alert {
      --tone: var(--al-yellow);
      display: flex;
      align-items: flex-start;
      gap: 14px;
      width: 100%;
      box-sizing: border-box;
      padding: 14px 16px;
      border: 0;
      border-radius: 28px;
      background: color-mix(in srgb, var(--tone) 22%, var(--al-surface));
      color: var(--al-on);
      font: inherit;
      text-align: start;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial, 200ms);
    }
    .alert:active {
      border-radius: 20px;
    }
    .alert.orange {
      --tone: var(--al-orange);
    }
    .alert.red {
      --tone: var(--al-red);
    }
    .alert.upcoming {
      background: color-mix(in srgb, var(--tone) 10%, var(--al-surface));
    }

    .badge {
      flex: none;
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      background: var(--tone);
      color: #1b1b1b;
    }
    .alert.upcoming .badge {
      background: color-mix(in srgb, var(--tone) 45%, var(--al-surface));
      color: var(--al-on);
    }

    .body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .eyebrow {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      letter-spacing: 0.4px;
      opacity: 0.8;
    }
    .title {
      font-size: 16px;
      line-height: 22px;
      font-weight: 600;
    }
    .when {
      font-size: 13px;
      line-height: 18px;
      opacity: 0.8;
    }
    .text {
      margin-top: 8px;
      font-size: 14px;
      line-height: 20px;
      white-space: pre-line;
    }
    .chev {
      flex: none;
      opacity: 0.7;
      margin-top: 10px;
    }

    .empty {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-radius: 28px;
      background: var(--al-surface);
      color: var(--al-on);
      opacity: 0.8;
    }
  `,
];
