import assert from "node:assert/strict";
import test from "node:test";
import { emptiedAction, hasTank, tankFull, tankLevel } from "../src/cards/climate-panel/tank.js";

const hass = (states) => ({ states: Object.fromEntries(Object.entries(states).map(([id, state]) => [id, { state }])) });

test("a tank only exists on a humidifier with a tank entity", () => {
  assert.equal(hasTank({ entity: "humidifier.d", tank_entity: "sensor.t" }), true);
  assert.equal(hasTank({ entity: "humidifier.d", tank_full_entity: "input_boolean.f" }), true);
  assert.equal(hasTank({ entity: "humidifier.d" }), false);
  assert.equal(hasTank({ entity: "climate.x", tank_entity: "sensor.t" }), false);
});

test("the level is clamped, and unknown is not zero", () => {
  const c = { tank_entity: "sensor.t" };
  assert.equal(tankLevel(hass({ "sensor.t": "60.4" }), c), 60.4);
  assert.equal(tankLevel(hass({ "sensor.t": "130" }), c), 100);
  assert.equal(tankLevel(hass({ "sensor.t": "-3" }), c), 0);
  assert.equal(tankLevel(hass({ "sensor.t": "unavailable" }), c), null);
  assert.equal(tankLevel(hass({}), c), null);
  assert.equal(tankLevel(hass({ "sensor.t": "50" }), {}), null);
});

test("full follows the full entity, else a level of 100", () => {
  assert.equal(tankFull(hass({ "input_boolean.f": "on", "sensor.t": "40" }), { tank_entity: "sensor.t", tank_full_entity: "input_boolean.f" }), true);
  assert.equal(tankFull(hass({ "input_boolean.f": "off", "sensor.t": "100" }), { tank_entity: "sensor.t", tank_full_entity: "input_boolean.f" }), false);
  assert.equal(tankFull(hass({ "sensor.t": "100" }), { tank_entity: "sensor.t" }), true);
  assert.equal(tankFull(hass({ "sensor.t": "99" }), { tank_entity: "sensor.t" }), false);
});

test("emptied turns a boolean off, presses a button, or uses the configured action", () => {
  assert.deepEqual(emptiedAction({ tank_full_entity: "input_boolean.f" }), {
    action: "perform-action", perform_action: "input_boolean.turn_off", target: { entity_id: "input_boolean.f" },
  });
  assert.equal(emptiedAction({ tank_full_entity: "button.reset" }).perform_action, "button.press");
  assert.equal(emptiedAction({ tank_full_entity: "binary_sensor.full" }), null);
  assert.equal(emptiedAction({ tank_full_entity: "input_boolean.f", tank_emptied_action: { action: "none" } }), null);
  const custom = { action: "perform-action", perform_action: "script.reset_tank" };
  assert.equal(emptiedAction({ tank_full_entity: "input_boolean.f", tank_emptied_action: custom }), custom);
});
