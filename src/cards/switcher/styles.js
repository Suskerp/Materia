import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";

/* The tab bar is materia-volume-knob's zone tabs (.ztabs), copied 1:1. */
export const styles = [
  hostStyles,
  motionTokens,
  mediaTokens,
  css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--materia-switcher-gap, 18px);
      min-height: 0;
      color: var(--mx-on);
    }

    .slot {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    .slot > * {
      flex: 1;
      min-height: 0;
    }

    .ztabs {
      display: flex;
      gap: 3px;
      height: 52px;
    }

    .ztabs button {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--mx-s2);
      color: var(--mx-onv);
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .ztabs button.first {
      border-radius: 26px 8px 8px 26px;
    }

    .ztabs button.last {
      border-radius: 8px 26px 26px 8px;
    }

    .ztabs button.on {
      border-radius: 26px;
      background: var(--mx-sc);
      color: var(--mx-osc);
    }

    .ztabs .zn {
      max-width: 100%;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ztabs .zv {
      font-size: 15px;
      font-variant-numeric: tabular-nums;
      opacity: 0.8;
    }
  `,
];
