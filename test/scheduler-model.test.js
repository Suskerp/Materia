import test from "node:test";
import assert from "node:assert/strict";
import {
  addPresetOffset,
  isSpentOneShot,
  oneShotMarker,
  oneShotPayload,
  toSchedulerActions,
  parseOneShotMarker,
  parsePlanArrivalMarker,
  planPayloads,
} from "../src/cards/schedule/scheduler-model.js";

process.env.TZ = "Europe/Brussels";

test("one-day presets preserve wall-clock time across DST", () => {
  const beforeSpring = new Date("2026-03-28T09:00:00+01:00");
  const afterSpring = addPresetOffset(beforeSpring, 1, "d");
  assert.equal(afterSpring.getHours(), 9);
  assert.equal(afterSpring.getDate(), 29);
  assert.equal(afterSpring.getTime() - beforeSpring.getTime(), 23 * 60 * 60 * 1000);
});

test("one-shot payload is local, point-in-time, and self deleting", () => {
  const when = new Date(2026, 9, 25, 18, 30);
  const payload = oneShotPayload({
    name: "Arrive home",
    when,
    actions: [{ service: "script.turn_on", entity_id: "script.arrive_home" }],
    tags: ["materia_house"],
  });

  assert.equal(payload.repeat_type, "single");
  assert.equal(payload.start_date, "2026-10-25");
  assert.equal(payload.end_date, "2026-10-25");
  assert.deepEqual(payload.weekdays, ["daily"]);
  assert.equal(payload.timeslots[0].start, "18:30");
  assert.equal(payload.timeslots[0].stop, undefined);
  assert.equal(parseOneShotMarker(payload.tags).getTime(), when.getTime());
});

test("a multi-phase plan creates separately timed entries with one group", () => {
  const arrival = new Date(Date.now() + 4 * 60 * 60 * 1000);
  arrival.setSeconds(0, 0);
  const payloads = planPayloads({
    plan: {
      key: "coming-home",
      name: "Coming home",
      phases: [
        { name: "Prepare", offset_minutes: -120, action: { service: "script.turn_on", entity_id: "script.prepare_home" } },
        { name: "Arrive", offset_minutes: 0, action: { service: "script.turn_on", entity_id: "script.arrive_home" } },
      ],
    },
    arrival,
    managerTag: "materia_house",
    instanceId: "test",
  });

  assert.equal(payloads.length, 2);
  assert.equal(payloads[0].timeslots[0].actions[0].entity_id, "script.prepare_home");
  assert.equal(payloads[1].timeslots[0].actions[0].entity_id, "script.arrive_home");
  assert(payloads.every((payload) => payload.tags.includes("materia_house")));
  assert.equal(new Set(payloads.map((payload) => payload.tags.find((tag) => tag.startsWith("materia_plan_")))).size, 1);
  assert.equal(parsePlanArrivalMarker(payloads[0].tags).getTime(), arrival.getTime());
});

test("a plan is rejected when an offset has already elapsed", () => {
  assert.throws(() => planPayloads({
    plan: {
      key: "too-late",
      phases: [{ name: "Prepare", offset_minutes: -120, action: { service: "script.turn_on", entity_id: "script.prepare_home" } }],
    },
    arrival: new Date(Date.now() + 30 * 60 * 1000),
    instanceId: "test",
  }), /future/);
});

test("HA's action picker output becomes Scheduler actions, one per entity", () => {
  assert.deepEqual(toSchedulerActions({
    action: "perform-action",
    perform_action: "light.turn_on",
    target: { entity_id: ["light.hall", "light.living"] },
    data: { brightness_pct: 60 },
  }), [
    { service: "light.turn_on", service_data: { brightness_pct: 60 }, entity_id: "light.hall" },
    { service: "light.turn_on", service_data: { brightness_pct: 60 }, entity_id: "light.living" },
  ]);
  assert.deepEqual(toSchedulerActions({ action: "perform-action", perform_action: "light.turn_on", target: { area_id: "living" } }), [
    { service: "light.turn_on", service_data: { area_id: "living" } },
  ]);
  assert.deepEqual(toSchedulerActions({ service: "switch.turn_on", entity_id: "switch.pump" }), [
    { service: "switch.turn_on", entity_id: "switch.pump" },
  ]);
  assert.deepEqual(toSchedulerActions([{ action: "navigate" }, null]), []);
});

test("a moment card's steps make self-deleting one-shots that share one group", () => {
  const arrival = new Date(Date.now() + 6 * 60 * 60 * 1000);
  arrival.setSeconds(0, 0);
  const payloads = planPayloads({
    plan: {
      key: "moment",
      name: "Arriving home",
      phases: [
        { offset_minutes: -180, action: { action: "perform-action", perform_action: "climate.set_hvac_mode", target: { entity_id: "climate.living" }, data: { hvac_mode: "heat" } } },
        { offset_minutes: 0, action: { action: "perform-action", perform_action: "light.turn_on", target: { entity_id: "light.hall" } } },
      ],
    },
    arrival,
    managerTag: "materia_moment_abc",
    instanceId: "t",
  });
  assert(payloads.every((p) => p.repeat_type === "single" && p.start_date === p.end_date));
  assert.equal(payloads[0].timeslots[0].actions[0].service, "climate.set_hvac_mode");
  assert.equal(parsePlanArrivalMarker(payloads[0].tags).getTime(), arrival.getTime());
  assert(payloads.every((p) => p.tags.includes("materia_moment_abc") && p.tags.some((tag) => tag.startsWith("materia_plan_moment_"))));
});

test("a one-shot that missed its moment no longer counts as scheduled", () => {
  const now = new Date(2026, 10, 14, 18, 0).getTime();
  assert.equal(isSpentOneShot([oneShotMarker(new Date(2026, 10, 14, 17, 50))], now), true);
  assert.equal(isSpentOneShot([oneShotMarker(new Date(2026, 10, 14, 17, 58))], now), false);
  assert.equal(isSpentOneShot([oneShotMarker(new Date(2026, 10, 14, 19, 0))], now), false);
  assert.equal(isSpentOneShot(["materia_window_0900_1000"], now), false);
});
