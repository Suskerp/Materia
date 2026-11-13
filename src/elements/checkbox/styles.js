import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  motionTokens,
  css`
    ha-card {
      box-sizing: border-box;
      height: 44px;
      padding: 0 12px;
      display: grid;
      grid-template-areas: "n i";
      grid-template-columns: 1fr 20px;
      column-gap: 8px;
      align-items: center;
      cursor: pointer;
      font-family: inherit;
      border-radius: 0;
      overflow: hidden;
      background: none;
      box-shadow: none;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }

    .name {
      grid-area: n;
      justify-self: start;
      text-align: left;
      align-self: center;
      font-size: var(--ha-font-size-m, 14px);
    }

    .icon-cell {
      grid-area: i;
      height: 20px;
      align-self: center;
      justify-self: end;
      display: grid;
      align-items: center;
      justify-items: center;
    }

    .icon-cell ha-icon {
      grid-area: 1 / 1;
      --mdc-icon-size: 26px;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--md-sys-color-primary);
    }

    /* The filled mark grows over the outline: in on the expressive spring,
       out quicker on the standard one; opacity on the fast effects spring. */
    .icon-cell .mark {
      opacity: 0;
      transform: scale(0.6);
      transition:
        opacity var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-standard-fast-spatial);
    }

    .icon-cell.checked .mark {
      opacity: 1;
      transform: none;
      transition:
        opacity var(--md-sys-motion-fast-effects),
        transform var(--md-sys-motion-expressive-fast-spatial);
    }

    @media (prefers-reduced-motion: reduce) {
      .icon-cell .mark,
      .icon-cell.checked .mark {
        transition: none;
      }
    }
  `,
];
