import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      container-type: inline-size;
    }

    /* One filled tonal block — the loudest thing on its panel, because the
       option it presents is the DECISION and everything under it is
       consequence. Same asymmetric silhouette as the rest of the family. */
    .block {
      border-radius: 34px 34px 14px 34px;
      padding: clamp(16px, 4.8cqi, 22px);
      background: var(--msh-bg);
      color: var(--msh-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(12px, 3.6cqi, 16px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* The sidekick tier: a peer of the level bars, not a second statement. The
       asymmetric corner is the hero family's mark, so the sidekick takes the
       bars' uniform radius, and every size steps down one rung. */
    .block.sidekick {
      border-radius: 26px;
      padding: clamp(14px, 4cqi, 18px);
      gap: clamp(10px, 3cqi, 14px);
    }

    .block.sidekick .title {
      font-size: clamp(18px, 5.5cqi, 22px);
    }

    .block.sidekick .route {
      width: clamp(38px, 11cqi, 46px);
      height: clamp(26px, 8cqi, 32px);
    }

    .block.sidekick .gicon {
      --mdc-icon-size: clamp(26px, 8cqi, 32px);
    }

    .block.sidekick .pills {
      height: 44px;
    }

    /* Selection on a NEUTRAL surface takes the secondary family — M3's selected
       filter chip pair, and the same guardrail button-group encodes. The hero
       variant keeps its ink inverse because its block is a coloured container;
       the sidekick's fg is on-surface, a CONTENT role, and using it as a fill
       was a role abuse whose symptom was a black blob in light mode that only
       looked right in dark by accident. */
    .block.sidekick .pill.on {
      background: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
    }

    .eyebrow {
      font-size: clamp(11px, 3.2cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.62;
    }

    .head {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    /* The route glyph: a per-option stroke path on the design's 48x34 grid,
       drawn in currentColor so it always sits on the block legibly. */
    .route {
      width: clamp(46px, 14cqi, 56px);
      height: clamp(32px, 10cqi, 40px);
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .gicon {
      --mdc-icon-size: clamp(32px, 10cqi, 40px);
      flex: none;
    }

    .text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(22px, 6.8cqi, 28px);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .blurb {
      font-size: clamp(12px, 3.6cqi, 13px);
      line-height: 1.45;
      opacity: 0.72;
      text-wrap: pretty;
    }

    /* The option pills live INSIDE the block: choosing is part of the same
       object as the explanation. Selected inverts — ink-filled with the block's
       own surface as text — so the pair can never disagree with the theme. */
    .pills {
      display: flex;
      gap: 3px;
      height: 52px;
    }

    .pill {
      flex: 1;
      min-width: 0;
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-tap-highlight-color: transparent;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .pill.on {
      background: var(--msh-fg);
      color: var(--msh-bg);
      border-radius: 14px;
    }
  `,
];
