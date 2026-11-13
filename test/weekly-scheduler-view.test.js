import test from "node:test";
import assert from "node:assert/strict";
import { slotAt, where, planMatchesDay, hhmm, sameDay } from "../src/cards/weekly-scheduler/view-model.js";
import { quickTemperatures } from "../src/cards/weekly-scheduler/controls.js";

const b = (from, to, temperature = 18) => ({ from: `${from}:00`, to: `${to}:00`, data: { temperature } });

test("a tap on empty time starts on the half hour and stops at the next period", () => {
  const day = [b("08:00", "21:00")];
  assert.deepEqual(slotAt(day, 0.25), { from: "06:00", to: "08:00" });
  assert.deepEqual(slotAt(day, 0.9), { from: "21:30", to: "23:30" });
  assert.equal(slotAt(day, 0.5), null);
  assert.deepEqual(slotAt([], 0.99), { from: "23:30", to: "24:00" });
});

test("where finds the current and next period", () => {
  const day = [b("06:00", "08:00"), b("20:00", "23:00")];
  assert.deepEqual(where(day, 7 * 60), { current: 0, next: 1 });
  assert.deepEqual(where(day, 12 * 60), { current: -1, next: 1 });
  assert.deepEqual(where(day, 23 * 60 + 30), { current: -1, next: -1 });
});

test("a plan matches today when every group already runs its pattern", () => {
  const lookup = {
    "schedule.bed": { wednesday: [b("08:00", "21:00")] },
    "schedule.bed_home": { monday: [b("08:00", "21:00")] },
    "schedule.living": { wednesday: [] },
    "schedule.living_home": { monday: [b("17:00", "22:00")] },
  };
  const plan = { groups: [{ schedule: "schedule.bed", source: "schedule.bed_home" }] };
  assert.equal(planMatchesDay(plan, lookup, 2), true);
  assert.equal(planMatchesDay({ groups: [...plan.groups, { schedule: "schedule.living", source: "schedule.living_home" }] }, lookup, 2), false);
  assert.equal(planMatchesDay({ groups: [] }, lookup, 2), false);
});

test("helpers", () => {
  assert.equal(hhmm(1440), "24:00");
  assert.equal(sameDay([b("08:00", "09:00")], [{ from: "08:00", to: "09:00", data: { temperature: 18 } }]), true);
  assert.deepEqual(quickTemperatures({}, 5, 35, "°C"), [16, 18, 20, 22]);
  assert.deepEqual(quickTemperatures({}, 17, 21, "°C"), [18, 20]);
});

test("sameOnDays finds the days that share a period", async () => {
  const { sameOnDays } = await import("../src/cards/weekly-scheduler/view-model.js");
  const p = { from: "06:00:00", to: "07:00:00", data: { temperature: 18 } };
  const week = { monday: [p], tuesday: [{ ...p }], wednesday: [{ ...p, data: { temperature: 20 } }], thursday: [] };
  assert.deepEqual(sameOnDays(week, p, 0), [0, 1]);
  assert.deepEqual(sameOnDays(week, p, 3), [0, 1, 3]);
});
