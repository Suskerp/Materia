import { css } from "lit";

/**
 * Colour roles of the expressive media family as short aliases. Every value
 * is a standard M3 role (--md-sys-color-*), so the family follows the
 * Material You theme and, inside materia-art-scope, the current cover. The
 * HA fallbacks keep it legible under themes that set no M3 tokens.
 */
export const mediaTokens = css`
  :host {
    --mx-p: var(--md-sys-color-primary, var(--primary-color));
    --mx-op: var(--md-sys-color-on-primary, #fff);
    --mx-pc: var(--md-sys-color-primary-container, rgba(127, 127, 127, 0.2));
    --mx-opc: var(--md-sys-color-on-primary-container, var(--primary-text-color));
    --mx-sc: var(--md-sys-color-secondary-container, rgba(127, 127, 127, 0.2));
    --mx-osc: var(--md-sys-color-on-secondary-container, var(--primary-text-color));
    --mx-tc: var(--md-sys-color-tertiary-container, rgba(127, 127, 127, 0.25));
    --mx-otc: var(--md-sys-color-on-tertiary-container, var(--primary-text-color));
    --mx-s1: var(--md-sys-color-surface-container, var(--card-background-color));
    --mx-s2: var(--md-sys-color-surface-container-high, rgba(127, 127, 127, 0.12));
    --mx-s3: var(--md-sys-color-surface-container-highest, rgba(127, 127, 127, 0.2));
    --mx-on: var(--md-sys-color-on-surface, var(--primary-text-color));
    --mx-onv: var(--md-sys-color-on-surface-variant, var(--secondary-text-color));
    --mx-ov: var(--md-sys-color-outline-variant, rgba(127, 127, 127, 0.4));
    --mx-ec: var(--md-sys-color-error-container, #8c1d18);
    --mx-err: var(--md-sys-color-error, #b3261e);
  }

  button {
    font: inherit;
    color: inherit;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  [hidden] {
    display: none !important;
  }
`;
