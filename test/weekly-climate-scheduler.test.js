import test from "node:test";
import assert from "node:assert/strict";

import { validateBlock, segmentPlacement, applyPreset, copyDays } from "../src/cards/weekly-scheduler/model.js";

const block = (from, to, temperature = 20) => ({ from, to, data: { temperature } });

test("accepts adjacent periods and rejects overlap", () => {
  assert.equal(validateBlock(block("07:00", "09:00"), [block("09:00", "12:00")]), null);
  assert.equal(validateBlock(block("08:00", "10:00"), [block("09:00", "12:00")]), "overlap");
});

test("rejects reversed intervals and temperatures outside climate range", () => {
  assert.equal(validateBlock(block("10:00", "09:00")), "time");
  assert.equal(validateBlock(block("07:00", "09:00", 36)), "temperature");
});

test("timeline uses true day percentages and suppresses labels in narrow blocks", () => {
  const morning = segmentPlacement(block("06:30", "07:30"));
  assert.equal(morning.left, "27.083333333333332%");
  assert.equal(morning.width, "4.166666666666667%");
  assert.equal(morning.short, true);
});

test("a one-day preset preserves the other days and never mutates its source", () => {
  const original = { monday: [block("06:30", "07:30")], tuesday: [block("19:00", "22:00")] };
  const source = { monday: [block("09:00", "17:00", 18)] };
  const result = applyPreset(original, source, 0);
  assert.deepEqual(result.monday, source.monday);
  assert.deepEqual(result.tuesday, original.tuesday);
  result.monday[0].data.temperature = 25;
  assert.equal(source.monday[0].data.temperature, 18);
});

test("a whole-week preset clears days absent in the source", () => {
  const result = applyPreset({ saturday: [block("07:00", "23:00")] }, { monday: [block("06:00", "08:00")] }, 0, "week");
  assert.deepEqual(result.saturday, []);
});

test("copying to several days preserves unselected days and creates independent blocks", () => {
  const source = { monday: [block("06:30", "07:30", 18)], saturday: [block("10:00", "12:00", 19)] };
  const result = copyDays(source, 0, [1, 2, 3]);
  assert.deepEqual(result.tuesday, source.monday);
  assert.deepEqual(result.thursday, source.monday);
  assert.deepEqual(result.saturday, source.saturday);
  result.tuesday[0].data.temperature = 23;
  assert.equal(result.wednesday[0].data.temperature, 18);
  assert.equal(source.monday[0].data.temperature, 18);
});

test("a daily Workday preset also works on Sunday without clearing other days", () => {
  const source = { monday: [block('17:00', '21:00', 18)], sunday: [] };
  const current = { tuesday: [block('09:00', '12:00', 20)] };
  const result = applyPreset(current, source, 6);
  assert.deepEqual(result.sunday, source.monday);
  assert.deepEqual(result.tuesday, current.tuesday);
  result.sunday[0].data.temperature = 25;
  assert.equal(source.monday[0].data.temperature, 18);
  const week = applyPreset(current, source, 6, 'week');
  assert.deepEqual(week.sunday, []);
});

test("explicit preset source days and all-off presets retain their meaning", () => {
  const source = { monday: [block('07:00', '09:00')], saturday: [block('10:00', '15:00')] };
  assert.deepEqual(applyPreset({}, source, 6, 'day', 'saturday').sunday, source.saturday);
  assert.deepEqual(applyPreset({ sunday: source.monday }, {}, 6).sunday, []);
});
