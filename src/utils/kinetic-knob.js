/**
 * Volume dial physics, ported unchanged from the approved arcam-player-card
 * prototype. These numbers were tuned by the owner against a screen recording
 * of the Lyngdorf app ("the knob is great now"): do NOT retune them, and do
 * not add acceleration or a speed cap (a speed cap was a "huge regression").
 *
 * Knob style: a freely turning, multi-turn knob. The ring follows the finger
 * continuously; one full turn = KNOB_STEPS_PER_TURN steps. A flick coasts
 * like a kinetic scroller (iOS/UIScrollView model): a low-pass filtered
 * release velocity, then exponential decay v(t) = A·e^(-t/τ), so the run-out
 * A·τ grows with how hard you flick. τ ≈ 1 s was measured on the Lyngdorf
 * app (each 0.5 s covers ~0.6x the previous); only a high safety cap.
 *
 * Arc style: a 270° dial with constant gain (no acceleration) and a cap per
 * pointer event, so a quick flick cannot jump to the limit.
 */
import { MAX_STEPS } from "./media.js";

export const SWEEP = 270;
export const START = 135;

export const GAIN = 0.75;
export const MAX_STEP_PER_MOVE = 1.5;

export const KNOB_STEPS_PER_TURN = 24;
export const COAST_TAU = 1000; // ms
export const COAST_AMPLITUDE = 0.8; // share of the release velocity that carries on
export const COAST_MIN_DEG_PER_MS = 0.12; // slower releases don't coast
export const COAST_SAFETY_STEPS = 30; // never coast further than this
export const COAST_IDLE_MS = 50; // finger held still before release: no coast

/** Shortest signed angle (deg) from `last` to `angle`. */
export function unwrapDelta(angle, last) {
  let d = angle - last;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/** Low-pass filtered angular velocity (deg/ms), like a kinetic scroller's tracker. */
export function filterVelocity(previous, deltaDeg, dtMs) {
  const dt = Math.max(1, dtMs);
  const alpha = Math.min(1, dt / 40) * 0.8;
  return alpha * (deltaDeg / dt) + (1 - alpha) * (previous ?? 0);
}

/** Coast only after a fresh, fast enough release. */
export function shouldCoast(speedDegPerMs, msSinceLastMove) {
  return msSinceLastMove < COAST_IDLE_MS && Math.abs(speedDegPerMs) > COAST_MIN_DEG_PER_MS;
}

/** Coast amplitude (deg/ms) for a release speed, capped at COAST_SAFETY_STEPS of run-out. */
export function coastAmplitude(speedDegPerMs) {
  let amplitude = COAST_AMPLITUDE * speedDegPerMs;
  const maxDeg = (COAST_SAFETY_STEPS * 360) / KNOB_STEPS_PER_TURN;
  if (Math.abs(amplitude * COAST_TAU) > maxDeg) amplitude = (Math.sign(amplitude) * maxDeg) / COAST_TAU;
  return amplitude;
}

/** Closed-form run-out: angle(t) = A·τ·(1 − e^(−t/τ)) from the release point. */
export function coastOffset(amplitude, elapsedMs) {
  return amplitude * COAST_TAU * (1 - Math.exp(-elapsedMs / COAST_TAU));
}

/** The coast ends when less than half a degree remains, or after 6τ. */
export function coastFinished(amplitude, travelledDeg, elapsedMs) {
  const remaining = Math.abs(amplitude * COAST_TAU) - Math.abs(travelledDeg);
  return remaining < 0.5 || elapsedMs > 6 * COAST_TAU;
}

export const knobAngleFor = (steps) => (steps * 360) / KNOB_STEPS_PER_TURN;
export const knobStepsFor = (deg) => (deg * KNOB_STEPS_PER_TURN) / 360;

/** Arc style: steps for one pointer move of `deltaDeg`, capped per event. */
export function arcStep(deltaDeg) {
  return Math.max(-MAX_STEP_PER_MOVE, Math.min(MAX_STEP_PER_MOVE, (deltaDeg * MAX_STEPS * GAIN) / SWEEP));
}

/** Haptic for a volume change: heavy at a real limit, light at 0, a selection tick otherwise. */
export function stepHapticType(value, limit) {
  if (value === limit && limit < MAX_STEPS) return "heavy";
  if (value === 0) return "light";
  return "selection";
}

/** SVG arc along the 270° dial from `from` to `to` (in steps). */
export function dialArc(from, to, r, c = 150) {
  if (to - from < 0.01) return "";
  const p = (v) => {
    const a = ((START + (SWEEP * v) / MAX_STEPS) * Math.PI) / 180;
    return `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  };
  return `M ${p(from)} A ${r} ${r} 0 ${(SWEEP * (to - from)) / MAX_STEPS > 180 ? 1 : 0} 1 ${p(to)}`;
}

/* ---- tap style (tablets: an index finger taps, it does not turn) -------- */

/** A tap on the level bar moves at most this many steps toward the spot: never a jump. */
export const TAP_MAX_STEPS = 5;
/** Hold −/+: first repeat after REPEAT_INITIAL_MS, then 140 ms speeding up to 70 ms. */
export const REPEAT_INITIAL_MS = 380;
export const REPEAT_START_MS = 140;
export const REPEAT_MIN_MS = 70;
export const REPEAT_ACCEL_MS = 8;

/** New volume after a tap at `fraction` (0 = bottom, 1 = top) of the level bar. */
export function tapStep(value, fraction) {
  const target = Math.max(0, Math.min(1, fraction)) * MAX_STEPS;
  return Math.round(value + Math.max(-TAP_MAX_STEPS, Math.min(TAP_MAX_STEPS, target - value)));
}

/** Delay before repeat number `ticks` (0-based, after the initial delay). */
export function repeatDelay(ticks) {
  return Math.max(REPEAT_MIN_MS, REPEAT_START_MS - ticks * REPEAT_ACCEL_MS);
}

let lastSelectionHaptic = 0;

/**
 * HA app haptic (iOS/Android companion) plus vibrate() in Android browsers.
 * Selection ticks are rate limited to one per 40 ms, so a fast turn still
 * ticks per step. This is deliberately separate from ActionMixin's 120 ms
 * one-haptic-per-gesture de-dupe: a dial step IS a separate event.
 */
export function stepHaptic(el, type = "selection") {
  const now = performance.now();
  if (type === "selection" && now - lastSelectionHaptic < 40) return;
  lastSelectionHaptic = now;
  el.dispatchEvent(new CustomEvent("haptic", { detail: type, bubbles: true, composed: true }));
  try {
    navigator.vibrate?.({ selection: 4, light: 8, medium: 14, heavy: 22, warning: [12, 40, 12] }[type] ?? 6);
  } catch (_) {
    /* vibrate is best effort */
  }
}
