import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_ATTRIBUTES,
  MAX_STEPS,
  resolveAttributes,
  mediaAttr,
  maxSteps,
  volumeSteps,
  volumeLimit,
  isLive,
  mediaControls,
  powerTransition,
} from "../src/utils/media.js";
import { arcStep, stepHapticType } from "../src/utils/kinetic-knob.js";
import { showsLimit } from "../src/utils/volume-control.js";

const st = (attributes, state = "on") => ({ state, attributes });
const arcam = st({
  volume_steps: 42,
  volume_level: 0.9,
  limit: 60,
  controls: ["play_pause"],
  live: "on",
  transition: "turning_on",
  input: "NET",
  supported_features: 1 | 16 | 32,
});
const other = st({
  vol: 30,
  max_vol: 50,
  buttons: ["next"],
  is_radio: true,
  phase: "turning_off",
  volume_level: 0.25,
  supported_features: 1 | 16 | 32,
});

test("resolveAttributes: defaults, scope, own (per key, own wins)", () => {
  assert.equal(resolveAttributes(), DEFAULT_ATTRIBUTES);
  assert.equal(resolveAttributes(null, "junk"), DEFAULT_ATTRIBUTES);
  const m = resolveAttributes({ live: "is_radio" }, { live: "x", limit: "max_vol", steps: 100 });
  assert.equal(m.live, "is_radio");
  assert.equal(m.limit, "max_vol");
  assert.equal(m.steps, 100);
  assert.equal(m.controls, "controls");
});

test("mediaAttr: default names, renamed, false/null ignores", () => {
  assert.equal(mediaAttr(arcam, "input"), "NET");
  assert.equal(mediaAttr(other, "live", { live: "is_radio" }), true);
  assert.equal(mediaAttr(arcam, "live", { live: false }), undefined);
  assert.equal(mediaAttr(arcam, "live", { live: null }), undefined);
  // A partial map falls back to the default name for missing keys.
  assert.equal(mediaAttr(arcam, "input", { live: false }), "NET");
  assert.equal(mediaAttr(undefined, "live"), undefined);
});

test("readers without a map behave as before", () => {
  assert.equal(volumeSteps(arcam), 42);
  assert.equal(volumeLimit(arcam), 60);
  assert.equal(isLive(arcam), true);
  assert.deepEqual(mediaControls(arcam), ["play_pause"]);
  assert.equal(powerTransition(arcam), "turning_on");
  assert.equal(volumeSteps(st({ volume_level: 0.5 })), Math.round(0.5 * MAX_STEPS));
  assert.equal(volumeLimit(st({})), MAX_STEPS);
  assert.equal(maxSteps(), MAX_STEPS);
});

test("readers with a map read the mapped attributes", () => {
  const m = resolveAttributes({
    volume_steps: "vol",
    limit: "max_vol",
    controls: "buttons",
    live: "is_radio",
    transition: "phase",
  });
  assert.equal(volumeSteps(other, m), 30);
  assert.equal(volumeLimit(other, m), 50);
  assert.deepEqual(mediaControls(other, m), ["next"]);
  assert.equal(isLive(other, m), true);
  assert.equal(powerTransition(other, m), "turning_off");
});

test("false turns a reading off: fall back to the standard attributes", () => {
  const off = resolveAttributes({ volume_steps: false, limit: false, controls: false, live: false, transition: false });
  assert.equal(volumeSteps(arcam, off), Math.round(0.9 * MAX_STEPS));
  assert.equal(volumeLimit(arcam, off), MAX_STEPS);
  assert.deepEqual(mediaControls(arcam, off), ["play_pause", "previous", "next"]);
  assert.equal(isLive(arcam, off), false);
  assert.equal(powerTransition(arcam, off), null);
});

test("steps: the scale for volume_level and the limit ceiling", () => {
  const pct = resolveAttributes({ steps: 100 });
  assert.equal(maxSteps(pct), 100);
  assert.equal(volumeSteps(other, pct), 25);
  assert.equal(volumeSteps(st({ volume_level: 1 }), pct), 100);
  assert.equal(volumeLimit(st({}), pct), 100);
  assert.equal(volumeLimit(st({ limit: 150 }), pct), 100);
  assert.equal(maxSteps({ steps: "x" }), MAX_STEPS);
  assert.equal(maxSteps({ steps: 0 }), MAX_STEPS);
});

test("scale-aware knob helpers default to MAX_STEPS", () => {
  assert.equal(arcStep(1), arcStep(1, MAX_STEPS));
  assert.ok(arcStep(1, 100) > arcStep(1));
  assert.equal(stepHapticType(99, 99), "selection");
  assert.equal(stepHapticType(99, 99, 100), "heavy");
  assert.equal(stepHapticType(100, 100, 100), "selection");
  assert.equal(showsLimit("arc", 10, 99), false);
  assert.equal(showsLimit("arc", 10, 99, 100), true);
});
