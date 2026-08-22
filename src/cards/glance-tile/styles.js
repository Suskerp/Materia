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
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      container-type: inline-size;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: clamp(12px, 6cqi, 15px);
      font-weight: 600;
      opacity: 0.92;
      max-width: 100%;
    }

    .header span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header ha-icon {
      --mdc-icon-size: clamp(14px, 7cqi, 18px);
      flex-shrink: 0;
      transition: color var(--md-sys-motion-default-effects);
    }

    /* Always a translucent wash — the level should tint the card, not bury it. */
    .level-fill {
      fill: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 30%, transparent);
      transition: d var(--md-sys-motion-default-effects);
    }

    /* Ambient "working" rotation — the small corner glyph carries a livelier
       pace than the old full-size star did (one lobe-step ≈ 5.6s). */
    .spin {
      transform-box: fill-box;
      transform-origin: center;
      animation: ms-spin 45s linear infinite;
    }

    @keyframes ms-spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Liquid drift: slide by exactly one wave period (50 units) to loop.
       Slow enough to read as water settling, not a marquee. */
    .level-fill.drift {
      animation: ms-drift 7s linear infinite;
    }

    @keyframes ms-drift {
      to {
        transform: translateX(50px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .spin,
      .level-fill.drift {
        animation: none;
      }
    }

    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1cqi;
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      text-align: center;
      max-width: 78%;
    }

    /* Binary: state word + a corner star glyph (precip-glyph pattern) —
       muted at rest, colored and slowly turning while active. */
    .binary-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .binary-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .binary-star {
      width: clamp(36px, 17cqi, 52px);
      height: clamp(36px, 17cqi, 52px);
      flex-shrink: 0;
    }

    .binary-star path {
      fill: color-mix(in srgb, currentColor 14%, transparent);
      transition: fill var(--md-sys-motion-default-effects);
    }

    .rect-tile.binary.active .binary-star path {
      fill: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 55%, transparent);
    }

    /* Active: the whole tile takes a translucent wash of the accent (same
       convention as the percent tile's fill), not just the corner glyph.
       Defaults to the "device" custom color — the same family materia-card
       already uses for switch/fan/input_boolean/vacuum active states —
       falling back to primary if custom colors aren't configured. */
    .rect-tile.binary.active {
      background: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 30%, var(--ms-color, var(--ha-card-background, var(--card-background-color))));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .big {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(28px, 24cqi, 52px);
      font-weight: 700;
      /* 1.05 clipped the tops of tall digits on this bold display font — the
         line box computed from font-size × line-height came in shorter than
         the glyph's actual ink extent. Padding is the belt to line-height's
         suspenders: guarantees headroom regardless of how the browser
         computes this variable font's line box. */
      line-height: 1.3;
      padding-top: 0.08em;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .big.small-big {
      font-size: clamp(18px, 11cqi, 30px);
      line-height: 1.2;
    }

    .big .unit {
      font-size: 0.42em;
      font-weight: 600;
      opacity: 0.85;
    }

    .sub {
      font-size: clamp(12px, 5.5cqi, 15px);
      font-weight: 500;
      opacity: 0.85;
    }

    .sub.hint {
      opacity: 0.6;
      max-width: 85%;
      line-height: 1.4;
    }

    /* ---- rect tiles (temperature / power / energy / plain) ---- */
    .rect-tile {
      container-type: inline-size;
      position: relative;
      background: var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      border-radius: 28px;
      padding: clamp(12px, 7cqi, 20px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(6px, 4cqi, 14px);
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      aspect-ratio: 1;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
      max-width: var(--ms-size, 200px);
      margin-inline: auto;
      width: 100%;
    }

    .rect-tile.clip {
      overflow: hidden;
    }

    .fill-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .rect-tile .overlay {
      max-width: 100%;
    }

    .rect-tile.left {
      align-items: flex-start;
      text-align: left;
      justify-content: space-between;
    }

    /* Vacuum: name (header) top, state right below it (same position as the
       binary variant's state word), room at the bottom, battery bar on the
       right. Same square canvas as every other variant. */
    .rect-tile.vacuum {
      align-items: flex-start;
      text-align: left;
    }

    .rect-tile.vacuum .header {
      justify-content: flex-start;
    }

    /* Defaults to the "device" custom color — vacuums get device colors
       while cleaning in materia-card too — falling back to primary. */
    .rect-tile.vacuum.active {
      background: color-mix(in srgb, var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4))) 22%, var(--ms-color, var(--ha-card-background, var(--card-background-color))));
    }

    .rect-tile.vacuum.active .header ha-icon {
      color: var(--ms-accent, var(--md-sys-cust-color-device, var(--md-sys-color-primary, #6750a4)));
    }

    .vacuum-row {
      flex: 1;
      display: flex;
      gap: 10px;
      min-height: 0;
      width: 100%;
    }

    .vacuum-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Sits at its natural flow position right after the header — same
       vertical position as the binary variant's state word — not centered
       in the remaining space. */
    .vacuum-state {
      min-height: 0;
    }

    .rect-tile.left .header {
      justify-content: flex-start;
    }

    .split-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 10px;
      flex: 1;
      min-height: 0;
    }

    .split-main {
      display: flex;
      flex-direction: column;
      gap: 4px;
      justify-content: flex-end;
    }

    /* Thermometer: a quiet vertical pill track; the fill height and color ARE
       the reading. */
    .thermo {
      position: relative;
      width: clamp(12px, 7cqi, 18px);
      height: 82%;
      min-height: 46px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      overflow: hidden;
      flex-shrink: 0;
      align-self: center;
    }

    .thermo i {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 999px;
      transition: height var(--md-sys-motion-expressive-default-spatial), background-color var(--md-sys-motion-default-effects);
    }

    /* Power: ascending equalizer bars, lit count = load. */
    .bars {
      display: flex;
      align-items: flex-end;
      gap: clamp(3px, 1.6cqi, 5px);
      height: clamp(38px, 20cqi, 58px);
      flex-shrink: 0;
    }

    .bars i {
      width: clamp(7px, 3.6cqi, 11px);
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 12%, transparent);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .bars i.lit {
      background: var(--ms-accent, var(--md-sys-color-primary, #6750a4));
    }

    .energy-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      width: 100%;
      gap: 8px;
    }

    .energy-bottom .sub {
      max-width: 62%;
      line-height: 1.35;
    }

    .energy-bottom .glyph {
      --mdc-icon-size: clamp(30px, 14cqi, 44px);
      color: color-mix(in srgb, var(--ms-accent, var(--md-sys-color-primary, #6750a4)) 45%, transparent);
    }

    /* ================= the gauge family (19a) ==============================

       TYPOGRAPHY. Every size below is an M3 type-scale step used as the
       clamp's MAXIMUM, with a cqi term under it. The step is the design; the
       clamp is what lets one tile read at 6 grid columns and at 12 without
       two stylesheets. Steps used:
         display-small   36sp / 400 / 44sp
         headline-large  32sp / 400 / 40sp
         headline-medium 28sp / 400 / 36sp
         headline-small  24sp / 400 / 32sp
         title-small     14sp / 500 / 20sp / +0.1px
         label-medium    12sp / 500 / 16sp / +0.5px
         body-small      12sp / 400 / 16sp / +0.4px

       These deliberately do NOT touch .big / .sub, which the older variants
       share and which are tuned around that display font's ink extent.

       SHAPE. Radii are shape-scale tokens, not the concept's literal pixels:
       extra-large 28dp for tiles and the status row, full for tracks, bars,
       dots and the icon badge.

       COLOUR. Gauge accent is passed in as --g-accent (primary, or the
       battery ramp); every track is secondary-container. */

    .gauge-value {
      font-family: var(--materia-font-display, inherit);
      font-weight: 400;
      line-height: 1.22;
      letter-spacing: 0;
      font-variant-numeric: tabular-nums;
      /* Same headroom guard the .big rule documents: this display font's ink
         runs taller than its computed line box. */
      padding-top: 0.06em;
    }

    /* display-small 36sp */
    .gauge-value.v-display {
      font-size: clamp(24px, 19cqi, 36px);
    }

    /* headline-large 32sp */
    .gauge-value.v-headline {
      font-size: clamp(21px, 16cqi, 32px);
    }

    /* headline-medium 28sp */
    .gauge-value.v-headline-sm {
      font-size: clamp(18px, 13cqi, 28px);
    }

    /* label-medium 12sp, riding the value's baseline */
    .gauge-value .gauge-unit {
      font-size: clamp(10px, 5cqi, 12px);
      font-weight: 500;
      letter-spacing: 0.5px;
      opacity: 0.75;
      margin-left: 0.2em;
    }

    /* body-small 12sp */
    .gauge-caption {
      font-size: clamp(10px, 5cqi, 12px);
      font-weight: 400;
      line-height: 1.33;
      letter-spacing: 0.4px;
      opacity: 0.7;
    }

    .rect-tile.gauge {
      justify-content: space-between;
    }

    .gauge-main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: clamp(4px, 2.5cqi, 8px);
      width: 100%;
      min-width: 0;
    }

    /* ---- fill: the flood carries its own edge line ---------------------- */

    .flood {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      /* The bright 3dp line IS the flood's trailing edge, so the boundary can
         never drift from the value by a rounding error in a second element. */
      box-shadow: inset -3px 0 0 0 var(--g-accent);
      background: color-mix(in srgb, var(--g-accent) 22%, transparent);
      transition: width var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects);
    }

    /* Sits above the flood so the number is never washed out by it. */
    .gauge-body {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      width: 100%;
      gap: clamp(6px, 4cqi, 14px);
    }

    /* ---- bar: a 6dp track under the value ------------------------------- */

    .track {
      position: relative;
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
      overflow: hidden;
    }

    .track i {
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      border-radius: 999px;
      background: var(--g-accent);
      transition: width var(--md-sys-motion-expressive-default-spatial);
    }

    /* ---- ladder: N bars, ramping 32% -> 100% ---------------------------- */

    /* A band ACROSS the card, 52dp at full size, with the value line beneath
       it — see the note in _ladder. It was a 55%-wide right-hand column,
       which read as a cluster tucked bottom-right. */
    .ladder {
      display: flex;
      align-items: flex-end;
      /* space-between rather than a fixed gap: with the cap below, five bars
         would otherwise bunch at the left of a full-width row. The gap is the
         floor and this distributes whatever is left over. */
      justify-content: space-between;
      gap: clamp(1.5px, 1.6cqi, 5px);
      height: clamp(36px, 26cqi, 52px);
      width: 100%;
      flex-shrink: 0;
    }

    .ladder i {
      flex: 1 1 auto;
      min-width: 2px;
      /* Raised from 11px now that the row is full width: at five bars an 11px
         cap left them huddled in the first third. 24dp keeps sixteen bars at
         their natural ~11dp while letting five spread across the card. */
      max-width: 24px;
      border-radius: 999px;
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .ladder i.lit {
      background: var(--g-accent);
    }

    /* ---- ring: progress beside the value, never behind it --------------- */

    .ring {
      width: clamp(40px, 22cqi, 60px);
      height: clamp(40px, 22cqi, 60px);
      flex-shrink: 0;
      align-self: center;
      /* Start the arc at twelve o'clock — a circle's path begins at 3. */
      transform: rotate(-90deg);
    }

    .ring circle {
      fill: none;
      stroke-width: 6;
    }

    .ring-track {
      stroke: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
    }

    .ring-arc {
      stroke: var(--g-accent);
      stroke-linecap: round;
      transition: stroke-dasharray var(--md-sys-motion-expressive-default-spatial);
    }

    /* ---- status: a tonal row ------------------------------------------- */

    .status-row {
      container-type: inline-size;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: clamp(10px, 3cqi, 16px);
      /* extra-large 28dp */
      border-radius: 28px;
      padding: clamp(12px, 3cqi, 18px) clamp(14px, 3.5cqi, 20px);
      background: var(--ms-color, var(--md-sys-color-surface-container-high, var(--ha-card-background, var(--card-background-color))));
      color: var(--ms-color-on, var(--md-sys-color-on-surface, var(--primary-text-color)));
      max-width: var(--ms-size-row, none);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* Tonal while active — the concept's teal row, taken as a ROLE pair. */
    .status-row.active {
      background: var(--ms-color, var(--md-sys-color-primary-container, #d7e3ff));
      color: var(--ms-color-on, var(--md-sys-color-on-primary-container, #001b3f));
    }

    .status-badge {
      flex: none;
      width: clamp(38px, 9cqi, 48px);
      height: clamp(38px, 9cqi, 48px);
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, currentColor 12%, transparent);
    }

    .status-badge ha-icon {
      --mdc-icon-size: clamp(20px, 5cqi, 26px);
    }

    .status-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* headline-small 24sp */
    .status-state {
      font-family: var(--materia-font-display, inherit);
      font-size: clamp(17px, 4.4cqi, 24px);
      font-weight: 400;
      line-height: 1.33;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* body-small 12sp */
    .status-sub {
      font-size: clamp(11px, 2.6cqi, 12px);
      font-weight: 400;
      line-height: 1.33;
      letter-spacing: 0.4px;
      opacity: 0.72;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .status-dots {
      flex: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .status-dots i {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor 20%, transparent);
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .status-dots i.on {
      background: currentColor;
    }

    /* No number to show progress against: the dots travel instead, which is
       an activity indicator rather than a false reading. */
    .status-dots.pulse i {
      animation: ms-dots 1.4s ease-in-out infinite;
      animation-delay: calc(var(--i) * 0.16s);
    }

    @keyframes ms-dots {
      0%,
      100% {
        opacity: 0.35;
      }
      50% {
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .status-dots.pulse i {
        animation: none;
      }
    }

    /* ================= the history family (19b) ============================

       Geometry is the concept's, verbatim; colour is tokens. The alphas (14%
       area, 32% past bar, 18% idle stub) are GRAMMAR — a tonal wash of the
       accent — so they survive the swap from the doc's hexes to
       --md-sys-color-* intact.

       Card heights are NOT the concept's fixed 172 / 148 / 118px. A fixed
       height reserves room for a chart that an empty recorder never sends, and
       an empty reservation is exactly the hole the brief said to avoid. These
       are min-heights, so the tile is as tall as it has content for. */

    /* .rect-tile.left carries justify-content: space-between, which is two
       classes and therefore outranked a bare .spark-tile — the value and the
       delta pill were pushed to the bottom of the tile and landed ON TOP of
       the bled chart. Three classes to win it back: this stack reads
       header -> value -> caption from the top, with the chart underneath. */
    .rect-tile.left.spark-tile {
      /* The hero is a landscape card, not one of the squares. */
      aspect-ratio: auto;
      justify-content: flex-start;
      gap: clamp(4px, 2.5cqi, 10px);
    }

    /* The AREA hero fills its column, like the two other row-shaped
       presentations and unlike the squares — a 200px cap on a landscape card
       hinted at twelve columns just wastes the row. The square rule the rest
       of the card follows is untouched: the bare-line variant is one of the
       2-up tiles and stays capped. */
    .rect-tile.left.spark-tile.spark-bleed {
      max-width: var(--ms-size-row, none);
    }

    /* THE HEIGHTS ARE CONDITIONAL, and that is the point. The concept's 148 /
       172px assume a chart is there; applying them unconditionally left a
       no-history tile 172px tall with 76px of nothing in it — a reserved hole
       for a chart that is never coming, which is precisely what an empty
       recorder must not produce. So the room is only claimed once there is
       something to put in it. */
    .spark-tile.has-spark {
      min-height: 148px;
    }

    /* The area spark bleeds to the bottom edge, so the tile clips and the
       padding stops short there — the concept's 18px 20px 0. Also conditional:
       with no chart there is nothing to bleed and no reason to drop the
       tile's bottom padding. */
    .spark-tile.spark-bleed.has-spark {
      overflow: hidden;
      padding-bottom: 0;
      min-height: 172px;
    }

    /* Shared by every variant that leads with a number and may carry a pill.
       flex-end rather than baseline: the pill is a fixed-height box, and
       baseline-aligning it against a 36sp numeral hangs it off the digits'
       baseline instead of sitting it on their optical bottom. */
    .value-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
      width: 100%;
      min-width: 0;
    }

    .spark {
      display: block;
      width: 100%;
      overflow: visible;
    }

    /* Absolutely placed and stretched, which is what lets a 340x60 viewBox
       meet the card's real width at any column count. */
    .spark-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 76px;
      pointer-events: none;
    }

    .spark-line {
      height: 26px;
    }

    .spark-fill {
      fill: color-mix(in srgb, var(--g-accent) 14%, transparent);
      stroke: none;
    }

    .spark-stroke {
      fill: none;
      stroke: var(--g-accent);
      stroke-linecap: round;
      stroke-linejoin: round;
      /* The viewBox is stretched non-uniformly, so a plain stroke-width would
         be stretched with it — this keeps 2.5dp meaning 2.5dp. */
      vector-effect: non-scaling-stroke;
      stroke-width: 2.5;
    }

    .spark-line .spark-stroke {
      stroke-width: 2;
    }

    /* ---- the delta pill ------------------------------------------------
       THE CONTAINER PAIR, not an accent role at partial alpha. M3 has two
       different mechanisms and they are not interchangeable: a *-container /
       on-*-container pair is a filled surface guaranteed to be a legible
       pair, while a percentage of an accent over whatever is behind it is a
       STATE LAYER. Using the second as the first is how this shipped as a
       flat grey pill with barely-legible text on a harmonised theme — the
       hand-mixed alpha has no contrast guarantee, and my reasoning that "the
       text and its wash are the same hue" only holds if the wash lands on a
       surface that happens to cooperate. Every other filled surface in this
       library (status-row.active, the lock, the alarm) uses the pair. */
    .delta-pill {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 30px;
      padding: 0 12px;
      /* Half of 30: the concept's 15px is corner-full for this height. */
      border-radius: 15px;
      background: var(--md-sys-color-tertiary-container, #ffd8e4);
      color: var(--md-sys-color-on-tertiary-container, #31111d);
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
    }

    .delta-pill ha-icon {
      --mdc-icon-size: 17px;
    }

    /* ---- scale: a ramp, the value on it, and reference marks ------------
       Geometry is the concept's. The marker OFFSETS are not: it centres each
       mark by subtracting half its own width in px (-2px on a 5px mark, -1px
       on a 2px one), which only stays centred while the widths never change.
       translateX(-50%) says the same thing about the mark rather than about
       one arithmetic result, so it survives a restyle — the same reason the
       level card's value column is measured rather than counted. */

    .ramp {
      position: relative;
      width: 100%;
      height: 12px;
      border-radius: 6px;
      /* The neutral track when the author has named no direction and no stops:
         position without judgement. */
      background: var(--md-sys-color-secondary-container, color-mix(in srgb, currentColor 12%, transparent));
    }

    /* The value. Taller than the ramp and overhanging it top and bottom, so it
       reads as a position ON the scale rather than a segment of it. */
    .ramp .here {
      position: absolute;
      top: -5px;
      width: 5px;
      height: 22px;
      border-radius: 3px;
      transform: translateX(-50%);
      background: var(--md-sys-color-on-surface, var(--primary-text-color));
      box-shadow: 0 0 0 2px var(--ms-color, var(--ha-card-background, var(--card-background-color)));
      transition: left var(--md-sys-motion-expressive-default-spatial);
    }

    /* A reference mark: quieter than the value, and translucent so a ramp
       colour still reads through it. */
    .ramp .ref {
      position: absolute;
      top: -3px;
      width: 2px;
      height: 18px;
      border-radius: 1px;
      transform: translateX(-50%);
      background: color-mix(
        in srgb,
        var(--ref-color, var(--md-sys-color-on-surface, currentColor)) 45%,
        transparent
      );
    }

    .scale-labels {
      position: relative;
      height: 16px;
      width: 100%;
      /* body-small territory; the concept's 11.5px is not a step, and
         label-small is 11sp. */
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: 0.5px;
      opacity: 0.7;
    }

    .scale-labels .lo {
      position: absolute;
      left: 0;
    }

    .scale-labels .hi {
      position: absolute;
      right: 0;
    }

    /* Centred under its mark by the same mechanism, not by guessing at half a
       label's width. */
    .scale-labels .ref-label {
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
    }

    .rect-tile.scale-tile {
      aspect-ratio: auto;
      justify-content: flex-start;
      /* The concept's 16px value-row-to-ramp and 8px ramp-to-labels. A single
         flex gap cannot be two values, so the ramp carries the difference. */
      gap: 8px;
    }

    .rect-tile.scale-tile .ramp {
      margin-top: 8px;
    }

    /* A landscape card, so it fills its column rather than sitting in the
       squares' 200px cap — the same escape the area spark uses. This is not
       cosmetic: at 200px the concept's OWN labels collide ("zuinig 13" runs
       into "gem. 15,6", because a reference at 29% of 180px lands at 52px and
       the left label is about 50px wide). At the width the concept draws it
       they clear each other comfortably. */
    .rect-tile.left.scale-tile {
      max-width: var(--ms-size-row, none);
    }

    /* Narrow enough and they collide anyway, so the reference labels drop to
       their own line rather than overprinting the bounds. Costs 16dp, and only
       where it is needed — the bounds define the scale and the references are
       the point of the variant, so neither can simply be dropped. */
    @container (max-width: 320px) {
      .scale-labels {
        height: 32px;
      }

      .scale-labels .ref-label {
        top: 16px;
      }
    }

    /* ---- week bars ------------------------------------------------------ */
    .weekbars {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 34px;
      width: 100%;
    }

    .weekbars i {
      flex: 1;
      min-width: 0;
      /* Capped so a short window does not turn seven ticks' worth of language
         into two slabs: at the concept's seven buckets these land near 40px
         anyway, and with two buckets they stay bars rather than blocks. */
      max-width: 48px;
      border-radius: 3px 3px 2px 2px;
      background: color-mix(in srgb, var(--g-accent) 32%, transparent);
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    .weekbars i.current {
      background: var(--g-accent);
    }

    /* ---- event ticks ---------------------------------------------------- */
    .ticks {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 32px;
      width: 100%;
    }

    .ticks i {
      flex: 1;
      min-width: 0;
      /* Same reason as the week bars, tighter because a tick is a tick: the
         concept's fourteen sit near 20px wide. */
      max-width: 20px;
      border-radius: 2px;
      background: var(--g-accent);
      transition: height var(--md-sys-motion-expressive-default-spatial);
    }

    /* A day that happened and did nothing, as against a day with no data at
       all — which is not drawn. */
    .ticks i.stub {
      background: color-mix(in srgb, var(--g-accent) 18%, transparent);
    }

    /* A bucket row is bottom-aligned inside a fixed-height box, so a short bar
       leaves its air ABOVE it and none below: the flex gap is the only
       clearance, and a hard full-width edge lands straight on the caption.
       bar does not need this because its 6dp track fills its own box, so the
       space reads on both sides of it.

       The added value is .gauge-main's own gap again, doubling the clearance to
       the 16dp the concept puts between a value row and a chart — its number
       for "a chart needs room", as against the 8dp it uses for a chart's own
       labels. Adjacent-sibling, so an uncaptioned tile gains no dead space.

       WEEKBARS ONLY, and that is a measured decision rather than a guess. The
       four captioned charts sat at: bar 4px, weekbars 4px, sparkline 10px,
       events 10px. bar is the one that reads correctly at 4px because its
       track fills its box; weekbars at the same 4px is the one that reads
       cramped. The sparkline and the tonal event row were already at 10px —
       two and a half times bar's clearance — so neither needed touching, and
       widening them would have been fixing a number nobody was looking at. */
    .weekbars + .gauge-caption {
      margin-top: clamp(4px, 2.5cqi, 8px);
    }

    /* ---- the tonal session row ------------------------------------------ */
    .event-row {
      container-type: inline-size;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 10px;
      /* extra-large 28dp */
      border-radius: 28px;
      padding: clamp(14px, 3.5cqi, 20px);
      background: var(--ms-color, var(--md-sys-color-primary-container, #d7e3ff));
      color: var(--ms-color-on, var(--md-sys-color-on-primary-container, #001b3f));
      max-width: var(--ms-size-row, none);
    }

    /* M3 title-small 14sp */
    .event-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.1px;
      opacity: 0.9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `,
];
