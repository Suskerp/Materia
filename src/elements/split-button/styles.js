import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const styles = [
  hostStyles,
  css`
    :host {
      display: inline-block;
    }

    .wrap {
      position: relative;
      display: inline-block;
    }

    .split {
      display: inline-flex;
      gap: 2px; /* M3: the inner space is always 2dp */
      height: var(--sb-h, 40px);
    }

    button {
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: var(--sb-font, 14px);
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 100%;
      padding: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius 0.25s ease, background-color 0.2s ease;
    }

    /* M3 state layer */
    button::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    button:hover::before { opacity: 0.08; }
    button:active::before { opacity: 0.12; }
    button:focus-visible { outline: 2px solid var(--md-sys-color-primary, #6750a4); outline-offset: 2px; }

    /* Outer corners fully rounded, inner corners small (the "connected" look) */
    .leading {
      padding: 0 var(--sb-pad, 16px);
      border-radius: calc(var(--sb-h) / 2) var(--sb-inner, 8px) var(--sb-inner, 8px) calc(var(--sb-h) / 2);
    }
    .trailing {
      width: calc(var(--sb-h) * 1.15);
      border-radius: var(--sb-inner, 8px) calc(var(--sb-h) / 2) calc(var(--sb-h) / 2) var(--sb-inner, 8px);
    }
    /* Selected: trailing inner corners morph fully round (M3 selected = 50%) */
    .trailing.open {
      border-radius: calc(var(--sb-h) / 2);
    }

    .leading ha-icon,
    .trailing ha-icon {
      --mdc-icon-size: var(--sb-icon, 20px);
      display: flex;
    }

    /* The menu icon rotates 180° inwards when open (standard motion scheme) */
    .chev {
      transition: transform 0.25s ease;
    }
    .trailing.open .chev {
      transform: rotate(180deg);
    }

    /* ---- Color variants (override with --sb-bg / --sb-fg) ---- */
    .filled button {
      background: var(--sb-bg, var(--md-sys-color-primary));
      color: var(--sb-fg, var(--md-sys-color-on-primary));
    }
    .tonal button {
      background: var(--sb-bg, var(--md-sys-color-secondary-container, var(--ha-card-background)));
      color: var(--sb-fg, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
    }
    .elevated button {
      background: var(--sb-bg, var(--md-sys-color-surface-container-low, var(--card-background-color)));
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    }
    .outlined button {
      background: var(--sb-bg, transparent);
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: inset 0 0 0 1px var(--md-sys-color-outline, rgba(127, 127, 127, 0.4));
    }

    /* ---- Menu ---- */
    .menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      min-width: max(180px, 100%);
      box-sizing: border-box;
      padding: 8px;
      border-radius: 16px;
      z-index: 20;
      color: var(--primary-text-color);
      /* Opaque even when the theme's surface token carries alpha (stack the
         same color over itself). */
      --_surf: var(--md-sys-color-surface-container-high, var(--card-background-color, var(--ha-card-background, #1c1c1c)));
      background:
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        linear-gradient(var(--_surf), var(--_surf)),
        var(--_surf);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transform: scaleY(0.9);
      transform-origin: top right;
      pointer-events: none;
      transition: opacity 0.16s ease, transform 0.16s ease;
    }
    .menu.open {
      opacity: 1;
      transform: scaleY(1);
      pointer-events: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 48px;
      padding: 0 16px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
    }
    .menu-item ha-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }
    .menu-item::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      transition: opacity 0.2s;
      pointer-events: none;
    }
    .menu-item:hover::before { opacity: 0.08; }
    .menu-item:active::before { opacity: 0.12; }
  `,
];
