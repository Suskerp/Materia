import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { motionTokens } from "../../utils/motion.js";

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Everything below scales off the card's own width, so the card works at
         4 columns and at 12 without a breakpoint. */
      container-type: inline-size;
    }

    /* The card IS the state. The design doc floods the whole page with primary
       when the door is open and drops it to near-black when locked; a custom
       card cannot repaint the dashboard, so the card surface carries it — which
       is what the same doc's home-card variant does anyway. */
    .body {
      position: relative;
      overflow: hidden;
      /* Same asymmetric expressive silhouette as materia-hero, so a hero
         stacked above this reads as the same family. */
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--ml-bg);
      color: var(--ml-fg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(16px, 5cqi, 26px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* ---- the morphing shape ---- */

    .shape-wrap {
      display: grid;
      place-items: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    /* 236px of a 412px frame in the design = 57cqi, clamped so it stays a
       recognisable shape in a narrow column and never dwarfs a wide one. */
    .shape {
      width: clamp(132px, 57cqi, 236px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      background: var(--ml-shape-bg);
      color: var(--ml-shape-fg);
      /* LOCKED: 30%. Two independent sources agree on that ratio — this repo's
         own M3 Expressive large-button square corner (28px on a 96px rung =
         29.2%, src/elements/button/styles.js) and the design doc's 72px on 236px
         = 30.5%. UNLOCKED: 50%, a circle.
         Expressed as a percentage, not px, so the morph tracks the container.
         The percentage also matters for correctness: a px radius at or above
         half the box renders identically to any larger value, so a px morph
         that overshoots its endpoint would sit visually still for most of its
         duration and then snap. */
      border-radius: 30%;
      /* The turn is what makes the change legible. A circle rotating is
         invisible; a cornered shape rotating is unmistakable, so the rotation
         and the corner change reveal each other. The angle is not a magic 45 —
         it is HALF each shape's rotational-symmetry period (see --ml-rot in
         index.js), which is the largest turn that still reads as movement
         before the silhouette repeats itself. */
      transform: rotate(0deg);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        transform var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .shape.unlocked {
      border-radius: 50%;
      transform: rotate(var(--ml-rot, 45deg));
    }

    /* A MaterialShapes silhouette replaces the CSS box: the container goes
       transparent and an SVG path carries the fill, so the shape can be one of
       the real catalogue entries rather than whatever border-radius can
       describe. */
    .shape.vector {
      background: none;
      border-radius: 0;
      position: relative;
    }

    .shape .silhouette {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      fill: var(--ml-shape-bg);
      transition: fill var(--md-sys-motion-default-effects);
      pointer-events: none;
    }

    /* The glyph sits above the silhouette and, unlike the CSS box, does NOT
       need counter-rotating — the vector container itself never turns, only the
       path inside it does. */
    .shape .silhouette path {
      transform-box: fill-box;
      transform-origin: center;
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.unlocked .silhouette path {
      transform: rotate(var(--ml-rot, 45deg));
    }

    .shape.vector ha-icon {
      position: relative;
    }

    /* In vector mode the PATH turns, so the container must not — otherwise the
       rotation is applied twice and the glyph's counter-rotation cancels the
       wrong one. */
    .shape.vector.unlocked {
      transform: none;
    }

    .shape.vector.unlocked ha-icon {
      transform: none;
    }

    /* Counter-rotation keeps the glyph upright while its container turns. */
    .shape ha-icon {
      --mdc-icon-size: clamp(56px, 23cqi, 96px);
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.unlocked ha-icon {
      transform: rotate(-45deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .shape,
      .shape ha-icon {
        transition: background-color var(--md-sys-motion-default-effects),
          color var(--md-sys-motion-default-effects);
      }
    }

    /* ---- the gesture ---- */

    materia-drag-confirm {
      width: 100%;
      /* A tonal well in the surface's own ink, so the track stays legible in
         both states without a second colour decision. Named explicitly rather
         than via currentColor — see the note in index.js on why that resolves
         wrong inside the primitive's shadow DOM. */
      --mdc-track: color-mix(in srgb, var(--ml-fg) 14%, transparent);
      --mdc-ink: var(--ml-fg);
      --mdc-handle: var(--ml-handle-bg);
      --mdc-handle-ink: var(--ml-handle-fg);
    }

    .pending {
      font-size: clamp(12px, 3.4cqi, 14px);
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.72;
    }

    .demo-note {
      font-size: clamp(11px, 3.2cqi, 12px);
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.55;
    }
  `,
];
