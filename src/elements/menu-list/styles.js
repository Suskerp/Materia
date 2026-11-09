import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";

/**
 * The media header's buttons and its popover menu, shared by
 * materia-media-header, materia-menu and materia-media-source so the
 * header and the standalone parts render alike. Rule order matters (equal
 * specificity): keep it.
 */
export const mediaButtonStyles = css`

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

    /* Connected pair: outer radii follow the VISIBLE buttons. */
    .iconbtn.seg {
      border-radius: 16px;
    }

    .iconbtn.seg.first {
      border-radius: 24px 8px 8px 24px;
    }

    .iconbtn.seg.last {
      border-radius: 8px 24px 24px 8px;
    }

    .iconbtn.seg.first.last,
    .iconbtn.seg.open {
      border-radius: 24px;
    }

    .iconbtn.seg:active {
      border-radius: 12px;
    }

    .iconbtn.ring {
      color: var(--mx-p);
    }

    .iconbtn.open {
      background: var(--mx-sc);
      color: var(--mx-osc);
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
    .danger {
      color: var(--mx-err);
    }

    /* Starting up / switching off: a slow pulse until the player confirms. */
    .busy ha-icon {
      animation: power-busy 1.2s ease-in-out infinite;
    }

    @keyframes power-busy {
      50% {
        opacity: 0.35;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .busy ha-icon {
        animation: none;
        opacity: 0.6;
      }
    }

    .danger.open {
      background: var(--mx-sc);
    }

    .pill.round {
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
  
    /* Source menu: opens from the button's start edge; a long list scrolls. */
    .pmenu.start {
      transform-origin: top left;
    }

    .pmenu.scroll {
      max-height: min(60vh, 432px);
      overflow-y: auto;
    }
`;

/** A standalone header part: no box of its own, its button lays out in the parent row. */
export const menuButtonStyles = [
  hostStyles,
  motionTokens,
  mediaTokens,
  mediaButtonStyles,
  css`
    :host {
      display: contents;
    }
  `,
];
