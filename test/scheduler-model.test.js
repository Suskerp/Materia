import test from "node:test";
import assert from "node:assert/strict";
import {
  addPresetOffset,
  oneShotPayload,
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
