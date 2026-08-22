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
      border-radius: 24px;
      padding: 16px 20px;
      /* haCardReset clears the background — restore the surface (obvious on
         dark themes, where the rows otherwise float on the view). The variable
         is what lets a tonal variant swap it for a container pair without a
         second rule fighting this one. */
      background: var(--ml-bg, var(--ha-card-background, var(--card-background-color)));
    }

    /* TONAL: a filled container pair, and specifically a PAIR. An accent role
       at partial alpha would look similar and guarantee nothing — its contrast
       depends on whatever happens to be behind the card — whereas
       primary-container carries on-primary-container with it and the theme
       promises the two are legible together in both light and dark. */
    ha-card.tonal {
      color: var(--ml-fg);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 600;
      padding-bottom: 8px;
    }

    .header ha-icon {
      --mdc-icon-size: 18px;
    }

    .rows {
      display: flex;
      flex-direction: column;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 0;
      font-size: 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      border-radius: 10px;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .row:hover {
      background: color-mix(in srgb, currentColor 5%, transparent);
    }

    /* A TEXT ROW is a line, not a name/value pair, so it drops the right-hand
       column and takes the whole width. Aligned to the top rather than centred
       because it WRAPS: on a narrow card an explanation runs to two or three
       lines, and a centred icon beside a three-line paragraph floats in the
       middle of it instead of marking where the line starts. */
    .row.text {
      align-items: flex-start;
      cursor: default;
    }

    .row.text:hover {
      background: transparent;
    }

    /* ...unless there is genuinely something to open. */
    .row.text.live {
      cursor: pointer;
    }

    .row.text.live:hover {
      background: color-mix(in srgb, currentColor 5%, transparent);
    }

    /* M3 body-medium: 14sp / 20sp line. The name column above deliberately
       clips to one line; an explanation must not, so this is the one row part
       that wraps. */
    .line {
      flex: 1;
      min-width: 0;
      line-height: 20px;
      overflow-wrap: anywhere;
    }

    /* Optical alignment: nudge the glyph onto the first line's centre rather
       than its cap height, now that the row aligns to the top. */
    .row.text .row-icon {
      margin-top: 1px;
    }

    .row-icon {
      --mdc-icon-size: 17px;
      opacity: 0.8;
      flex-shrink: 0;
    }

    .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-weight: 500;
      opacity: 0.85;
      flex-shrink: 0;
    }

    .row.unavailable .state {
      opacity: 0.45;
    }
  `,
];
