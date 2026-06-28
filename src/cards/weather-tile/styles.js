import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";

export const styles = [hostStyles, haCardReset, css`
  ha-card {
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
  }

  .blob {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 0.82;
    box-sizing: border-box;
    container-type: inline-size;
    overflow: hidden;
    cursor: pointer;
    /* Defaults to the SAME surface as the clock face so the two read as a set. */
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    color: var(--wt-fg, var(--md-sys-color-on-surface, var(--primary-text-color)));
    /* Organic Material You "pebble" blob. */
    border-radius: 47% 53% 45% 55% / 60% 56% 44% 40%;
  }

  .readout {
    position: absolute;
    top: 15%;
    right: 12%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5cqi;
  }

  .temp {
    font-size: 26cqi;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .minmax {
    display: flex;
    gap: 4cqi;
    font-size: 7cqi;
    font-weight: 600;
    opacity: 0.75;
  }

  .wx {
    position: absolute;
    left: 11%;
    bottom: 11%;
    width: 30cqi;
    height: 30cqi;
  }

  .wx-mono {
    position: absolute;
    left: 11%;
    bottom: 11%;
    --mdc-icon-size: 30cqi;
    display: flex;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
