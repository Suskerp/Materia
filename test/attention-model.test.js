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
