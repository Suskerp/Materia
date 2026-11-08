import assert from "node:assert/strict";
import test from "node:test";
import { activeItemIndex, ACTIVE_ATTRIBUTES, currentStationIndex } from "../src/utils/tile-match.js";

const player = (attributes, state = "playing") => ({ state, attributes });
const items = [{ name: "Radio 1" }, { name: "Klara", match: ["Klara", "Klara Continuo"] }, { name: "MNM", match: "MNM" }];

test("default attributes are album, title and channel", () => {
  assert.deepEqual(ACTIVE_ATTRIBUTES, ["media_album_name", "media_title", "media_channel"]);
  assert.equal(activeItemIndex(items, player({ media_title: "Radio 1" })), 0);
  assert.equal(activeItemIndex(items, player({ media_album_name: "Klara Continuo" })), 1);
  assert.equal(activeItemIndex(items, player({ media_channel: "MNM" })), 2);
  assert.equal(activeItemIndex(items, player({ media_artist: "Radio 1" })), -1);
});

test("match wins over name and nothing matches without a player", () => {
  assert.equal(activeItemIndex([{ name: "Klara", match: "Other" }], player({ media_title: "Klara" })), -1);
  assert.equal(activeItemIndex(items, null), -1);
  assert.equal(activeItemIndex(items, undefined, ["media_title"]), -1);
  assert.equal(activeItemIndex(null, player({ media_title: "Radio 1" })), -1);
});

test("custom attributes narrow or widen the comparison", () => {
  assert.equal(activeItemIndex(items, player({ media_title: "Radio 1" }), ["media_artist"]), -1);
  assert.equal(activeItemIndex(items, player({ media_artist: "Radio 1" }), ["media_artist"]), 0);
  assert.equal(activeItemIndex(items, player({ source: "Klara" }), "source"), 1);
  assert.equal(activeItemIndex([{ name: "on" }, { name: "off" }], { state: "off", attributes: {} }, ["state"]), 1);
});

test("currentStationIndex is the default matcher", () => {
  const p = player({ media_album_name: "Klara" });
  assert.equal(currentStationIndex(items, p), activeItemIndex(items, p));
});
