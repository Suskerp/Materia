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
    aspect-ratio: 1 / 0.66;
    box-sizing: border-box;
    container-type: inline-size;
    overflow: hidden;
    cursor: pointer;
    /* Defaults to the SAME surface as the clock face so the two read as a set. */
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    color: var(--wt-fg, var(--md-sys-color-primary, var(--primary-text-color)));
    /* M3 pill shape: stadium (flat top/bottom, fully rounded ends) — not an
       ellipse. The large radius clamps to half the shorter (height) side. */
    border-radius: 9999px;
  }

  .readout {
    position: absolute;
    top: 21%;
    right: 17%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.5cqi;
  }

  .temp {
    font-size: 24cqi;
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
    left: 15%;
    bottom: 16%;
    width: 27cqi;
    height: 27cqi;
  }

  .wx-mono {
    position: absolute;
    left: 15%;
    bottom: 16%;
    --mdc-icon-size: 27cqi;
    display: flex;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
