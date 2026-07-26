import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card.poc {
      display: flex;
      flex-direction: column;
      gap: 8px; /* the ONE menu-style gap separating hero from the stack */
    }

    /* ---- connected stack: 2px seams, 8px inner corners, 24px outers ------- */
    .stack {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stack > .seg {
      background: var(--ha-card-background, var(--card-background-color));
      border-radius: 8px;
      padding: 10px 14px;
      box-sizing: border-box;
    }

    .stack > .seg:first-child {
      border-radius: 24px 24px 8px 8px;
    }

    .stack > .seg:last-child {
      border-radius: 8px 8px 24px 24px;
    }

    .stack > .seg:only-child {
      border-radius: 24px;
    }

    .seg materia-button-group {
      display: block;
    }

    /* ---- zone rows: the 3-state ladder ------------------------------------ */
    .zones {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 10px;
    }

    /* Expressive M3: states are container TONES, no strokes — outlines on top
       of fills read as the old outlined-card style. */
    .zone-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 16px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    /* calling for heat — highest emphasis: container fill + accent icon */
    .zone-row.calling {
      background: var(--md-sys-cust-color-climate-heat-container, var(--md-sys-color-primary-container));
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-on-primary-container));
      border-radius: 20px;
    }

    .zone-row.calling .z-icon {
      color: var(--md-sys-cust-color-climate-heat-accent, var(--md-sys-color-primary));
    }

    /* enabled + satisfied — a clear tonal step above the section */
    .zone-row.idle {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 7%, transparent);
    }

    /* off — the quietest tone, reduced ink */
    .zone-row.off {
      background: color-mix(in srgb, var(--md-sys-color-on-surface, #444) 3%, transparent);
      opacity: 0.7;
    }

    .z-icon {
      --mdc-icon-size: 22px;
      flex-shrink: 0;
    }

    .z-text {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .z-name {
      font-size: 14px;
      font-weight: 600;
    }

    .z-sub {
      font-size: 12px;
      opacity: 0.75;
    }

    /* M3 switch, per SwitchTokens.kt (scaled from the 52×32 spec track):
       unselected = surface-container-highest track + 2dp outline border +
       SMALL thumb in outline; selected = primary track + LARGER on-primary
       thumb; pressed grows further. All size, no shape morph — the growth on
       fast-spatial IS the expressive tactility. (Display only — the row
       handles the tap.) */
    .z-switch {
      width: 44px;
      height: 26px;
      border-radius: 999px;
      background: var(--md-sys-color-surface-container-highest, var(--md-sys-color-surface-variant, rgba(0, 0, 0, 0.15)));
      border: 2px solid var(--md-sys-color-outline, rgba(0, 0, 0, 0.35));
      position: relative;
      flex-shrink: 0;
      box-sizing: border-box;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .z-switch i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
      width: 13px; /* spec 16/32 of track height */
      height: 13px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, #888);
      transition:
        left var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    /* Selected = the spec pair (SwitchTokens: Primary/OnPrimary). The row's
       container tone already tells the heating story — coloring the switch
       too doubles the accent. */
    .z-switch.on {
      background: var(--md-sys-color-primary);
      border-color: transparent;
    }

    .z-switch.on i {
      left: 19px;
      width: 20px; /* spec 24/32 — the thumb GROWS when selected */
      height: 20px;
      background: var(--md-sys-color-on-primary, #fff);
    }

    /* Pressed: thumb swells toward the spec's 28/32 pressed size. */
    .zone-row:active .z-switch i {
      width: 22px;
      height: 22px;
    }

    .zone-row:active .z-switch:not(.on) i {
      left: 2px;
    }

    .zone-row:active .z-switch.on i {
      left: 16px;
    }

    /* ---- water heater row (accordion body) --------------------------------- */
    .water-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 10px 12px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .water-row ha-icon {
      --mdc-icon-size: 20px;
      opacity: 0.85;
    }

    .water-row .chev {
      opacity: 0.5;
    }

    materia-thermostat {
      display: block;
    }

    /* Water heater as a menu segment: the seg provides the group silhouette,
       the embedded materia-menu goes transparent inside it. NO extra padding —
       the trigger's own 18px inset already matches the accordion bars. */
    .stack > .seg.water-menu {
      padding: 0;
    }

    .seg.water-menu materia-menu {
      --ha-card-background: transparent;
      display: block;
    }

    /* reserve_height: the stack gets a JS-measured min-height (tallest
       section); the open section absorbs the reserved space. */
    .stack.reserve > .seg.acc-sec.open {
      flex: 1 0 auto;
    }

    /* ---- wallet accordion INSIDE the connected stack ------------------------
       The sections keep the group silhouette (2px seams, positional 8/24px
       corners from the .seg first/last rules). Wallet cues: closed bars are
       compact and slightly muted; the open one grows tall on the expressive
       spring and carries the full card tone. */
    .stack > .seg.acc-sec {
      padding: 0;
      overflow: hidden;
      background: color-mix(in srgb, var(--ha-card-background, var(--card-background-color)) 78%, var(--md-sys-color-surface, var(--ha-card-background)));
      transition: background-color var(--md-sys-motion-default-effects);
    }

    .stack > .seg.acc-sec.open {
      background: var(--ha-card-background, var(--card-background-color));
    }

    .acc-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* Open: the bar hands its bottom padding to the body so header and
       content sit on the group's seam rhythm, not a double gap. */
    .acc-sec.open .acc-bar {
      padding-bottom: 8px;
    }

    .acc-icon {
      --mdc-icon-size: 20px;
      opacity: 0.9;
      flex-shrink: 0;
    }

    .acc-title {
      font-size: 14px;
      font-weight: 600;
      flex: 1;
      transition: font-size var(--md-sys-motion-fast-effects);
    }

    .acc-sec.open .acc-title {
      font-size: 16px;
    }

    .acc-info {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.7;
      white-space: nowrap;
    }

    .acc-chev {
      --mdc-icon-size: 22px;
      opacity: 0.55;
      flex-shrink: 0;
    }

    .acc-body {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--md-sys-motion-expressive-default-spatial);
    }

    .acc-sec.open .acc-body {
      grid-template-rows: 1fr;
    }

    .acc-inner {
      overflow: hidden;
      min-height: 0;
    }

    /* Ladder inset: breathing room from the section edge; rows sit clearly
       INSIDE the open section rather than flush against its border. */
    .acc-inner .zones {
      padding: 0 12px 12px;
    }

    /* All off/on — right side of the OPEN bar, no orphan band. */
    .acc-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    .mini {
      border: 1.5px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.2));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 999px;
      cursor: pointer;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .mini:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .acc-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 12px 14px;
    }
  `,
];
