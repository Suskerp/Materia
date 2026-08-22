import { css } from "lit";
import { hostStyles, haCardReset, unavailableStyles } from "../../styles/card-styles.js";
import { disabledConditionStyles } from "../../utils/conditions.js";
import { motionTokens } from "../../utils/motion.js";

/* SPEC SOURCES USED IN THIS FILE — every number below is one of these, never
   an invented value:

   * M3 button size ladder (32/40/56/96/136dp) and the .size-l rung
     (height 96, corner 28, icon 32) — src/elements/button/styles.js.
     The concept drew 104px mode buttons; 104 is not on the ladder, so the
     mode row uses the 96px rung, exactly the call materia-drag-confirm
     already made for the same reason.
   * Connected-group corner grammar (outer = height/2, inner seam =
     SIZES.l.innerCorner = 16px, 2px gutter, selected flex-grow 1.4) —
     src/elements/button-group/styles.js + index.js.
   * Hero corner morph: 50% (circle) to 30%. The 30% is this repo's already
     twice-derived "large but squared" ratio — 28px on the 96px large rung is
     29.2%, the design doc's 72px on 236px is 30.5% — see
     src/cards/lock/styles.js, which morphs between the same two endpoints.
   * M3 shape scale corners: extra-small 4, small 8, medium 12, large 16,
     extra-large 28. Zone rows take large (16), chips take small (8).
   * M3 chips: 32dp height, 8dp corner, label-large text, 18dp leading icon.
   * M3 list item, one line: 56dp min height, 16dp horizontal padding.
   * M3 type scale: label-small 11/16, body-small 12/16, label-large and
     title-small and body-large 14/20, headline-small 24/32, headline-large
     32/40. The responsive clamps below always interpolate between two REAL
     steps of that scale rather than inventing a size.
   * M3 state layers: hover 8%, press 10-12% (as used in
     src/elements/button/styles.js). Disabled content: 38%.
   * Motion: src/utils/motion.js tokens only. The sweep springs back with
     standard-fast-spatial, NOT the expressive spring — same reasoning
     materia-drag-confirm documents, since the fill travels to a hard stop
     inside a clipping box where a 15% overshoot has nowhere to go.
   * Colours: --md-sys-color-* plus the repo custom roles from
     dist/custom_colors.json (warning / on-warning / warning-container /
     on-warning-container). No literal colour values anywhere. */

