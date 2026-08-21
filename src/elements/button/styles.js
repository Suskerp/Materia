import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";

export const styles = [
  hostStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* "wide" buttons grow to fill the row (and stretch when standalone) */
    :host([wide]) {
      flex: 1;
      /* min-width:auto would refuse to shrink, so a long label overflows
         instead of ellipsizing. Every flex ancestor of .label needs this. */
      min-width: 0;
    }
    :host([wide]) .btn {
      width: 100%;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--mb-gap, 8px);
      height: var(--mb-h, 56px);
      min-width: var(--mb-h, 56px);
      padding: 0 var(--mb-px, 24px);
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      font-family: inherit;
      font-weight: 500;
      font-size: var(--mb-font, 16px);
      color: inherit;
      background: transparent;
      position: relative;
      overflow: hidden;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects),
        box-shadow var(--md-sys-motion-fast-effects);
    }

    /* icon-only → square footprint (width tracks height) */
    .btn.icon-only {
      padding: 0;
    }

    .btn ha-icon {
      --mdc-icon-size: var(--mb-icon, 24px);
      display: flex;
    }

    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.2;
      min-width: 0;
    }

    /* Stacked: icon above the text block, everything centered — the tall
       "Clean / Vac + mop" shape. Text stays centered as a column. */
    .btn.stacked {
      flex-direction: column;
      gap: 2px;
    }

    .btn.stacked .text {
      align-items: center;
    }

    /* Truncates rather than growing. M3 buttons ellipsize a long label; nowrap
       on its own cannot shrink below its content, so one long label (a
       translated string is routinely half again the English) forced the whole
       button row wider than a phone. The .sub rule below already did this —
       .label was simply missed. */
    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* Substate line: the selected preset on a split button, the mode on a
       tall action button. Deliberately quieter than the label. */
    .sub {
      white-space: nowrap;
      font-size: 0.72em;
      font-weight: 500;
      opacity: 0.75;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* ---- sizes (M3 expressive) ---- */
    .size-xs { --mb-h: 32px;  --mb-icon: 20px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 12px; --mb-gap: 8px; }
    .size-s  { --mb-h: 40px;  --mb-icon: 20px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 12px; --mb-gap: 8px; }
    .size-m  { --mb-h: 56px;  --mb-icon: 24px; --mb-font: 16px; --mb-px: 24px; --mb-rsq: 16px; --mb-gap: 8px; }
    .size-l  { --mb-h: 96px;  --mb-icon: 32px; --mb-font: 24px; --mb-px: 48px; --mb-rsq: 28px; --mb-gap: 12px; }
    .size-xl { --mb-h: 136px; --mb-icon: 40px; --mb-font: 32px; --mb-px: 64px; --mb-rsq: 28px; --mb-gap: 16px; }
    /* legacy sizes (materia-icon-button compatibility) */
    .size-default { --mb-h: 48px; --mb-icon: 24px; --mb-font: 14px; --mb-px: 16px; --mb-rsq: 14px; --mb-gap: 8px; }
    .size-large   { --mb-h: 56px; --mb-icon: 24px; --mb-font: 16px; --mb-px: 20px; --mb-rsq: 16px; --mb-gap: 8px; }

    /* ---- shapes ---- */
    .shape-round  { border-radius: calc(var(--mb-h) / 2); }
    .shape-square { border-radius: var(--mb-rsq, 16px); }

    /* ---- connected (split-button): round outer edge, small inner edge ---- */
    .connected-leading {
      border-radius: calc(var(--mb-h) / 2) var(--mb-rsq, 16px) var(--mb-rsq, 16px) calc(var(--mb-h) / 2);
    }
    .connected-trailing {
      border-radius: var(--mb-rsq, 16px) calc(var(--mb-h) / 2) calc(var(--mb-h) / 2) var(--mb-rsq, 16px);
    }

    /* ---- color roles × variants ----
       Variant (emphasis) and color role (meaning) are independent axes, per the
       M3 expressive button spec. The base declarations below ARE the spec's
       per-variant defaults, straight from the androidx tokens (FilledButton /
       FilledTonalButton / OutlinedButton / TextButton / ElevatedButtonTokens):
       filled reads the ACCENT pair (primary), tonal the CONTAINER pair
       (secondary-container — note the spec's default families deliberately
       differ per variant), outlined/text a NEUTRAL label (on-surface-variant),
       elevated an accent label on surface-container-low. A role-* class then
       repoints all three channels at one family, so role: tertiary or
       role: error colors any variant coherently. */
    .btn {
      --mb-accent: var(--md-sys-color-primary);
      --mb-on-accent: var(--md-sys-color-on-primary);
      --mb-container: var(--md-sys-color-secondary-container);
      --mb-on-container: var(--md-sys-color-on-secondary-container);
      --mb-label: var(--md-sys-color-on-surface-variant, var(--primary-text-color));
    }
    .role-primary {
      --mb-container: var(--md-sys-color-primary-container);
      --mb-on-container: var(--md-sys-color-on-primary-container);
      --mb-label: var(--md-sys-color-primary);
    }
    .role-secondary {
      --mb-accent: var(--md-sys-color-secondary);
      --mb-on-accent: var(--md-sys-color-on-secondary);
      --mb-label: var(--md-sys-color-secondary);
    }
    .role-tertiary {
      --mb-accent: var(--md-sys-color-tertiary);
      --mb-on-accent: var(--md-sys-color-on-tertiary);
      --mb-container: var(--md-sys-color-tertiary-container);
      --mb-on-container: var(--md-sys-color-on-tertiary-container);
      --mb-label: var(--md-sys-color-tertiary);
    }
    .role-error {
      --mb-accent: var(--md-sys-color-error);
      --mb-on-accent: var(--md-sys-color-on-error);
      --mb-container: var(--md-sys-color-error-container);
      --mb-on-container: var(--md-sys-color-on-error-container);
      --mb-label: var(--md-sys-color-error);
    }

    /* ---- variants ---- */
    .variant-filled {
      background: var(--mb-accent);
      color: var(--mb-on-accent);
    }
    .variant-tonal {
      background: var(--mb-container);
      color: var(--mb-on-container);
    }
    .variant-outlined {
      background: transparent;
      /* Expressive spec: outline-variant, not outline — the border is a shape
         cue, not a second ink. */
      border: 1px solid var(--md-sys-color-outline-variant, var(--md-sys-color-outline));
      color: var(--mb-label);
    }
    .variant-text {
      background: transparent;
      color: var(--mb-label);
    }
    .variant-elevated {
      background: var(--md-sys-color-surface-container-low, var(--ha-card-background, var(--card-background-color)));
      /* ElevatedButtonTokens.LabelTextColor = Primary — the accent channel. */
      color: var(--mb-accent);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    }

    /* ---- state layer ---- */
    .btn::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }
    .btn:hover::before { opacity: 0.08; }
    .btn:active::before { opacity: 0.1; }

    .btn.disabled,
    .btn.unavailable {
      opacity: 0.38;
      pointer-events: none;
    }
  `,
];
