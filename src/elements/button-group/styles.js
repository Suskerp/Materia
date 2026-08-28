import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const PRESETS = {
  primary:        { active: "var(--md-sys-color-primary)",                          onActive: "var(--md-sys-color-on-primary)" },
  secondary:      { active: "var(--md-sys-color-secondary)",                        onActive: "var(--md-sys-color-on-secondary)" },
  tertiary:       { active: "var(--md-sys-color-tertiary)",                         onActive: "var(--md-sys-color-on-tertiary)" },
  "climate-heat": { active: "var(--md-sys-cust-color-climate-heat-container)",      onActive: "var(--md-sys-cust-color-on-climate-heat)" },
  "climate-cool": { active: "var(--md-sys-cust-color-climate-cool-container)",      onActive: "var(--md-sys-cust-color-on-climate-cool)" },
  "climate-auto": { active: "var(--md-sys-cust-color-climate-auto-container)",      onActive: "var(--md-sys-cust-color-on-climate-auto)" },
  light:          { active: "var(--md-sys-cust-color-light)",                       onActive: "var(--md-sys-cust-color-on-light)" },
  device:         { active: "var(--md-sys-cust-color-device)",                      onActive: "var(--md-sys-cust-color-on-device)" },
};

/* Heights are the M3 button size scale (32/40/56/96/136dp). A connected group
   is BUILT from buttons, so it must use the same ladder as materia-button —
   the old 32/36/40/48/56 scale here was invented and made the same `size`
   token mean two different heights depending on the group configuration.
   innerCorner is the connected seam radius and is left as-is. */
export const SIZES = {
  xs: { height: 32,  innerCorner: 4,  pressedCorner: 8 },
  s:  { height: 40,  innerCorner: 8,  pressedCorner: 8 },
  m:  { height: 56,  innerCorner: 8,  pressedCorner: 12 },
  l:  { height: 96,  innerCorner: 16, pressedCorner: 16 },
  xl: { height: 136, innerCorner: 20, pressedCorner: 16 },
};

export const styles = [
  hostStyles,
  haCardReset,
  motionTokens,
  css`
    .group {
      display: flex;
      gap: 2px;
      width: 100%;
      /* NO container radius/clip: every button computes its own corners
         (outer stadium ends, inner seams, and the M3E active-square morph).
         A 999px clip here silently erased the morph on outer corners — a
         single-option group could never show it at all. */
      background: transparent;
      box-sizing: border-box;
    }

    button {
      /* Content-sized, then grows to share leftover width — and never shrinks.
         A zero flex-basis divided the row equally regardless of label length,
         so the longest label was hard-clipped. M3 sizes connected buttons to
         their content. */
      flex: 1 0 auto;
      min-width: 0;
      border: none;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      background: transparent;
      color: inherit;
      font-family: inherit;
      white-space: nowrap;
      position: relative;
      -webkit-tap-highlight-color: transparent;
    }

    .button-surface {
      width: 100%;
      height: var(--visual-height);
      padding: 0 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* Safety net if the row is genuinely too cramped: ellipsis beats a cut. */
    .button-surface > span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .button-surface::before {
      content: "";
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button:hover .button-surface::before {
      opacity: 0.08;
    }

    button:active .button-surface::before {
      opacity: 0.12;
    }

    button:focus-visible {
      outline: 3px solid var(--md-sys-color-primary, currentColor);
      outline-offset: -3px;
      z-index: 1;
    }

    /* M3 toggle buttons share one pressed shape regardless of whether their
       resting shape is round or square. The release then visibly morphs to the
       newly selected resting shape through the spatial spring above. */
    .group.multi button:active .button-surface {
      border-radius: var(--pressed-radius) !important;
    }

    /* Unselected toggle pair per FilledButtonTokens: SurfaceContainer /
       OnSurfaceVariant. This half of the pair had drifted to HA theme vars
       while the selected half was already correct. */
    .button-surface.inactive.filled {
      background: var(--md-sys-color-surface-container, var(--ha-card-background, var(--card-background-color)));
      color: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
    }

    .button-surface.inactive.tonal {
      background: var(--md-sys-color-secondary-container, var(--ha-card-background));
      color: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    }

    /* Standard group: a spaced row of independent buttons. */
    .row {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .group.multi {
      flex-wrap: wrap;
      gap: 4px;
      height: auto !important;
      border-radius: 0;
    }

    .group.multi button {
      flex: 1 0 calc(100% / var(--btn-columns, 4) - 4px);
      height: var(--btn-height);
    }

    /* Connected groups do not size-morph. Material's connected-group style
       explicitly clears buttonSizeChange; selection is expressed by shape
       and colour, both using the fast spatial/effects motion tokens above. */

    .button-surface ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      button,
      .button-surface,
      .button-surface::before,
      .group.multi button {
        transition: none;
      }
    }
  `,
];
