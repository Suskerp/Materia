import assert from "node:assert/strict";
import test from "node:test";
import { inputValue, serviceData, CLEARED_DATETIME } from "../src/cards/time-input/model.js";

test("inputValue maps input_datetime states to native input values", () => {
  assert.equal(inputValue("2026-11-14 18:30:00", "datetime"), "2026-11-14T18:30");
  assert.equal(inputValue("2026-11-14", "date"), "2026-11-14");
  assert.equal(inputValue("22:00:00", "time"), "22:00");
  assert.equal(inputValue("2026-11-14 18:30:00", "time"), "18:30");
  assert.equal(inputValue("unknown", "datetime"), "");
});

test("serviceData builds set_datetime data per kind", () => {
  assert.deepEqual(serviceData("2026-11-14T18:30", "datetime"), { datetime: "2026-11-14 18:30:00" });
  assert.deepEqual(serviceData("2026-11-14", "date"), { date: "2026-11-14" });
  assert.deepEqual(serviceData("22:00", "time"), { time: "22:00:00" });
  assert.equal(serviceData("", "datetime"), null);
});

test("clearing writes a fixed moment far in the past", () => {
  assert.equal(CLEARED_DATETIME, "2000-01-01 00:00:00");
  assert.ok(new Date(CLEARED_DATETIME.replace(" ", "T")).getTime() < Date.now());
});
