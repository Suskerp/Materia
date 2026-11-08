import assert from "node:assert/strict";
import test from "node:test";
import {
  powerZones,
  anyZoneOn,
  allPowerTargets,
  menuPlacement,
  sourceList,
  sourceMode,
  segClass,
} from "../src/elements/power-menu/model.js";

const states = {
  "media_player.a": { state: "on" },
  "media_player.b": { state: "off" },
  "media_player.c": { state: "playing" },
};

test("powerZones takes ids and objects, else the fallback", () => {
  assert.deepEqual(powerZones(["media_player.a", { entity: "media_player.b", name: "B" }, null, {}], "x"), [
    { entity: "media_player.a" },
    { entity: "media_player.b", name: "B" },
  ]);
  assert.deepEqual(powerZones(undefined, "media_player.a"), [{ entity: "media_player.a" }]);
  assert.deepEqual(powerZones([], undefined), []);
});

test("all off switches the zones that are on; all on the ones that are off", () => {
  const zones = powerZones(["media_player.a", "media_player.b", "media_player.c"]);
  assert.equal(anyZoneOn(zones, states), true);
  assert.deepEqual(allPowerTargets(zones, states, true), ["media_player.a", "media_player.c"]);
  assert.deepEqual(allPowerTargets(zones, states, false), ["media_player.b"]);
  assert.equal(anyZoneOn(powerZones(["media_player.b"]), states), false);
});

test("menuPlacement aligns the menu to the button and keeps it on screen", () => {
  const rect = { left: 300, right: 348, bottom: 100 };
  assert.deepEqual(menuPlacement(rect, 1000), { top: 108, left: 100, width: 248 });
  assert.deepEqual(menuPlacement(rect, 1000, 248, "start"), { top: 108, left: 300, width: 248 });
  assert.equal(menuPlacement({ left: 0, right: 48, bottom: 0 }, 1000).left, 8);
  assert.equal(menuPlacement({ left: 900, right: 948, bottom: 0 }, 1000, 248, "start").left, 744);
});

test("source helpers", () => {
  assert.deepEqual(sourceList({ attributes: { source_list: ["A", "B"] } }), ["A", "B"]);
  assert.deepEqual(sourceList({ attributes: {} }), []);
  assert.equal(sourceMode({ mode: "menu" }), "menu");
  assert.equal(sourceMode({}), "cycle");
});

test("segClass marks connected-pair members only", () => {
  assert.equal(segClass("iconbtn", undefined), "iconbtn");
  assert.equal(segClass("iconbtn", "first "), "iconbtn seg first ");
});
