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
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      letter-spacing: 0.1px;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* Power: red icon so it doesn't read as another media control; the
       kiosk pill is a round icon button. */
    .power {
      color: var(--mx-err);
    }

    .power.open {
      background: var(--mx-sc);
    }

    .pill.power {
      width: 44px;
      padding: 0;
      justify-content: center;
      background: var(--mx-s2);
      color: var(--mx-err);
    }

    .pmenu {
      position: fixed;
      inset: auto;
      margin: 0;
      border: none;
      overflow: visible;
      z-index: 10;
      padding: 6px 0;
      border-radius: 16px;
      background: var(--mx-s3);
      color: var(--mx-on);
      box-shadow: 0 6px 18px rgb(0 0 0 / 0.35);
      transform-origin: top right;
      animation: pmenu-in var(--md-sys-motion-expressive-fast-spatial, 0.2s ease-out) both;
    }

    @keyframes pmenu-in {
      from {
        opacity: 0;
        transform: scale(0.92);
      }
    }

    .prow {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      font-size: 14px;
      text-align: start;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .prow:hover,
    .prow:focus-visible {
      background: color-mix(in srgb, var(--mx-on) 8%, transparent);
      outline: none;
    }

    .prow .pname {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .prow.all.off,
    .prow.all.off ha-icon {
      color: var(--mx-err);
    }

    .prow ha-icon {
      --mdc-icon-size: 20px;
    }

    .pdiv {
      height: 1px;
      margin: 4px 0;
      background: var(--mx-ov);
    }

    /* M3 switch, drawn (the row is the control). */
    .psw {
      width: 44px;
      height: 26px;
      flex: none;
      position: relative;
      box-sizing: border-box;
      border-radius: 13px;
      border: 2px solid var(--mx-onv);
      background: var(--mx-s2);
      transition: background-color var(--md-sys-motion-fast-effects), border-color var(--md-sys-motion-fast-effects);
    }

    .psw::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--mx-onv);
      transition: all var(--md-sys-motion-expressive-fast-spatial, 0.2s);
    }

    .psw.on {
      border-color: var(--mx-p);
      background: var(--mx-p);
    }

    .psw.on::after {
      top: 3px;
      left: 21px;
      width: 16px;
      height: 16px;
      background: var(--mx-op);
    }

    @media (prefers-reduced-motion: reduce) {
      .pmenu {
        animation: none;
      }
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
