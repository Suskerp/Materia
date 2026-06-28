import { css } from "lit";
import { hostStyles, haCardReset } from "../../styles/card-styles.js";

export const styles = [hostStyles, haCardReset, css`
  ha-card {
    background: none;
    border: none;
    box-shadow: none;
    height: 100%;
    /* Let the tilted pill extend past the card box. */
    overflow: visible;
  }

  .blob {
    position: relative;
    width: var(--wt-width, 100%);
    margin: 0 auto;
    aspect-ratio: 1 / var(--wt-ratio, 0.64);
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
    /* Tilt the whole pill diagonally (Pixel-widget style). --wt-tilt is set
       per-config; scale keeps the rotated stadium inside its cell. */
    transform: rotate(var(--wt-tilt, -26deg)) scale(0.8);
  }

  /* Content counter-rotates so the temperature / icon stay upright. */
  .readout {
    position: absolute;
    top: 17%;
    right: 16%;
    z-index: 1; /* temperature sits in front of the icon */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5cqi;
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .temp {
    font-size: 24cqi;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .minmax {
    display: flex;
    gap: 3.5cqi;
    font-size: 5.5cqi;
    font-weight: 600;
    color: var(--wt-minmax, currentColor);
    opacity: var(--wt-minmax-opacity, 0.75);
  }

  .wx {
    position: absolute;
    left: 16%;
    bottom: 20%;
    z-index: 0;
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .wx-mono {
    position: absolute;
    left: 16%;
    bottom: 20%;
    z-index: 0;
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
    transform: rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  /* Positive tilt (top-left → bottom-right): mirror the layout so the
     temperature and icon follow the opposite diagonal. */
  .blob.flip .readout {
    right: auto;
    left: 16%;
    align-items: flex-start;
  }

  .blob.flip .wx,
  .blob.flip .wx-mono {
    left: auto;
    right: 15%;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
