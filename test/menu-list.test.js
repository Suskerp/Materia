import assert from "node:assert/strict";
import test from "node:test";
import {
  menuRows,
  entityRows,
  allRows,
  rowOn,
  anyOn,
  allTargets,
  switchService,
  menuPlacement,
  sourceList,
  sourceMode,
  segClass,
} from "../src/elements/menu-list/model.js";

const states = {
  "media_player.a": { state: "on" },
  "media_player.b": { state: "off" },
  "media_player.c": { state: "playing" },
  "input_boolean.link": { state: "on" },
};

test("menuRows takes ids, objects, dividers and all; else the fallback", () => {
  assert.deepEqual(
    menuRows(["media_player.a", { entity: "input_boolean.link", name: "L", in_all: false }, { type: "divider" }, { type: "all" }, null, {}], "x"),
    [
      { type: "entity", entity: "media_player.a" },
      { type: "entity", entity: "input_boolean.link", name: "L", in_all: false },
      { type: "divider" },
      { type: "all" },
    ]
  );
  assert.deepEqual(menuRows(undefined, "media_player.a"), [{ type: "entity", entity: "media_player.a" }]);
  assert.deepEqual(menuRows([], undefined), []);
});

test("all off / all on covers the rows not excluded with in_all: false", () => {
  const rows = menuRows(["media_player.a", "media_player.b", "media_player.c", { entity: "input_boolean.link", in_all: false }, { type: "all" }]);
  assert.equal(entityRows(rows).length, 4);
  const all = allRows(rows);
  assert.deepEqual(all.map((r) => r.entity), ["media_player.a", "media_player.b", "media_player.c"]);
  assert.equal(anyOn(all, states), true);
  assert.deepEqual(allTargets(all, states, true), ["media_player.a", "media_player.c"]);
  assert.deepEqual(allTargets(all, states, false), ["media_player.b"]);
  assert.equal(anyOn(menuRows(["media_player.b"]), states), false);
});

test("rowOn reads players and toggles; switchService picks the domain", () => {
  assert.equal(rowOn("media_player.c", states["media_player.c"]), true);
  assert.equal(rowOn("media_player.b", states["media_player.b"]), false);
  assert.equal(rowOn("input_boolean.link", { state: "on" }), true);
  assert.equal(rowOn("switch.x", { state: "off" }), false);
  assert.equal(rowOn("switch.x", undefined), false);
  assert.deepEqual(switchService("media_player.a", true), ["media_player", "turn_on"]);
  assert.deepEqual(switchService("input_boolean.link", false), ["homeassistant", "turn_off"]);
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
