import test from "node:test";
import assert from "node:assert/strict";
import { hasLegacyAlarmCode, sanitizeAlarmConfig } from "../src/cards/alarm/config-policy.js";

test("legacy plaintext alarm codes are detected and removed without changing other settings", () => {
  const original = { type: "custom:materia-alarm", entity: "alarm_control_panel.home", code: "1234", hero: false };
  assert.equal(hasLegacyAlarmCode(original), true);
  assert.deepEqual(sanitizeAlarmConfig(original), {
    type: "custom:materia-alarm",
    entity: "alarm_control_panel.home",
    hero: false,
  });
  assert.equal(original.code, "1234", "sanitizing must not mutate the caller's object");
});

test("safe alarm config remains stable", () => {
  const config = { entity: "alarm_control_panel.home", hold_ms: 800 };
  assert.equal(hasLegacyAlarmCode(config), false);
  assert.deepEqual(sanitizeAlarmConfig(config), config);
});
