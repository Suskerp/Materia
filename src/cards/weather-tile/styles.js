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

  /* THE TILT IS DECORATION, NOT LAYOUT — and that is the whole fix.

     Every earlier version rotated .blob itself, which meant the readout and
     the glyph lived in a rotated coordinate space and each had to
     counter-rotate to stay upright. Two things go wrong with that, and both
     bit repeatedly:

       1. A counter-rotated box's BOUNDING box is much larger than its
          content — a 50x37cqi readout turned 45deg occupies ~62cqi square —
          so its corners punch outside the stadium's curve and get clipped,
          however carefully the anchor is placed.
       2. Anchoring inside that space needs top/bottom percentages (a % of
          HEIGHT) mixed with cqi sizes (a % of WIDTH). Those two agree at
          exactly one aspect ratio and drift at every other, which is why
          five straight attempts at re-tuning the numbers each drifted again.

     So the pill is now a ::before layer that carries the rotation alone. The
     content sits in a plain, upright, centred flex column — no rotation, no
     counter-rotation, no anchor percentages, nothing to clip against. It is
     correct at any aspect ratio, width, icon size or text size because
     there is no longer any geometry to get wrong. */
  .blob {
    position: relative;
    width: var(--wt-width, 100%);
    max-width: var(--wt-size, none);
    margin: 0 auto;
    aspect-ratio: 1 / var(--wt-ratio, 0.64);
    box-sizing: border-box;
    container-type: inline-size;
    cursor: pointer;
    color: var(--wt-fg, var(--md-sys-color-primary, var(--primary-text-color)));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wt-gap, 4cqi);
    /* NO overflow:hidden. The pill deliberately spills past this box (it is
       rotated), and the content is centred well inside the shape, so there
       is nothing to clip — clipping here is what cut the min/max row's
       arrow off at the curve. */
  }

  /* The pill itself: an M3 stadium (flat sides, fully rounded ends — not an
     ellipse; the large radius clamps to half the shorter side), tilted
     diagonally Pixel-widget style. scale keeps the rotated shape from
     spilling too far into neighbouring cards. Defaults to the SAME surface
     as the clock face so the two read as a set. */
  .blob::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    transform: rotate(var(--wt-tilt, -26deg)) scale(0.86);
    z-index: 0;
  }

  /* Content stacks above the pill in DOM order: min/max, temperature, glyph.
     position:relative only so z-index applies. */
  .readout {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5cqi;
  }

  .temp {
    font-size: var(--wt-temp-size, 24cqi);
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
    position: relative;
    z-index: 1;
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
    flex-shrink: 0;
  }

  .wx-mono {
    position: relative;
    z-index: 1;
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
    flex-shrink: 0;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
