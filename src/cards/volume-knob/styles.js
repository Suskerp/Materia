import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";
import { volumePanelShell } from "../volume/styles.js";

/** The panel around materia-volume: heading, link switch / chip, zone tabs, side-by-side columns. */
export const styles = [
  hostStyles,
  motionTokens,
  mediaTokens,
  volumePanelShell,
  css`
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


    /* zones_view: side — one column per zone under one header. */
    .tcols {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr));
      gap: 16px;
    }

    /* column: true: the column's card fills this card, as it did before it was split out. */
    materia-volume {
      height: 100%;
    }

    .tcols > materia-volume {
      height: 100%;
      min-height: 0;
    }

  `,
];
