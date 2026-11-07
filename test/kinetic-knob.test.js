import assert from "node:assert/strict";
import test from "node:test";
import {
  KNOB_STEPS_PER_TURN,
  COAST_TAU,
  COAST_AMPLITUDE,
  COAST_MIN_DEG_PER_MS,
  COAST_SAFETY_STEPS,
  COAST_IDLE_MS,
  GAIN,
  MAX_STEP_PER_MOVE,
  unwrapDelta,
  filterVelocity,
  shouldCoast,
  coastAmplitude,
  coastOffset,
  coastFinished,
  knobAngleFor,
  knobStepsFor,
  arcStep,
  stepHapticType,
  dialArc,
  tapStep,
  repeatDelay,
  REPEAT_INITIAL_MS,
  TAP_MAX_STEPS,
} from "../src/utils/kinetic-knob.js";

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);

test("the owner-tuned knob constants are unchanged", () => {
  assert.equal(KNOB_STEPS_PER_TURN, 24);
  assert.equal(COAST_TAU, 1000);
  assert.equal(COAST_AMPLITUDE, 0.8);
  assert.equal(COAST_MIN_DEG_PER_MS, 0.12);
  assert.equal(COAST_SAFETY_STEPS, 30);
  assert.equal(COAST_IDLE_MS, 50);
  assert.equal(GAIN, 0.75);
  assert.equal(MAX_STEP_PER_MOVE, 1.5);
});

test("one knob turn is 24 steps, and the ring follows the finger 1:1", () => {
  assert.equal(knobAngleFor(24), 360);
  assert.equal(knobStepsFor(15), 1);
  close(knobStepsFor(knobAngleFor(7.3)), 7.3);
});

test("angle deltas unwrap across the ±180° seam", () => {
  assert.equal(unwrapDelta(-175, 175), 10);
  assert.equal(unwrapDelta(175, -175), -10);
  assert.equal(unwrapDelta(30, 10), 20);
});

test("velocity is low-pass filtered", () => {
  // A 40 ms sample takes 80 % of the new reading.
  close(filterVelocity(0, 40, 40), 0.8);
  // A 10 ms sample only 20 %: one jittery event cannot dominate.
  close(filterVelocity(1, 20, 10), 0.2 * 2 + 0.8 * 1);
  // dt never divides by zero.
  assert.ok(Number.isFinite(filterVelocity(0, 5, 0)));
});

test("only a fresh, fast release coasts", () => {
  assert.equal(shouldCoast(0.5, 10), true);
  assert.equal(shouldCoast(-0.5, 10), true);
  assert.equal(shouldCoast(0.5, 50), false, "finger held still before release");
  assert.equal(shouldCoast(0.12, 10), false, "too slow");
});

test("coast run-out is the closed-form exponential A·τ·(1 − e^(−t/τ))", () => {
  const a = coastAmplitude(0.5); // 0.4 deg/ms, run-out 400° < cap
  close(a, 0.4);
  close(coastOffset(a, 0), 0);
  close(coastOffset(a, COAST_TAU), 400 * (1 - Math.exp(-1)));
  close(coastOffset(a, 1e9), 400, 1e-6);
  // Linear in the release speed: no acceleration curve.
  close(coastOffset(coastAmplitude(0.25), 700) * 2, coastOffset(coastAmplitude(0.5), 700));
});

test("coast is capped only by the high safety limit", () => {
  const maxDeg = (COAST_SAFETY_STEPS * 360) / KNOB_STEPS_PER_TURN; // 450°
  close(coastAmplitude(5) * COAST_TAU, maxDeg);
  close(coastAmplitude(-5) * COAST_TAU, -maxDeg);
  assert.ok(knobStepsFor(coastOffset(coastAmplitude(50), 1e9)) <= COAST_SAFETY_STEPS + 1e-9);
});

test("the coast finishes near its asymptote or after 6τ", () => {
  const a = 0.4;
  assert.equal(coastFinished(a, coastOffset(a, 100), 100), false);
  assert.equal(coastFinished(a, 399.6, 3000), true);
  assert.equal(coastFinished(a, 10, 6 * COAST_TAU + 1), true);
});

test("arc style: constant gain, capped per pointer event", () => {
  close(arcStep(1), (99 * 0.75) / 270);
  assert.equal(arcStep(90), 1.5);
  assert.equal(arcStep(-90), -1.5);
});

test("haptics: heavy at a real limit, light at 0, a tick otherwise", () => {
  assert.equal(stepHapticType(70, 70), "heavy");
  assert.equal(stepHapticType(99, 99), "selection", "the end of the scale is not a limit");
  assert.equal(stepHapticType(0, 70), "light");
  assert.equal(stepHapticType(35, 70), "selection");
});

test("dial arcs draw nothing for an empty range", () => {
  assert.equal(dialArc(5, 5, 130), "");
  assert.match(dialArc(0, 99, 130), /^M .* A 130 130 0 1 1 /);
  assert.match(dialArc(0, 10, 20, 24), / 0 0 1 /);
});

test("tap style: a tap moves at most 5 steps toward the spot", () => {
  assert.equal(TAP_MAX_STEPS, 5);
  assert.equal(tapStep(30, 1), 35, "tap at the top from 30");
  assert.equal(tapStep(30, 0), 25);
  assert.equal(tapStep(30, 32 / 99), 32, "a near tap lands exactly");
  assert.equal(tapStep(0, -1), 0);
});

test("tap style: hold repeats after 380 ms, speeding from 140 to 70 ms", () => {
  assert.equal(REPEAT_INITIAL_MS, 380);
  assert.equal(repeatDelay(0), 140);
  assert.equal(repeatDelay(1), 132);
  assert.equal(repeatDelay(5), 100);
  assert.equal(repeatDelay(9), 70);
  assert.equal(repeatDelay(40), 70);
});
