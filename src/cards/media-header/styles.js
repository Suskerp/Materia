import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";
import { volumeRingStyles } from "../../elements/volume-ring/ring.js";
import { mediaButtonStyles } from "../../elements/menu-list/styles.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  mediaTokens,
  volumeRingStyles,
  mediaButtonStyles,
  css`
    ha-card {
      color: var(--mx-on);
    }

    .top {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
    }

    .where {
      flex: 1;
      min-width: 0;
      line-height: 1.2;
    }

    .where b {
      display: block;
      font-size: 16px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .where span {
      display: block;
      font-size: 13px;
      color: var(--mx-onv);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Connected pair: outer radii follow the VISIBLE buttons. */
    .pair {
      display: flex;
      gap: 4px;
    }

    /* ---- kiosk variant ---- */
    .top.kiosk {
      gap: 8px;
    }

    .chip {
      height: 36px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      background: var(--mx-s2);
      color: var(--mx-onv);
      /* label-large (14/20, 500) */
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      letter-spacing: 0.1px;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
];
