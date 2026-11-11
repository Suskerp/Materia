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
    /* No switch, no on/off: the plain card colour (transparent when nested). */
    ha-card.row.plain {
      background: var(--ha-card-background, var(--card-background-color));
    }

    ha-card.row.flat.plain {
      background: transparent;
    }

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
      min-height: 48px;
    }

    .disclosure {
      display: flex;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      flex: 1;
      min-width: 0;
      padding: 12px 14px;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
      border-radius: inherit;
      -webkit-tap-highlight-color: transparent;
    }

    .disclosure:disabled {
      cursor: default;
    }

    .disclosure:focus-visible,
    .switch-target:focus-visible {
      outline: 3px solid var(--md-sys-color-primary, currentColor);
      outline-offset: -3px;
    }

    .switch-target {
      width: 48px;
      height: 48px;
      padding: 0;
      /* 12 + the 2px inside the 48px target = 14px to the card edge, the same as
         a materia-switch row, so stacked rows line their switches up. */
      margin-inline-end: 12px;
      border: 0;
      background: transparent;
      color: inherit;
      display: grid;
      place-items: center;
      flex: none;
      cursor: pointer;
      border-radius: 50%;
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
      opacity: 0.7;
      transition: transform var(--md-sys-motion-expressive-fast-spatial);
    }

    /* A hairline between the chevron (opens the row) and the switch (its own
       target), so a switch row that holds settings reads as expandable. */
    .split {
      flex: none;
      width: 1px;
      height: 28px;
      /* Breathing room both sides: 10px + the 2px inside the switch's 48px
         target reads as an even gap to the switch, matching the chevron side. */
      margin-inline: 8px 10px;
      background: var(--md-sys-color-outline-variant, var(--divider-color, rgba(127, 127, 127, 0.4)));
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

    /* Re-scope the inherited pressed-thumb state. materia-switch keys it on
       the whole row being active, which is right when the row IS the switch —
       here the row is also the disclosure, so pressing the header to open it
       made the thumb swell as though you had grabbed the toggle. Undo the
       inherited rule and hang it off the switch itself. */
    ha-card.row.exp:active .m3-switch i {
      width: 13px;
      height: 13px;
    }
    ha-card.row.exp:active .m3-switch:not(.on) i {
      left: 4px;
    }
    ha-card.row.exp:active .m3-switch.on i {
      left: 19px;
      width: 20px;
      height: 20px;
    }

    .m3-switch:active i {
      width: 22px;
      height: 22px;
    }

    .switch-target:active .m3-switch i {
      width: 22px;
      height: 22px;
    }
    .switch-target:active .m3-switch:not(.on) i {
      left: 2px;
    }
    .switch-target:active .m3-switch.on i {
      left: 16px;
    }

    @media (prefers-reduced-motion: reduce) {
      .chev,
      .m3-switch,
      .m3-switch i,
      ha-card.row.exp {
        transition: none;
      }
    }
    .m3-switch:not(.on):active i {
      left: 2px;
    }
    .m3-switch.on:active i {
      left: 16px;
    }
  `,
];
