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

  /* THE TILT IS DECORATION, NOT LAYOUT — and everything else follows from it.

     Earlier versions rotated .blob itself, so the readout and glyph lived in
     a rotated space and each had to counter-rotate to stay upright. That
     made manual positioning nearly impossible to reason about: a
     counter-rotated box's BOUNDING box is far larger than its content (a
     50x37cqi readout turned 45deg occupies ~62cqi square) so it clipped
     against the pill's curve, and the anchors mixed % of HEIGHT with cqi
     sizes (% of WIDTH), which agree at exactly one aspect ratio.

     Now the pill is a ::before layer carrying the rotation alone, and the
     content is upright and unrotated. That is what makes the offsets below
     honest: they are plain screen-space nudges from the tile's centre, in
     one unit (cqi = 1% of tile width), so "move it 10 right" moves it 10
     right — no rotation to fight, no clipping, no aspect-ratio drift. */
  .blob {
    position: relative;
    width: var(--wt-width, 100%);
    max-width: var(--wt-size, none);
    /* Centred with left+translate rather than margin:0 auto, because auto
       margins FLOOR AT ZERO: the moment the box is wider than its parent they
       give up silently and the box goes flush-left, dumping every bit of
       overflow on the right edge. That is exactly what pushed the pill out of
       its card at the old 115% width — it was never centred at all, it just
       looked centred while it happened to fit. This construction stays
       centred at any width. */
    left: 50%;
    transform: translateX(-50%);
    aspect-ratio: 1 / var(--wt-ratio, 0.64);
    box-sizing: border-box;
    container-type: inline-size;
    cursor: pointer;
    color: var(--wt-fg, var(--md-sys-color-primary, var(--primary-text-color)));
    /* NO overflow:hidden — the pill deliberately spills past this box (it is
       rotated), and content is positioned by hand, so clipping here would
       silently eat whatever gets placed near an edge. */
  }

  /* The pill: an M3 stadium (flat sides, fully rounded ends — not an
     ellipse; the large radius clamps to half the shorter side), tilted
     diagonally Pixel-widget style. Defaults to the SAME surface as the clock
     face so the two read as a set. */
  .blob::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: var(--wt-bg, var(--md-sys-color-surface-container-high, var(--card-background-color)));
    transform: rotate(var(--wt-tilt, -26deg)) scale(var(--wt-pill-scale, 0.86));
    z-index: 0;
  }

  /* Both pieces are pinned to the tile's centre and then nudged by their own
     x/y. Centre-anchored rather than edge-anchored on purpose: an offset of 0
     means "dead centre" regardless of how big the piece is, so changing a
     font or icon size does not also move it. */
  .readout,
  .wx,
  .wx-mono {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
  }

  .readout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5cqi;
    transform: translate(-50%, -50%)
      translate(var(--wt-temp-x, 0cqi), var(--wt-temp-y, -18cqi));
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
    font-size: var(--wt-minmax-size, 5.5cqi);
    font-weight: 600;
    color: var(--wt-minmax, currentColor);
    opacity: var(--wt-minmax-opacity, 0.75);
  }

  .wx,
  .wx-mono {
    transform: translate(-50%, -50%)
      translate(var(--wt-icon-x, 0cqi), var(--wt-icon-y, 18cqi));
  }

  .wx {
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
  }

  .wx-mono {
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
