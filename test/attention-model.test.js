import assert from "node:assert/strict";
import test from "node:test";
import { activeItems } from "../src/cards/attention/model.js";

const hass = { states: {
  "sensor.plant": { entity_id: "sensor.plant", state: "9" },
  "lock.door": { entity_id: "lock.door", state: "unlocked" },
} };

test("rules show only while their conditions hold, most urgent first", () => {
  const items = [
    { name: "Plant", level: "warning", conditions: [{ condition: "numeric_state", entity: "sensor.plant", below: 15 }] },
    { name: "Wet", level: "urgent", conditions: [{ condition: "numeric_state", entity: "sensor.plant", above: 80 }] },
    { name: "Door", level: "urgent", conditions: [{ condition: "state", entity: "lock.door", state: "unlocked" }] },
    { name: "No conditions" },
  ];
  assert.deepEqual(activeItems(items, hass).map((i) => i.name), ["Door", "Plant"]);
});

test("a vacuum item expands to the hero's alerts in levels", () => {
  const items = [
    { name: "Info", level: "info", conditions: [{ condition: "state", entity: "lock.door", state: "unlocked" }] },
    { type: "vacuum", entity: "vacuum.r" },
  ];
  const fake = () => [
    { text: "Dock error", severity: "error", icon: "mdi:x", entity: "sensor.dock" },
    { text: "Filter", severity: "warning", icon: "mdi:y", entity: "sensor.f", reset: "button.f" },
  ];
  const out = activeItems(items, hass, fake);
  assert.deepEqual(out.map((i) => [i.name, i.level]), [["Dock error", "urgent"], ["Filter", "warning"], ["Info", "info"]]);
  assert.equal(out[1].reset, "button.f");
  assert.deepEqual(out[0].tap_action, { action: "more-info", entity: "vacuum.r" });
});

test("for_minutes: shows only once the entity has held its state that long", () => {
  const now = Date.parse("2026-11-11T12:10:00Z");
  const hass = { states: { "binary_sensor.door": { entity_id: "binary_sensor.door", state: "on", last_changed: "2026-11-11T12:08:00Z" } } };
  const rule = (m) => [{ name: "Door", entity: "binary_sensor.door", for_minutes: m, conditions: [{ condition: "state", entity: "binary_sensor.door", state: "on" }] }];
  assert.equal(activeItems(rule(3), hass, () => [], now).length, 0);
  assert.equal(activeItems(rule(2), hass, () => [], now).length, 1);
});

test("errors_only keeps just the vacuum's red alerts", () => {
  const fake = () => [
    { text: "Stuck", severity: "error", icon: "mdi:x", entity: "sensor.err" },
    { text: "Filter", severity: "warning", icon: "mdi:y", entity: "sensor.f" },
  ];
  const out = activeItems([{ type: "vacuum", entity: "vacuum.r", errors_only: true }], { states: {} }, fake);
  assert.deepEqual(out.map((i) => i.name), ["Stuck"]);
});

test("triggeringEntities lists only the met leaves", async () => {
  const { triggeringEntities } = await import("../src/utils/conditions.js");
  const hass = { states: { "sensor.a": { state: "15" }, "sensor.b": { state: "80" }, "sensor.c": { state: "5" } } };
  const c = [{ condition: "or", conditions: ["sensor.a", "sensor.b", "sensor.c"].map((e) => ({ condition: "numeric_state", entity: e, below: 20 })) }];
  assert.deepEqual(triggeringEntities(c, hass), ["sensor.a", "sensor.c"]);
});

test("triggeringEntities(all) lists every watched entity", async () => {
  const { triggeringEntities } = await import("../src/utils/conditions.js");
  const hass = { states: { "sensor.a": { state: "15" }, "sensor.b": { state: "80" } } };
  const c = [{ condition: "or", conditions: ["sensor.a", "sensor.b"].map((e) => ({ condition: "numeric_state", entity: e, below: 20 })) }];
  assert.deepEqual(triggeringEntities(c, hass, true), ["sensor.a", "sensor.b"]);
});