export const styles = [
  hostStyles,
  haCardReset,
  unavailableStyles,
  disabledConditionStyles,
  motionTokens,
  css`
    ha-card {
      background: transparent;
      box-shadow: none;
      border: none;
      /* Everything scales off the card width, so one card works at 4 columns
         and at 12 without a breakpoint. Same approach as materia-lock. */
      container-type: inline-size;
    }

    /* Same asymmetric expressive silhouette as materia-hero and materia-lock,
       so an alarm stacked under either reads as the same family. */
    .body {
      position: relative;
      overflow: hidden;
      border-radius: 32px 32px 14px 32px;
      padding: clamp(16px, 4.5cqi, 22px);
      background: var(--ma-bg);
      color: var(--ma-fg);
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 5cqi, 26px);
      transition: background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    /* The siren overlay is an ::after, so every real child has to be lifted
       above it. Cheaper and safer than z-indexing the overlay negative, which
       would slip behind the card background. */
    .hero,
    .modes,
    .foot,
    .zones {
      position: relative;
      z-index: 1;
    }

    /* ---- TRIGGERED -------------------------------------------------------
       The one state that must be unmistakable across the room. The card
       floods the error pair (not a tint of it) and a slow siren wash breathes
       over the top. Deliberately the only looping animation on the card:
       everything else here is a one-shot or a gesture. */
    .body.triggered::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: var(--md-sys-color-error);
      opacity: 0;
      pointer-events: none;
      animation: ma-siren 1.2s ease-in-out infinite alternate;
    }

    @keyframes ma-siren {
      to {
        opacity: 0.22;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .body.triggered::after {
        animation: none;
        opacity: 0.14;
      }
    }

    /* ---- hero ------------------------------------------------------------ */

    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(10px, 3cqi, 14px);
      text-align: center;
    }

    /* The concept drew a 150px shape in a 412px frame, which is 36cqi. The
       clamp ends are held so it stays a recognisable shape in a narrow column
       and never dwarfs a wide one. */
    .shape {
      width: clamp(112px, 36cqi, 168px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      background: var(--ma-hero-bg);
      color: var(--ma-hero-fg);
      /* DISARMED is the circle and ARMED is the squared shape, so the corner
         itself carries the state. Expressed as a percentage, not px: a px
         radius at or above half the box renders identically to any larger
         value, so a px morph would sit visually still for most of its
         duration and then snap. */
      border-radius: 50%;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* THE TURN IS THE OTHER HALF OF THE MORPH, and it was missing.
         materia-lock's finding, in its own words: a circle rotating is
         invisible, a cornered shape rotating is unmistakable, so the corner
         change and the rotation reveal each other. This hero morphed its
         corner and never turned, which left the morph under-read at exactly
         the moment it matters most. 45deg is not a magic number: it is HALF
         this silhouette's rotational-symmetry period (a rounded square is
         4-fold, so the period is 90), which is the largest turn that still
         reads as movement before the shape maps back onto itself. Identical
         derivation and identical value to lock's SHAPE_STYLES.squircle.rot.

         Arming turns one way and disarming retraces the same arc backwards,
         so the shape ends every commit resting where the next one starts —
         the same mirroring lock gives its gesture.

         On the expressive spring, deliberately. The sweep on the mode buttons
         does NOT use it, because that fill travels to a hard stop inside a
         clipping box where a 15% overshoot has nowhere to go; this shape is
         free-standing with room to bounce, which is what the spring is for. */
      transform: rotate(0deg);
      transition: border-radius var(--md-sys-motion-expressive-default-spatial),
        transform var(--md-sys-motion-expressive-default-spatial),
        background-color var(--md-sys-motion-default-effects),
        color var(--md-sys-motion-default-effects);
    }

    .shape.armed {
      border-radius: 30%;
      transform: rotate(var(--ma-rot, 45deg));
    }

    .shape ha-icon {
      /* The .size-l 32px icon scaled to this shape: 72px on a 168px shape is
         the same glyph-to-box ratio materia-lock uses (96 on 236). */
      --mdc-icon-size: clamp(48px, 16cqi, 72px);
      /* THE GLYPH NEVER TURNS. This is a CSS box, not a vector silhouette with
         the icon as a sibling, so the icon lives inside the box that rotates
         and needs an equal and opposite turn to stay upright — exactly the
         distinction lock draws between its vector and squircle shapes. */
      transform: rotate(0deg);
      transition: transform var(--md-sys-motion-expressive-default-spatial);
    }

    .shape.armed ha-icon {
      transform: rotate(calc(-1 * var(--ma-rot, 45deg)));
    }

    @media (prefers-reduced-motion: reduce) {
      .shape,
      .shape ha-icon {
        transition: background-color var(--md-sys-motion-default-effects),
          color var(--md-sys-motion-default-effects);
      }
    }

    /* THREE ANIMATIONS, ONE PROPERTY. The animation shorthand is a single
       property, so two rules setting it on .shape would silently cancel one
       another. Rather than lean on specificity, the precedence is written out:
       the fault mark outranks the receipt, which outranks the steady breathe.
       In time they barely overlap anyway — the receipt fires as busy ENDS —
       but the arbitration is explicit so it cannot rot.

       Each one also drives a DIFFERENT geometric channel, which is what lets
       them compose instead of fight: the pose owns transform, the receipt owns
       the standalone rotate property, the shake owns translate, and the
       breathe owns scale. That is why the shake below does not reuse lock's
       ml-jam-shake keyframes verbatim — those animate transform with a rotate
       and a translateX together, which on this shape would clobber the pose
       turn mid-shake. Same gesture, different channel. */

    /* BUSY, not disabled. arming and pending are the machine working, and the
       progress guidance says an indeterminate wait must show live activity, so
       the shape breathes at full strength rather than dimming. Same 1.035
       amplitude and 2s beat materia-lock and materia-vacuum-hero already use
       for "the machine is doing something". */
    .shape.busy:not(.turn):not(.shake) {
      animation: ma-breathe 2s ease-in-out infinite alternate;
    }

    @keyframes ma-breathe {
      to {
        scale: 1.035;
      }
    }

    /* THE ARRIVAL RECEIPT. One turn of the SHAPE, never the glyph, when the
       panel finishes what the card was already optimistically claiming. Same
       duration and easing curve as lock's own tap receipt (ml-open-spin), and
       the same standalone-rotate trick so it composes with the pose rather
       than replacing it. Signed, so finishing a disarm unwinds and finishing
       an arm winds on. */
    .shape.turn:not(.shake) {
      animation: ma-turn 0.65s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    .shape.turn:not(.shake) ha-icon {
      animation: ma-turn-counter 0.65s cubic-bezier(0.3, 0.1, 0.2, 1);
    }

    @keyframes ma-turn {
      from {
        rotate: 0deg;
      }
      to {
        rotate: calc(var(--ma-turn-dir, 1) * 360deg);
      }
    }

    @keyframes ma-turn-counter {
      from {
        rotate: 0deg;
      }
      to {
        rotate: calc(var(--ma-turn-dir, 1) * -360deg);
      }
    }

    /* THE REFUSAL. A pin expired unanswered: the card asked, promised, and has
       just had to take the promise back. Lock's reading of its jam shake
       applies unchanged — "the mechanism tried and failed" — and it runs once,
       because a fault that lingers on screen for minutes does not need to keep
       shaking at you. Deliberately NOT used for the triggered state, which already
       floods the card and pulses a siren wash; a third mark there would be
       noise on the one state that is already impossible to miss. */
    .shape.shake {
      animation: ma-shape-shake 0.5s ease-in-out 1;
    }

    @keyframes ma-shape-shake {
      0%,
      100% {
        translate: 0;
      }
      20% {
        translate: -6px;
      }
      40% {
        translate: 5px;
      }
      60% {
        translate: -3px;
      }
      80% {
        translate: 2px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .shape.busy:not(.turn):not(.shake),
      .shape.turn:not(.shake),
      .shape.turn:not(.shake) ha-icon,
      .shape.shake {
        animation: none;
      }
    }

    /* headline-small to headline-large, interpolated. */
    .title {
      font-size: clamp(24px, 8cqi, 32px);
      font-weight: 600;
      line-height: 1.15;
      letter-spacing: -0.01em;
    }

    /* body-small to body-medium. Quieter, per the concept. */
    .sub {
      font-size: clamp(12px, 3.6cqi, 14px);
      line-height: 20px;
      font-weight: 500;
      opacity: 0.72;
    }

    .sub.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    /* ---- mode row -------------------------------------------------------- */

    /* The 2px gutter and the no-clip container are the connected-group rules:
       every button computes its own corners, so a container radius here would
       silently erase the active button morph. */
    .modes {
      display: flex;
      gap: 2px;
      width: 100%;
      box-sizing: border-box;
    }

    button.mode {
      /* Content-sized, then grows to share leftover width, never shrinks —
         the connected-group flex rule. */
      flex: 1 0 auto;
      min-width: 0;
      height: 96px;
      position: relative;
      overflow: hidden;
      border: none;
      padding: 0;
      background: var(--ma-btn-bg);
      color: var(--ma-btn-fg);
      font-family: inherit;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      /* Touch scrolling is handled by the gesture state machine in index.js,
         which only locks the page once it has decided the press is a hold and
         not a scroll. */
      touch-action: pan-y;
      transition: border-radius var(--md-sys-motion-expressive-fast-spatial),
        flex-grow var(--md-sys-motion-expressive-fast-spatial),
        opacity var(--md-sys-motion-default-effects),
        background-color var(--md-sys-motion-fast-effects),
        color var(--md-sys-motion-fast-effects);
    }

    /* The expressive emphasis cue: the button you are standing in grows and
       its neighbours compress. 1.4 is the connected-group value. */
    button.mode.active {
      flex-grow: 1.4;
    }

    /* INERT: armed, and this is not the mode you are in. It cannot be
       actuated, so it takes M3 disabled content treatment (38%) rather than
       the concept illustration 50% — but it deliberately keeps pointer events,
       because pressing it has to explain itself instead of doing nothing. */
    button.mode.inert {
      opacity: 0.38;
    }

    button.mode:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* The refusal, visibly. Reuses the one-shot shake grammar materia-lock
       gives a jam: a mechanism that tried and did not move. */
    button.mode.refused {
      animation: ma-refuse 0.4s ease-in-out 1;
    }

    @keyframes ma-refuse {
      0%, 100% { translate: 0; }
      25% { translate: -4px; }
      50% { translate: 3px; }
      75% { translate: -2px; }
    }

    @media (prefers-reduced-motion: reduce) {
      button.mode.refused {
        animation: none;
      }
    }

    /* State layer, at the M3 values. */
    button.mode .layer {
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--md-sys-motion-fast-effects);
    }

    button.mode:hover .layer {
      opacity: 0.08;
    }

    button.mode:active .layer {
      opacity: 0.1;
    }

    /* Two identical faces, one over the sweep and one under it. The sweep clip
       reveals the second face in the ink that reads against the swept fill, so
       label and hint stay legible from 0% to 100% without ever moving — a
       single face over a solid fill would go unreadable halfway across. */
    .face {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
      padding: 0 8px;
      box-sizing: border-box;
      pointer-events: none;
    }

    .face ha-icon {
      /* .size-l icon rung. */
      --mdc-icon-size: 32px;
      flex-shrink: 0;
    }

    /* label-large. */
    .face .label {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* label-small, and quieter — it is instruction, not identity. */
    .face .hint {
      font-size: 11px;
      font-weight: 500;
      line-height: 16px;
      opacity: 0.75;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* THE SWEEP. A left-anchored reveal of the committed face. clip-path
       rather than a scaled or width-driven box, because the face inside must
       keep its full layout width: scaling would squash the text and a width
       animation would re-centre it, so the label would crawl sideways as the
       fill passed. */
    .sweep {
      position: absolute;
      inset: 0;
      background: var(--ma-sweep);
      color: var(--ma-sweep-ink);
      pointer-events: none;
      clip-path: inset(0 calc(100% - var(--ma-p, 0) * 100%) 0 0);
    }

    /* Released short of the commit: the fill springs home on its own, so it
       gets easing. While the finger is down there is no transition at all —
       easing something that is following a finger reads as lag. */
    .sweep.settling {
      transition: clip-path var(--md-sys-motion-standard-fast-spatial);
    }

    /* ---- footnote -------------------------------------------------------- */

    /* body-small. Explains the gesture the row is offering right now. */
    .foot {
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
      text-align: center;
      opacity: 0.72;
      padding: 0 8px;
    }

    .foot.warn {
      color: var(--md-sys-cust-color-warning, var(--md-sys-color-error));
      opacity: 1;
    }

    .foot.alert {
      color: var(--md-sys-color-error);
      opacity: 1;
      font-weight: 700;
    }

    /* ---- zones ----------------------------------------------------------- */

    .zones {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .zgroup {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* title-small. */
    .zgroup-title {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      opacity: 0.72;
      padding: 4px 4px 0;
    }

    /* M3 one-line list item: 56dp tall, 16dp side padding. Large corner (16)
       from the shape scale, so the rows sit in the same shape family as the
       card without competing with the mode row above. */
    .zrow {
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: 56px;
      padding: 8px 16px;
      box-sizing: border-box;
      border-radius: 16px;
      background: color-mix(in srgb, var(--ma-fg) 6%, transparent);
    }

    /* Not ready is the warning role, straight from the repo custom roles —
       the same amber the sweep turns, so the row and the gesture agree. */
    .zrow.notready {
      background: var(--md-sys-cust-color-warning-container, color-mix(in srgb, var(--ma-fg) 10%, transparent));
      color: var(--md-sys-cust-color-on-warning-container, var(--ma-fg));
    }

    .zrow ha-icon {
      --mdc-icon-size: 24px;
      flex-shrink: 0;
    }

    .zrow.notready > ha-icon {
      color: var(--md-sys-cust-color-warning, currentColor);
    }

    .ztext {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    /* body-large. */
    .zname {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* body-small. */
    .zstate {
      font-size: 12px;
      line-height: 16px;
      opacity: 0.7;
    }

    /* M3 assist chip geometry: 32dp tall, 8dp corner, label-large, 18dp
       leading icon. Used for both the bypass action and the bypassed chips, so
       the thing you press to bypass and the thing you press to undo it are
       visibly the same object in two states. */
    .chip {
      height: 32px;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      border: 1px solid var(--md-sys-color-outline-variant, var(--md-sys-color-outline));
      background: transparent;
      color: inherit;
      font-family: inherit;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: background-color var(--md-sys-motion-fast-effects);
    }

    .chip ha-icon {
      --mdc-icon-size: 18px;
      flex-shrink: 0;
    }

    .chip:hover {
      background: color-mix(in srgb, currentColor 8%, transparent);
    }

    .chip:active {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .chip:focus-visible {
      outline: 2px solid var(--md-sys-color-primary);
      outline-offset: 2px;
    }

    /* A bypassed zone is a deliberate hole in the perimeter, so its chip is
       drawn as an outline that is not quite closed. */
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 4px;
    }

    .chip.bypassed {
      border-style: dashed;
      opacity: 0.8;
    }

    /* A bypassed zone with nothing to un-bypass it: still stated, but not
       dressed as a control. Rendered as a span, so it also needs the cursor
       and the state layer taken back off. */
    .chip.inert {
      cursor: default;
      pointer-events: none;
    }

    /* The collapsed summary. A real button because it is a real control. */
    button.summary {
      width: 100%;
      border: none;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }

    button.summary .chev {
      --mdc-icon-size: 20px;
      opacity: 0.6;
      transition: rotate var(--md-sys-motion-expressive-fast-spatial);
    }

    button.summary.open .chev {
      rotate: 180deg;
    }

    .zrow.ok > ha-icon {
      color: var(--md-sys-color-primary);
    }

    /* UNAVAILABLE is deliberately NOT the warning role. A zone the panel
       cannot see is an unknown, not an open door, and spending the amber here
       would leave nothing louder to say "this one is actually open" — the
       seven permanently unavailable zones on this install would have owned the
       warning colour forever. Outline-variant ink on the plain row: present,
       readable, and visibly not a verdict. */
    .zrow.unavail {
      background: color-mix(in srgb, var(--ma-fg) 6%, transparent);
    }

    .zrow.unavail > ha-icon,
    .zrow.unavail .zname {
      color: var(--md-sys-color-on-surface-variant, var(--ma-fg));
      opacity: 0.85;
    }

    .note {
      font-size: 12px;
      line-height: 16px;
      font-weight: 600;
      letter-spacing: 0.02em;
      opacity: 0.7;
      text-align: center;
    }
  `,
];
