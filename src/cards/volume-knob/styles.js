import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";

export const styles = [
  hostStyles,
  motionTokens,
  mediaTokens,
  css`
    ha-card.panel {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      border: none;
      border-radius: 28px;
      box-shadow: var(--ha-card-box-shadow, none);
      background: var(--ha-card-background, var(--mx-s1));
      color: var(--mx-on);
    }

    ha-card.panel.in-sheet {
      background: none;
      padding: 8px 4px 0;
    }

    .phead {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .phead h3 {
      margin: 0;
      flex: 1;
      font-size: 22px;
      line-height: 28px;
      font-weight: 400;
    }

    .linklabel {
      font-size: 14px;
      color: var(--mx-onv);
    }

    /* M3 switch (SwitchTokens: 52x32 track, 16 -> 24 thumb, check icon). */
    .switch {
      width: 52px;
      height: 32px;
      border-radius: 16px;
      background: var(--mx-s3);
      border: 2px solid var(--md-sys-color-outline, var(--mx-onv));
      position: relative;
      flex: none;
      box-sizing: border-box;
      transition:
        background-color var(--md-sys-motion-fast-effects),
        border-color var(--md-sys-motion-fast-effects);
    }

    .switch i {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--md-sys-color-outline, var(--mx-onv));
      display: grid;
      place-items: center;
      transition:
        left var(--md-sys-motion-expressive-fast-spatial),
        top var(--md-sys-motion-expressive-fast-spatial),
        width var(--md-sys-motion-expressive-fast-spatial),
        height var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .switch.on {
      background: var(--mx-p);
      border-color: var(--mx-p);
    }

    .switch.on i {
      top: 2px;
      left: 22px;
      width: 24px;
      height: 24px;
      background: var(--mx-op);
      color: var(--mx-p);
    }

    .switch ha-icon {
      --mdc-icon-size: 16px;
      opacity: 0;
    }

    .switch.on ha-icon {
      opacity: 1;
    }

    .readout {
      text-align: center;
      line-height: 1;
    }

    .readout b {
      font-family: var(--materia-font-display);
      font-size: 57px;
      font-weight: 400;
      font-variant-numeric: tabular-nums;
    }

    .dial {
      width: min(300px, 74vw, 100%);
      aspect-ratio: 1;
      align-self: center;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .dial svg {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
      outline: none;
      overflow: visible;
    }

    .dial svg.drag {
      cursor: grabbing;
    }

    .tick {
      stroke: var(--mx-ov);
      stroke-width: 2;
      stroke-linecap: round;
    }

    .tick.major {
      stroke-width: 3;
      stroke: var(--mx-onv);
      opacity: 0.7;
    }

    .tick.t-on {
      stroke: var(--mx-p);
      opacity: 1;
    }


    .trk,
    .lvl,

    .trk {
      stroke: var(--mx-s3);
    }

    .lvl {
      stroke: var(--mx-p);
    }


    .knob {
      fill: var(--mx-s2);
      stroke: var(--mx-ov);
      stroke-width: 2;
    }

    .dot {
      fill: var(--mx-p);
    }

    .knobshadow {
      fill: none;
      stroke: var(--mx-s3);
      stroke-width: 38;
    }

    .bigknob {
      fill: none;
      stroke: var(--mx-p);
      stroke-width: 30;
      transition: stroke var(--md-sys-motion-slow-effects);
    }

    .knurl {
      stroke: var(--mx-op);
      stroke-width: 1.5;
      stroke-linecap: round;
      opacity: 0.35;
    }

    .knurl.major {
      opacity: 0.6;
      stroke-width: 2;
    }

    .actual {
      fill: none;
      stroke: var(--mx-p);
      stroke-width: 3;
      stroke-linecap: round;
      transition: stroke-dasharray 0.35s ease-out, stroke var(--md-sys-motion-slow-effects);
    }


    #knobg {
      transform-origin: 150px 150px;
    }

    #knobg.settle {
      transition: transform 0.25s ease-out;
    }

    .limlabel {
      text-align: center;
      font-size: 13px;
      min-height: 0;
      color: var(--mx-err);
      margin-top: -8px;
    }

    .limlabel:empty {
      display: none;
    }

    .pfoot {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .pfoot .info {
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: var(--mx-onv);
    }

    .round {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: var(--mx-s3);
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .round.on {
      background: var(--mx-sc);
      color: var(--mx-osc);
      border-radius: 16px;
    }

    .pm {
      display: flex;
      gap: 4px;
    }

    .pm button {
      width: 64px;
      height: 56px;
      display: grid;
      place-items: center;
      background: var(--mx-sc);
      color: var(--mx-osc);
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial);
    }

    .pm button:first-child {
      border-radius: 28px 8px 8px 28px;
    }

    .pm button:last-child {
      border-radius: 8px 28px 28px 8px;
    }

    .pm button:active {
      border-radius: 16px;
    }

    .off .dial,
    .off .readout b {
      opacity: 0.4;
    }

    .close {
      width: 40px;
      height: 40px;
      border-radius: 20px;
      display: grid;
      place-items: center;
      flex: none;
      color: var(--mx-onv);
    }

.close.back {
      margin-inline-start: -8px;
      color: var(--mx-on);
    }

    /* ---- tap style: calm, finger-tap first (tablets) ---- */
    ha-card.panel.tap {
      gap: 18px;
      padding: 24px;
      border-radius: 32px;
      height: 100%;
      box-sizing: border-box;
    }

    ha-card.panel.tap.in-sheet {
      padding: 8px 4px 0;
    }

    /* In place of the player (a subview of the art scope's card): the scope
       already pads and draws the surface. */
    ha-card.panel.sub {
      padding: 0;
      border-radius: 0;
      background: none;
    }


    .linkchip {
      height: 40px;
      padding: 0 14px 0 10px;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid var(--mx-ov);
      border-radius: 10px;
      color: var(--mx-onv);
      flex: none;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        border-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .linkchip ha-icon {
      --mdc-icon-size: 20px;
    }

    .linkchip.on {
      border-radius: 20px;
      border-color: var(--mx-p);
      color: var(--mx-p);
    }

    .ztabs {
      display: flex;
      gap: 3px;
      height: 52px;
    }

    .ztabs button {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: var(--mx-s2);
      color: var(--mx-onv);
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    .ztabs button.first {
      border-radius: 26px 8px 8px 26px;
    }

    .ztabs button.last {
      border-radius: 8px 26px 26px 8px;
    }

    .ztabs button.on {
      border-radius: 26px;
      background: var(--mx-sc);
      color: var(--mx-osc);
    }

    .ztabs .zn {
      max-width: 100%;
      font-size: 13px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .ztabs .zv {
      font-size: 15px;
      font-variant-numeric: tabular-nums;
      opacity: 0.8;
    }

    .tbody {
      flex: 1;
      min-height: 160px;
      display: flex;
      gap: 24px;
      align-items: stretch;
      padding: 8px 0;
    }

    /* M3 Expressive slider, vertical: active track (bottom) | 6 px gap |
       4 px handle, a little wider than the track | 6 px gap | inactive track
       with a stop dot at its end. Outer corners round, inner corners 4 px.
       --p (0 … 1) is set from JS; the parts transition on its result. */
    .tbar {
      --p: 0;
      --gap: 6px;
      --hw: 4px;
      width: 64px;
      flex: none;
      position: relative;
      display: block;
      background: none;
      overflow: visible;
      touch-action: manipulation;
    }

    .tfill,
    .tin,
    .thandle {
      position: absolute;
      transition:
        height 0.18s ease-out,
        bottom 0.18s ease-out;
    }

    .tfill {
      left: 0;
      right: 0;
      bottom: 0;
      height: max(0px, calc(var(--p) * 100% - var(--gap) - var(--hw) / 2));
      border-radius: 4px 4px 22px 22px;
      background: var(--mx-p);
    }

    .tin {
      left: 0;
      right: 0;
      top: 0;
      bottom: min(100%, calc(var(--p) * 100% + var(--gap) + var(--hw) / 2));
      border-radius: 22px 22px 4px 4px;
      background: var(--mx-s3);
    }

    /* Stop indicator at the end of the inactive track. */
    .tin::after {
      content: "";
      position: absolute;
      top: 10px;
      left: 50%;
      width: 4px;
      height: 4px;
      margin-left: -2px;
      border-radius: 2px;
      background: var(--mx-p);
    }

    .thandle {
      left: -8px;
      right: -8px;
      height: var(--hw);
      bottom: calc(var(--p) * 100% - var(--hw) / 2);
      border-radius: 2px;
      background: var(--mx-p);
    }

    .muted .tfill,
    .muted .thandle {
      background: var(--md-sys-color-outline, var(--mx-onv));
    }


    /* zones_view: side — one column per zone under one header. */
    .tcols {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr));
      gap: 16px;
    }

    .tcols > materia-volume-knob {
      height: 100%;
      min-height: 0;
    }

    ha-card.panel.tap.col {
      height: 100%;
      padding: 0;
      gap: 12px;
      border-radius: 0;
      background: none;
    }

    .col .colhead {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 0;
    }

    .col .colhead .zn {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 500;
      color: var(--mx-onv);
    }

    .col .colhead .num {
      font-family: var(--materia-font-display);
      font-size: 40px;
      line-height: 44px;
      font-variant-numeric: tabular-nums;
    }

    .col .tbody {
      justify-content: center;
      min-height: 120px;
      padding: 8px 0;
    }

    .col .tbar {
      width: 56px;
    }

    .col .limlabel {
      text-align: center;
      font-size: 13px;
    }

    .col .limlabel:empty {
      display: none;
    }

    .col .tfoot {
      height: 56px;
      gap: 3px;
    }

    .col .tfoot .mute {
      width: 44px;
    }

    .treadout {
      flex: 1;
      min-width: 0;
      line-height: 1;
    }

    .treadout .num {
      font-family: var(--materia-font-display);
      font-size: 64px;
      font-weight: 400;
      font-variant-numeric: tabular-nums;
    }

    .treadout .limlabel {
      text-align: start;
      font-size: 15px;
      margin-top: 10px;
    }

    .tfoot {
      display: flex;
      gap: 4px;
      height: 64px;
    }

    .tfoot button {
      display: grid;
      place-items: center;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      transition:
        border-radius var(--md-sys-motion-expressive-fast-spatial),
        background-color var(--md-sys-motion-fast-effects);
    }

    .tfoot .step {
      flex: 1;
      background: var(--mx-sc);
      color: var(--mx-osc);
    }

    .tfoot .step.first {
      border-radius: 32px 10px 10px 32px;
    }

    .tfoot .step.last {
      border-radius: 10px 32px 32px 10px;
    }

    .tfoot .step:active {
      border-radius: 16px;
    }

    .tfoot .mute {
      width: 72px;
      border-radius: 10px;
      background: var(--mx-s3);
      color: var(--mx-on);
    }

    .tfoot .mute.on {
      border-radius: 20px;
      background: var(--mx-p);
      color: var(--mx-op);
    }
  `,
];
