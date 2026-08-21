import { css } from "lit";
import { styles as switchStyles } from "../switch/styles.js";

/* Deliberately BUILT ON materia-switch's stylesheet rather than a copy of it.
   An expander is a switch row that happens to open, so a column mixing the two
   has to align to the pixel — same 12/14 padding, same 22px icon, same 14/600
   name over a 12px 0.75-opacity subtitle, same M3 SwitchTokens track. Anything
   duplicated here would drift the moment one of them was tuned. */
export const styles = [
  ...switchStyles,
  css`
    /* The row becomes a column: header on top, disclosed body underneath. The
       header keeps the padding the row used to own. */
    ha-card.row.exp {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 0;
      cursor: default;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* M3 expressive shape morph: opening relaxes the corner a notch and drops
       the dimming, the same gesture the .colored escalation already uses. */
    ha-card.row.exp.open {
      border-radius: 20px;
      opacity: 1;
    }

    .chev {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
      opacity: 0.55;
      transition: transform var(--md-sys-motion-expressive-fast-spatial);
    }

    ha-card.row.exp.open .chev {
      transform: rotate(180deg);
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 12px 12px;
    }

    /* Hairline drawn from currentColor so it survives a templated row color
       instead of assuming a dark theme. */
    .sep {
      height: 1px;
      flex: none;
      background: color-mix(in srgb, currentColor 12%, transparent);
      margin: 0 2px 6px;
    }

    /* A disclosed child is nested content, not a card on a card. */
    .body > * {
      --ha-card-box-shadow: none;
    }
  `,
];
