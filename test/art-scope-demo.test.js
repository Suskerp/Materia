import assert from "node:assert/strict";
import test from "node:test";
import { demoInitial, demoReduce, stationsIn } from "../src/cards/art-scope/demo.js";

const cards = [{ type: "custom:materia-media-header", stations: [
  { name: "Radio 1", image: "/r1.png", tap_action: { action: "perform-action", data: { media_id: "library://radio/3" } } },
  { name: "Klara", image: "/k.png", tap_action: { action: "perform-action", data: { media_id: "library://radio/6" } } },
] }];

test("demo player reacts to calls without reaching HA", () => {
  const stations = stationsIn(cards);
  assert.equal(stations.length, 2);
  let st = demoInitial("media_player.x", null, stations);
  assert.equal(st.attributes.media_title, "Radio 1");
  st = demoReduce(st, "music_assistant", "play_media", { media_id: "library://radio/6" }, stations);
  assert.equal(st.attributes.media_title, "Klara");
  st = demoReduce(st, "media_player", "media_play_pause", {}, stations);
  assert.equal(st.state, "paused");
  st = demoReduce(st, "media_player", "volume_up", {}, stations);
  assert.equal(st.attributes.volume_level, 0.35);
  st = demoReduce(st, "media_player", "media_next_track", {}, stations);
  assert.equal(st.attributes.media_title, "Radio 1");
  st = demoReduce(st, "media_player", "select_source", { source: "TV" }, stations);
  assert.equal(st.attributes.source, "TV");
  st = demoReduce(st, "media_player", "turn_off", {}, stations);
  assert.equal(st.state, "off");
  assert.equal(demoReduce(st, "light", "turn_on", {}, stations), st);
});
