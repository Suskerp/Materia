import { css } from "lit";
import { hostStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";
import { mediaTokens } from "../../styles/media-styles.js";

/* The chip is materia-volume-knob's link chip (.linkchip); variant: switch
   is its knob-style "Link zones" label and M3 switch. Both copied 1:1. */
export const styles = [
  hostStyles,
  motionTokens,
  mediaTokens,
  css`
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: none;
      color: var(--mx-on);
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
  `,
];
