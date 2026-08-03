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
    max-width: var(--wt-size, none);
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
       per-config; scale keeps the rotated stadium inside its cell — 0.86
       instead of 0.8 so the temperature and icon get breathing room. */
    transform: rotate(var(--wt-tilt, -26deg)) scale(0.86);
  }

  /* THE LAYOUT, and why it isn't corner-anchored.

     The pill is a STADIUM rotated ~45deg, so its long axis runs diagonally
     across the screen and its bounding-box corners fall OUTSIDE the visible
     shape entirely (border-radius 9999px eats them). Anchoring content to
     those corners — which every previous version did, via top/right/bottom/
     left percentages — therefore needs an inset guess to pull it back inside
     the curve, and that guess is a % of the box's HEIGHT while every size
     here (icon, font) is in cqi, a % of its WIDTH. Two different reference
     lengths feeding one position: correct only at the exact aspect ratio it
     was eyeballed against, drifting at every other. Four separate patches
     re-guessed those insets; each one drifted again.

     Instead: both children are pinned to the pill's CENTRE and pushed apart
     ALONG THE PILL'S OWN AXES, symmetrically, in cqi only. --wt-spread is
     one number in one unit, the offsets are mirror images, and the result is
     independent of aspect ratio, height, icon size and text size.

     The box's +x axis points up-right on screen under the default -45deg
     tilt and its +y axis points down-right, so an offset of (+S, -S) sums to
     straight UP and (-S, +S) to straight DOWN — the readout sits above
     centre, the glyph below it, both horizontally centred, on any tilt.
     .flip mirrors the tilt, which mirrors +x; mirroring the x term back
     keeps the pair stacked vertically rather than swinging horizontal. */
  .readout,
  .wx,
  .wx-mono {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  /* Rotation is the RIGHTMOST function so it applies to the element alone,
     about its own centre, leaving the translations in the box's coordinate
     space — reverse the order and the offset direction rotates too, sending
     both children off along the screen axes instead of the pill's. */
  .readout {
    z-index: 0; /* icon draws in front of the temperature */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5cqi;
    transform: translate(-50%, -50%)
      translate(var(--wt-spread, 18cqi), calc(-1 * var(--wt-spread, 18cqi)))
      rotate(calc(-1 * var(--wt-tilt, -26deg)));
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

  .wx,
  .wx-mono {
    z-index: 1;
    transform: translate(-50%, -50%)
      translate(calc(-1 * var(--wt-spread, 18cqi)), var(--wt-spread, 18cqi))
      rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .wx {
    width: var(--wt-icon-size, 27cqi);
    height: var(--wt-icon-size, 27cqi);
  }

  .wx-mono {
    --mdc-icon-size: var(--wt-icon-size, 27cqi);
    display: flex;
  }

  /* Mirrored tilt: the x term flips back so the pair stays stacked (see the
     axis note above), which also swaps which diagonal they travel. */
  .blob.flip .readout {
    transform: translate(-50%, -50%)
      translate(calc(-1 * var(--wt-spread, 18cqi)), calc(-1 * var(--wt-spread, 18cqi)))
      rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .blob.flip .wx,
  .blob.flip .wx-mono {
    transform: translate(-50%, -50%)
      translate(var(--wt-spread, 18cqi), var(--wt-spread, 18cqi))
      rotate(calc(-1 * var(--wt-tilt, -26deg)));
  }

  .blob.unavailable {
    opacity: 0.5;
    pointer-events: none;
  }
`];
