import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_STEPS,
  volumeSteps,
  volumeLimit,
  mediaControls,
  mediaPosition,
  visibleEdges,
  formatOffset,
  nextRepeat,
  nextSource,
  mediaByline,
  currentStationIndex,
  volumeKnobConfig,
  isMediaOff,
  isLive,
} from "../src/utils/media.js";
import { scopeGridColumns, panelCardConfig, KIOSK_MIN_WIDTH } from "../src/cards/art-scope/layout.js";
import { themeSettings, schemeKey } from "../src/utils/art-settings.js";

const player = (attributes, state = "playing") => ({ state, attributes });

test("volume steps prefer volume_steps and fall back to volume_level x 99", () => {
  assert.equal(volumeSteps(player({ volume_steps: 35, volume_level: 0.9 })), 35);
  assert.equal(volumeSteps(player({ volume_steps: "42" })), 42, "template attributes may arrive as strings");
  assert.equal(volumeSteps(player({ volume_level: 0.5 })), 50);
  assert.equal(volumeSteps(player({ volume_level: 1 })), MAX_STEPS);
  assert.equal(volumeSteps(player({ volume_steps: null, volume_level: 0.2 })), 20);
  assert.equal(volumeSteps(player({ volume_steps: "", volume_level: 0.3 })), 30);
  assert.equal(volumeSteps(player({})), 0);
  assert.equal(volumeSteps(undefined), 0);
});

test("volume limit comes from the limit attribute, else the full scale", () => {
  assert.equal(volumeLimit(player({ limit: 70 })), 70);
  assert.equal(volumeLimit(player({ limit: "60" })), 60);
  assert.equal(volumeLimit(player({ limit: 150 })), MAX_STEPS, "capped at the scale");
  assert.equal(volumeLimit(player({ limit: 0 })), MAX_STEPS, "zero is no limit, not mute");
  assert.equal(volumeLimit(player({ limit: "none" })), MAX_STEPS);
  assert.equal(volumeLimit(player({})), MAX_STEPS);
});

test("controls: an explicit controls list wins over supported_features", () => {
  assert.deepEqual(
    mediaControls(player({ controls: ["play_pause"], supported_features: 0xffffff })),
    ["play_pause"]
  );
  assert.deepEqual(mediaControls(player({ controls: [] , supported_features: 0xffffff })), []);
});

test("controls fall back to the MediaPlayerEntityFeature bits", () => {
  // PAUSE | SEEK | PREVIOUS | NEXT | PLAY | SHUFFLE | REPEAT
  const all = 1 | 2 | 16 | 32 | 16384 | 32768 | 262144;
  assert.deepEqual(mediaControls(player({ supported_features: all, media_duration: 200 })), [
    "play_pause",
    "previous",
    "next",
    "seek",
    "shuffle",
    "repeat",
  ]);
  assert.deepEqual(
    mediaControls(player({ supported_features: all })),
    ["play_pause", "previous", "next", "shuffle", "repeat"],
    "seek needs a duration to seek in"
  );
  assert.deepEqual(mediaControls(player({ supported_features: 16384 })), ["play_pause"], "PLAY alone still plays");
  assert.deepEqual(mediaControls(player({ supported_features: 4 | 8 })), [], "volume-only players have no transport");
  assert.deepEqual(mediaControls(undefined), []);
});

test("first/last are computed from VISIBLE buttons only", () => {
  assert.deepEqual(visibleEdges([true, true, true]), { first: 0, last: 2 });
  // shuffle and repeat hidden (radio): the volume button is both ends.
  assert.deepEqual(visibleEdges([false, false, true]), { first: 2, last: 2 });
  // a hidden FIRST sibling must not leave the visible first button square.
  assert.deepEqual(visibleEdges([false, true, true]), { first: 1, last: 2 });
  assert.deepEqual(visibleEdges([true, true, false]), { first: 0, last: 1 });
  assert.deepEqual(visibleEdges([false, false]), { first: -1, last: -1 });
  assert.deepEqual(visibleEdges([]), { first: -1, last: -1 });
});

test("zone offsets carry an explicit sign", () => {
  assert.equal(formatOffset(3), "+3");
  assert.equal(formatOffset(-15), "−15");
  assert.equal(formatOffset(0), "±0");
  assert.equal(formatOffset("-2"), "−2");
  assert.equal(formatOffset(undefined), "");
  assert.equal(formatOffset("x"), "");
});

test("repeat cycles off -> all -> one -> off", () => {
  assert.equal(nextRepeat("off"), "all");
  assert.equal(nextRepeat("all"), "one");
  assert.equal(nextRepeat("one"), "off");
  assert.equal(nextRepeat(undefined), "all");
});

