import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const styles = [
  hostStyles,
  css`
    :host {
      display: inline-block;
    }

    /* "wide" grows the split button to fill the row; the leading button (also
       passed wide) flexes while the trailing stays a fixed icon-button width. */
    :host([wide]) {
      flex: 1;
      display: block;
    }
    :host([wide]) .wrap {
      display: block;
      width: 100%;
    }
    :host([wide]) .split {
      display: flex;
      width: 100%;
    }

    .wrap {
      position: relative;
      display: inline-block;
    }

    .split {
      display: inline-flex;
      align-items: stretch;
      gap: 2px; /* M3: the inner space is always 2dp */
      height: var(--sb-h, 40px);
    }

    /* The leading materia-button colors and sizes itself from its own config. */
    .leading {
      display: flex;
    }

    .trailing {
      border: none;
      cursor: pointer;
      width: var(--sb-h, 40px); /* square → a circle when open (radius = h/2) */
      height: var(--sb-h, 40px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius 0.25s ease, background-color 0.2s ease;
      /* Inner corner small, outer corner fully round (mirrors connected-trailing) */
      border-radius: var(--sb-inner, 8px) calc(var(--sb-h) / 2) calc(var(--sb-h) / 2) var(--sb-inner, 8px);
    }
    /* Selected: trailing inner corners morph fully round (M3 selected = 50%) */
    .trailing.open {
      border-radius: calc(var(--sb-h) / 2);
    }

    /* M3 state layer */
    .trailing::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
    }
    .trailing:hover::before { opacity: 0.08; }
    .trailing:active::before { opacity: 0.12; }
    .trailing:focus-visible { outline: 2px solid var(--md-sys-color-primary, #6750a4); outline-offset: 2px; }

    .trailing ha-icon {
      --mdc-icon-size: var(--sb-ticon, 20px);
      display: flex;
    }

    /* The menu icon rotates 180° inwards when open (standard motion scheme) */
    .chev {
      transition: transform 0.25s ease;
    }
    .trailing.open .chev {
      transform: rotate(180deg);
    }

    /* ---- Trailing color per variant (matches the leading button) ---- */
    .filled .trailing {
      background: var(--sb-bg, var(--md-sys-color-primary));
      color: var(--sb-fg, var(--md-sys-color-on-primary));
    }
    .tonal .trailing,
    .filled-tonal .trailing {
      background: var(--sb-bg, var(--md-sys-color-secondary-container, var(--ha-card-background)));
      color: var(--sb-fg, var(--md-sys-color-on-secondary-container, var(--primary-text-color)));
    }
    .elevated .trailing {
      background: var(--sb-bg, var(--md-sys-color-surface-container-low, var(--card-background-color)));
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    }
    .outlined .trailing,
    .text .trailing {
      background: var(--sb-bg, transparent);
      color: var(--sb-fg, var(--md-sys-color-primary, var(--primary-text-color)));
      box-shadow: inset 0 0 0 1px var(--md-sys-color-outline, rgba(127, 127, 127, 0.4));
    }

    /* ---- Menu ---- */
    .menu {
      position: absolute;
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
      pointer-events: none;
      transition: opacity 0.16s ease, transform 0.16s ease;
    }
    .menu.open {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    /* Open direction */
    .menu.dir-down {
      top: calc(100% + 4px);
      right: 0;
      transform-origin: top right;
      transform: scaleY(0.9);
    }
    .menu.dir-up {
      bottom: calc(100% + 4px);
      right: 0;
      transform-origin: bottom right;
      transform: scaleY(0.9);
    }
    .menu.dir-right {
      left: calc(100% + 4px);
      top: 0;
      transform-origin: left center;
      transform: scaleX(0.9);
    }
    .menu.dir-left {
      right: calc(100% + 4px);
      top: 0;
      transform-origin: right center;
      transform: scaleX(0.9);
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
