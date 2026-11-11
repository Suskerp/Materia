import assert from "node:assert/strict";
import test from "node:test";
import { readWhen, writeWhen } from "../src/cards/attention/when.js";

test("simple tests round-trip through conditions", () => {
  const e = "sensor.plant";
  for (const [when, value] of [["on"], ["off"], ["unavailable"], ["below", 15], ["above", 80], ["is", "error"], ["is_not", "ok"]]) {
    const conditions = writeWhen(e, when, value);
    assert.deepEqual(readWhen({ entity: e, conditions }), value === undefined ? { when } : { when, value });
  }
});

test("anything else is custom; missing input writes nothing", () => {
  assert.equal(readWhen({ entity: "a.b", conditions: [{ condition: "state", entity: "x.y", state: "on" }] }).when, "custom");
  assert.equal(readWhen({ entity: "a.b", conditions: [{ condition: "or", conditions: [] }] }).when, "custom");
  assert.equal(readWhen({ entity: "a.b", conditions: [{}, {}] }).when, "custom");
  assert.equal(writeWhen("a.b", "below", ""), null);
  assert.equal(writeWhen("", "on"), null);
  assert.equal(readWhen({}).when, "on");
});
