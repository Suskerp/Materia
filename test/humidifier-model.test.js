import assert from "node:assert/strict";
import test from "node:test";
import {
  adjustedHumidity,
  humidifierAction,
  humidifierModes,
  humidifierRange,
  humidifierTarget,
} from "../src/cards/humidifier/model.js";

test("target humidity supports current and legacy Home Assistant attributes", () => {
  assert.equal(humidifierTarget({ target_humidity: 47, humidity: 40 }), 47);
  assert.equal(humidifierTarget({ humidity: "42" }), 42);
  assert.equal(humidifierTarget({}), undefined);
  assert.equal(humidifierTarget({ target_humidity: null }), undefined);
});

test("entity limits and step drive clamped humidity adjustments", () => {
  const range = humidifierRange({ min_humidity: 30, max_humidity: 70, target_humidity_step: 5 });
  assert.deepEqual(range, { min: 30, max: 70, step: 5 });
  assert.equal(adjustedHumidity(68, 5, range), 70);
  assert.equal(adjustedHumidity(31, -5, range), 30);
  assert.equal(adjustedHumidity(42, 5, range), 45);
});

test("configured step wins and decimal precision is stable", () => {
  const range = humidifierRange({ min_humidity: 30, max_humidity: 70, target_humidity_step: 5 }, 2.5);
  assert.equal(range.step, 2.5);
  assert.equal(adjustedHumidity(42.5, 2.5, range), 45);
});

test("modes are clean and unique", () => {
  assert.deepEqual(humidifierModes({ available_modes: ["eco", "eco", "sleep", null, ""] }), ["eco", "sleep"]);
});

test("action falls back safely for off and active entities", () => {
  assert.equal(humidifierAction({ state: "off", attributes: { action: "humidifying" } }), "off");
  assert.equal(humidifierAction({ state: "on", attributes: { action: "humidifying" } }), "humidifying");
  assert.equal(humidifierAction({ state: "on", attributes: {} }), "idle");
});
