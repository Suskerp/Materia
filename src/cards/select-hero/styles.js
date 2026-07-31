import { css } from "lit";
import { heroShellStyles } from "../hero/shell.js";

/* Only what a SELECT hero adds to the shared hero anatomy (shell.js): the
 * route glyph, the consequence line, and the option pills. Container, tiers,
 * eyebrow, title, burst and alert strip all come from the shell — which is
 * why this card gains the family's fixes for free instead of drifting from
 * them, as its own copy of the shell used to. */
export const styles = [
  heroShellStyles,
  css`
    /* The head row: the glyph and the decision, side by side. */
    .head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    /* The route glyph: a per-option stroke path on the design's 48x34 grid,
       drawn in currentColor so it always sits on the block legibly.
       pathLength normalises EVERY route to 100 user units, which is what lets
       one draw-on duration read the same whether the glyph is a single line
       (Fast) or eight crossing strokes (Ultra) — see _drawRoute in index.js. */
    .route {
      width: clamp(52px, 16cqi, 68px);
      height: clamp(36px, 11cqi, 48px);
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .route path {
      stroke-dasharray: 100;
    }

    .gicon {
      --mdc-icon-size: clamp(32px, 10cqi, 44px);
      flex: none;
    }

    :host([variant="sidekick"]) .route {
      width: clamp(38px, 11cqi, 46px);
      height: clamp(26px, 8cqi, 32px);
    }

    :host([variant="sidekick"]) .gicon {
      --mdc-icon-size: clamp(26px, 8cqi, 32px);
    }

    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* The shell's .title carries a top margin for the eyebrow above it; here
       the eyebrow sits in the head row, so the title starts flush. */
    .head .title {
      margin-top: 0;
      font-size: clamp(22px, 6.8cqi, 28px);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    :host([variant="sidekick"]) .head .title {
      font-size: clamp(18px, 5.5cqi, 22px);
    }

    /* One line of consequence — what picking this option actually does.
       Two lines are RESERVED even when the text needs one: options have
       different sentence lengths, and without the reservation every tap
       resized the card and shoved the rest of the page up or down. */
    .blurb {
      font-size: clamp(12px, 3.6cqi, 13px);
      line-height: 1.45;
      opacity: 0.72;
      text-wrap: pretty;
      min-height: 2.9em;
    }

    /* The option pills live INSIDE the block: choosing is part of the same
       object as the explanation. */
    .pills {
      display: flex;
      gap: 3px;
      /* Never squeezed below their own labels: a select with six or seven
         options scrolls rather than shrinking to unreadable slivers. */
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }

    .pills::-webkit-scrollbar {
      display: none;
    }

    .pill {
      flex: 1 1 auto;
      min-width: max-content;
      height: 52px;
      padding: 0 14px;
      display: grid;
      place-items: center;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      color: inherit;
      background: color-mix(in srgb, currentColor 14%, transparent);
      border-radius: 26px;
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
      /* CONNECTED-GROUP physics: selection is not just a recolour — the chosen
         segment EARNS WIDTH and its neighbours yield, animated on the same
         expressive spatial beat as the radius morph. This is M3E's connected
         button group interaction, and it is what makes the row read as one
         object reacting rather than four buttons taking turns. */
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    :host([variant="sidekick"]) .pill {
      /* The 40px small-button rung — 44 was on no scale (see chips). */
      height: 40px;
    }

    /* Selected inverts against the hero's coloured container — the pair can
       never disagree with the theme, because both come from the block. */
    .pill.on {
      background: var(--mh-fg);
      color: var(--mh-bg);
      /* CornerMedium (12dp), the small rung's square shape. */
      border-radius: 12px;
      flex-grow: 1.6;
    }

    /* On the SIDEKICK's neutral surface an ink-inverse fill would be a content
       role used as a container (a black blob in light mode). These pills are a
       single-select toggle set, so TonalButtonTokens' toggle pair applies:
       selected = SOLID secondary, unselected = secondary-container. Selection
       must be the emphatic step of the family — stopping at the container tone
       for both made the chosen option read as the faded one. */
    :host([variant="sidekick"]) .pill {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    :host([variant="sidekick"]) .pill.on {
      background: var(--md-sys-color-secondary);
      color: var(--md-sys-color-on-secondary);
    }

    .pill:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `,
];