test("source button cycles source_list", () => {
  const s = player({ source: "NET", source_list: ["CD", "NET", "UHD"] });
  assert.equal(nextSource(s), "UHD");
  assert.equal(nextSource(player({ source: "UHD", source_list: ["CD", "NET", "UHD"] })), "CD");
  assert.equal(nextSource(player({ source: "?", source_list: ["CD"] })), "CD");
  assert.equal(nextSource(player({})), null);
});

test("media position advances while playing and stops at the duration", () => {
  const t0 = Date.parse("2026-11-07T12:00:00Z");
  const a = { media_position: 10, media_duration: 100, media_position_updated_at: "2026-11-07T12:00:00Z" };
  assert.equal(mediaPosition(player(a), t0 + 5000), 15);
  assert.equal(mediaPosition(player(a, "paused"), t0 + 5000), 10);
  assert.equal(mediaPosition(player(a), t0 + 500000), 100);
  assert.equal(mediaPosition(player({})), null);
});

test("byline drops an album that repeats the title", () => {
  assert.equal(mediaByline({ media_artist: "A", media_album_name: "B", media_title: "T" }), "A · B");
  assert.equal(mediaByline({ media_artist: "A", media_album_name: "T", media_title: "T" }), "A");
  assert.equal(mediaByline({}), "");
});

test("the current station matches by match key or by name", () => {
  const stations = [{ name: "Radio 1" }, { name: "Klara", match: ["Klara", "Klara Continuo"] }];
  assert.equal(currentStationIndex(stations, player({ media_title: "Radio 1" })), 0);
  assert.equal(currentStationIndex(stations, player({ media_album_name: "Klara Continuo" })), 1);
  assert.equal(currentStationIndex(stations, player({ media_title: "Other" })), -1);
});

test("off and live", () => {
  assert.equal(isMediaOff(player({}, "off")), true);
  assert.equal(isMediaOff(player({}, "unavailable")), true);
  assert.equal(isMediaOff(undefined), true);
  assert.equal(isMediaOff(player({}, "idle")), false);
  assert.equal(isLive(player({ live: true })), true);
  assert.equal(isLive(player({ live: "true" })), true);
  assert.equal(isLive(player({})), false);
});

test("openers build the knob config from their volume block", () => {
  assert.deepEqual(volumeKnobConfig({ entity: "media_player.a" }), {
    type: "custom:materia-volume-knob",
    entity: "media_player.a",
  });
  const zones = [{ entity: "media_player.z1" }, { entity: "media_player.z2" }];
  assert.deepEqual(volumeKnobConfig({ entity: "media_player.a", volume: { zones, style: "arc" } }), {
    type: "custom:materia-volume-knob",
    entity: "media_player.a",
    zones,
    style: "arc",
  });
  assert.equal(volumeKnobConfig({ volume: { zones } }).entity, "media_player.z1");
  assert.equal(volumeKnobConfig({ entity: "media_player.a", volume: { entity: "media_player.b" } }).entity, "media_player.b");
});

test("kiosk panels merge the kiosk's override over the button's request", () => {
  const requested = { type: "custom:materia-volume-knob", entity: "media_player.a", style: "knob" };
  assert.deepEqual(panelCardConfig(requested, { volume: { style: "tap" } }, "volume"), {
    type: "custom:materia-volume-knob",
    entity: "media_player.a",
    style: "tap",
    in_panel: true,
  });
  assert.deepEqual(panelCardConfig(requested, undefined, "volume"), { ...requested, in_panel: true });
  assert.equal(KIOSK_MIN_WIDTH, 900);
});

test("grid columns: a number is equal tracks, a string is used as written", () => {
  assert.equal(scopeGridColumns(3), "repeat(3, minmax(0, 1fr))");
  assert.equal(scopeGridColumns("2"), "repeat(2, minmax(0, 1fr))");
  assert.equal(scopeGridColumns("1fr 1.1fr"), "1fr 1.1fr");
  assert.equal(scopeGridColumns(undefined), "repeat(2, minmax(0, 1fr))");
});

test("Material You settings: per-user helper, then global, then defaults", () => {
  const hass = {
    user: { id: "u1" },
    states: {
      "input_select.material_you_scheme_u1": { state: "Vibrant" },
      "input_select.material_you_scheme": { state: "content" },
      "input_number.material_you_contrast": { state: "0.5" },
      "input_select.material_you_spec": { state: "unknown" },
    },
  };
  assert.deepEqual(themeSettings(hass), { scheme: "Vibrant", contrast: 0.5, spec: "2025", platform: "phone" });
  assert.equal(themeSettings({ user: { id: "u2" }, states: hass.states }).scheme, "content");
  assert.deepEqual(themeSettings(undefined), { scheme: "tonalspot", contrast: 0, spec: "2025", platform: "phone" });
  assert.equal(schemeKey("Tonal Spot"), "tonalspot");
  assert.equal(schemeKey("fruit_salad"), "fruitsalad");
});
