import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { disabledConditionStyles } from "../../utils/conditions.js";
import { motionTokens } from "../../utils/motion.js";

/* SPEC SOURCES — every value below, or the derivation that produced it:

   * M3 type scale, exactly as materia-level already applies it to the same
     label/reading pair: title-small 14/500/20 (+0.1px) for a row label,
     title-medium 16/500/24 (+0.15px) for its reading, label-medium
     12/500/16 (+0.5px) for the unit, body-medium 14/20 (+0.25px) for the
     status sentence, body-small 12/16 for the footnote.
   * Bar height 12px, radius 6px. The radius is NOT from the shape scale and is
     not meant to be: it is calc(height / 2), the same stadium rule the button
     ladder uses for its outer corners, which is the only radius that reads as
     a track rather than as a rounded rectangle. 12px is a deliberate step up
     from M3's 4dp linear progress indicator, because this is a data
     comparison the reader is meant to measure by eye rather than a progress
     readout to glance at — flagged as the one derived dimension here.
   * Track and indicator roles from the M3 progress indicator pair:
     surface-container-highest for the track, the row's own colour for the
     indicator. Default row colour is primary.
   * M3 shape scale for the card surface: extra-large 28dp.
   * Motion from src/utils/motion.js only.
   * Colours are --md-sys-color-* and the repo custom roles. No literals. */

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  disabledConditionStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Every measurement below scales off the card's own width, so one card
         reads correctly at 12 columns and at 4 without a breakpoint — and no
         row assumes it owns a full dashboard row. */
      container-type: inline-size;
    }

    .body {
      border-radius: 28px;
      padding: clamp(14px, 4cqi, 20px);
      background: var(--mb-bg);
      color: var(--mb-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(10px, 3cqi, 14px);
      box-sizing: border-box;
    }

    /* THE HEADER ROW: what this block is, left; how fresh it is, right. Both
       halves optional, so the row itself disappears when neither is set rather
       than leaving an empty band. Baseline-aligned, because the two are read
       as one line and not as a stack. */
    .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
    }

    /* M3 label-large, uppercased with wide tracking — the eyebrow voice this
       library already uses for a block label. The concept's 13px/700/.08em is
       the same intent expressed in raw numbers; 14/500 with 0.1px tracking plus
       uppercase is the token that means it. */
    .eyebrow {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      text-transform: uppercase;
      opacity: 0.72;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* M3 label-medium. Quieter than the eyebrow it sits beside: a freshness
       note is a qualifier, never the headline. */
    .meta {
      flex: none;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.55;
      white-space: nowrap;
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: clamp(8px, 2.4cqi, 12px);
    }

    /* THE ROW. Label, bar, reading — and the label and reading columns are a
       FIXED width while only the track flexes.

       That is the whole reason the bars are comparable, and it was wrong here
       first: sizing the label to its content (max-width 40%) meant every row
       started its track at a different x, so three bars on a shared scale
       still could not be read against each other by eye. A shared scale with
       unshared origins is not a comparison. The widths are expressed in cqi so
       they adapt to the card, which is safe precisely because every row in one
       card resolves them identically. */
    .row {
      display: flex;
      align-items: center;
      gap: clamp(8px, 2.4cqi, 12px);
    }

    /* M3 title-small. */
    .label {
      flex: none;
      width: clamp(56px, 22cqi, 92px);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.85;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* The track is ALWAYS full width and always present, so a row's height can
       never depend on its value and no reading can make the card reflow. Only
       the indicator's width changes. This is the same discipline the alarm
       card's zone list needed: geometry that responds to data is geometry that
       thrashes when the data does. */
    .track {
      flex: 1 1 auto;
      min-width: 48px;
      height: 14px;
      border-radius: 7px;
      background: var(--md-sys-color-surface-container-highest, color-mix(in srgb, var(--mb-fg) 12%, transparent));
      overflow: hidden;
      position: relative;
    }

    .indicator {
      position: absolute;
      inset: 0 auto 0 0;
      width: var(--mb-p, 0%);
      border-radius: 7px;
      background: var(--mb-row-color, var(--md-sys-color-primary));
      transition: width var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-default-effects);
    }

    /* UNKNOWN IS NOT ZERO, and this is the whole reason the card exists.
       A missing measurement rendered as an empty bar is a claim — it says the
       value is nought — and on this dashboard that is precisely the lie being
       corrected: "no reading yet" and "no surplus" are different facts and the
       page was conflating them. So an unknown row gets a hatched track and an
       em dash instead of a number, and NOT a zero-length fill.

       Neutral on purpose: outline-variant, never the warning role. A reading
       we do not have is not bad news, it is absent news, and spending the
       warning colour on it would leave nothing louder for an actual problem. */
    .track.unknown {
      background: repeating-linear-gradient(
        -45deg,
        var(--md-sys-color-surface-container-highest, transparent) 0 5px,
        color-mix(in srgb, var(--md-sys-color-outline-variant, var(--mb-fg)) 55%, transparent) 5px 10px
      );
    }

    .track.unknown .indicator {
      display: none;
    }

    /* A MEASURED ZERO DRAWS NOTHING, and that is load-bearing. The concept
       draws its zero row as a 2% stub with a muted fill, which makes a real
       zero look like a small non-zero — exactly the misreading this card
       exists to remove, so it is deliberately not reproduced. The track alone
       carries the meaning at zero. min-width is pinned at 0 so no later
       "give the fill a visible minimum" tweak can quietly reintroduce the
       stub. */
    .indicator {
      min-width: 0;
    }

    .reading {
      flex: none;
      width: clamp(48px, 17cqi, 72px);
      display: flex;
      align-items: baseline;
      gap: 0.15em;
      justify-content: flex-end;
      overflow: hidden;
    }

    /* M3 title-medium, tabular so the column of numbers does not jitter as
       digits change width. */
    .value {
      font-family: var(--materia-font-display, inherit);
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.15px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .value.unknown {
      opacity: 0.55;
    }

    /* M3 label-medium. */
    .unit {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.7;
      white-space: nowrap;
    }

    /* M3 uses a 1dp outline-variant divider. */
    .divider {
      height: 1px;
      background: var(--md-sys-color-outline-variant, color-mix(in srgb, var(--mb-fg) 18%, transparent));
      border: none;
      margin: clamp(2px, 1cqi, 4px) 0;
    }

    /* The status line: the sentence the page is actually opened to read. Icon
       and text baseline-aligned, M3 body-medium, and never truncated — it
       wraps, because a clipped explanation is worse than a taller card. */
    .status {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.25px;
    }

    .status ha-icon {
      --mdc-icon-size: 20px;
      flex-shrink: 0;
      /* Optical alignment: nudge the glyph onto the first line's centre
         (20px line box, 20px glyph) rather than its top. */
      margin-top: 0;
      color: var(--mb-status-color, inherit);
    }

    .status .text {
      min-width: 0;
    }

    /* M3 body-small — the confidence note. Quieter than the status it
       qualifies, which is the entire point of it being separate. */
    .footnote {
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      opacity: 0.66;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      opacity: 0.7;
      text-align: center;
    }

    /* NARROW CARDS. Below roughly a phone half-width the three-part row cannot
       hold a comparable bar and a readable label on one line, so the label and
       reading move onto their own line above a full-width track. The track
       keeps its height either way, so the card grows by a fixed amount rather
       than by an amount that depends on the data. */
    @container (max-width: 260px) {
      .row {
        flex-wrap: wrap;
        gap: 2px 8px;
      }

      /* Stacked, the alignment argument no longer applies — the track is on
         its own line and already shares one origin with every other row — so
         the label is free to take the width it needs. */
      .label {
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
        order: 1;
      }

      .reading {
        width: auto;
        flex: none;
        order: 2;
      }

      .track {
        order: 3;
        flex: 1 1 100%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .indicator {
        transition: none;
      }
    }
  `,
];
