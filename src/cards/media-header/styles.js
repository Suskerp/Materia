import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";
import { volumeRingStyles } from "../../elements/volume-ring/ring.js";

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  mediaTokens,
  volumeRingStyles,
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

    .iconbtn {
      width: 48px;
      height: 48px;
      flex: none;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--mx-s2);
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .iconbtn:active {
      border-radius: 12px;
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

    .pair .iconbtn {
      border-radius: 16px;
    }

    .pair .iconbtn.first {
      border-radius: 24px 8px 8px 24px;
    }

    .pair .iconbtn.last {
      border-radius: 8px 24px 24px 8px;
    }

    .pair .iconbtn.first.last,
    .pair .iconbtn.open {
      border-radius: 24px;
    }

    .pair .iconbtn:active {
      border-radius: 12px;
    }

    .iconbtn.ring {
      color: var(--mx-p);
    }

    .iconbtn.open {
      background: var(--mx-sc);
      color: var(--mx-osc);
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
      border-radius: 10px;
      background: var(--mx-s2);
      color: var(--mx-onv);
      font-size: 15px;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pill {
      height: 44px;
      padding: 0 18px 0 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex: none;
      border-radius: 22px;
      background: var(--mx-sc);
      color: var(--mx-osc);
      font-size: 15px;
      font-weight: 500;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .pill ha-icon {
      --mdc-icon-size: 20px;
    }

    .pill.open {
      border-radius: 12px;
      background: var(--mx-p);
      color: var(--mx-op);
    }
  `,
];
