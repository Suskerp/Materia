import assert from "node:assert/strict";
import test from "node:test";
import { MAX_STEPS } from "../src/utils/media.js";
import {
  volumeStyle,
  polar,
  DIAL_TICKS,
  DIAL_KNURL,
  clampVolume,
  showsLimit,
  barLevel,
  reportedArc,
  barFraction,
  keyStep,
  zoneLabel,
} from "../src/utils/volume-control.js";
import { inheritScopeEntity } from "../src/utils/media-editor-model.js";

test("volumeStyle: knob by default, arc and tap when named", () => {
  assert.equal(volumeStyle(undefined), "knob");
  assert.equal(volumeStyle("dial"), "knob");
  assert.equal(volumeStyle("arc"), "arc");
  assert.equal(volumeStyle("tap"), "tap");
});

test("dial geometry: 31 ticks over the sweep, 60 knurls, majors every fifth", () => {
  assert.equal(DIAL_TICKS.length, 31);
  assert.equal(DIAL_TICKS[0].v, 0);
  assert.equal(DIAL_TICKS[30].v, MAX_STEPS);
  assert.equal(DIAL_TICKS.filter((t) => t.major).length, 7);
  assert.equal(DIAL_KNURL.length, 60);
  assert.equal(DIAL_KNURL.filter((k) => k.major).length, 12);
  const [x, y] = polar(100, 0);
  assert.equal(x, 250);
  assert.equal(y, 150);
});

test("clampVolume rounds to whole steps within 0 … limit", () => {
  assert.equal(clampVolume(12.4, 60), 12);
  assert.equal(clampVolume(-3, 60), 0);
  assert.equal(clampVolume(70, 60), 60);
});

test("showsLimit: arc always below MAX_STEPS, knob and tap only at the limit", () => {
  assert.equal(showsLimit("arc", 0, MAX_STEPS - 10), true);
  assert.equal(showsLimit("arc", 0, MAX_STEPS), false);
  assert.equal(showsLimit("knob", 49, 50), false);
  assert.equal(showsLimit("knob", 50, 50), true);
  assert.equal(showsLimit("tap", 49.6, 50), true);
  assert.equal(showsLimit("tap", MAX_STEPS, MAX_STEPS), false);
});

test("barLevel and reportedArc scale to the limit and rest while off", () => {
  assert.equal(barLevel(25, 50, false), 0.5);
  assert.equal(barLevel(80, 50, false), 1);
  assert.equal(barLevel(25, 50, true), 0);
  assert.equal(reportedArc(25, 50, false), MAX_STEPS / 2);
  assert.equal(reportedArc(25, 50, true), 0.001);
  assert.equal(reportedArc(0, 50, false), 0.001);
});

test("barFraction: 0 at the bottom, 1 at the top, clamped", () => {
  assert.equal(barFraction(200, 100, 100), 0);
  assert.equal(barFraction(100, 100, 100), 1);
  assert.equal(barFraction(150, 100, 100), 0.5);
  assert.equal(barFraction(0, 100, 100), 1);
  assert.equal(barFraction(300, 100, 100), 0);
});

test("keyStep: arrows one step, page keys five", () => {
  assert.equal(keyStep("ArrowUp"), 1);
  assert.equal(keyStep("ArrowLeft"), -1);
  assert.equal(keyStep("PageUp"), 5);
  assert.equal(keyStep("PageDown"), -5);
  assert.equal(keyStep("Enter"), 0);
});

test("zoneLabel: own name, friendly name, entity id", () => {
  const hass = { states: { "media_player.a": { attributes: { friendly_name: "Living" } } } };
  assert.equal(zoneLabel({ entity: "media_player.a", name: "Zone 1" }, hass), "Zone 1");
  assert.equal(zoneLabel({ entity: "media_player.a" }, hass), "Living");
  assert.equal(zoneLabel({ entity: "media_player.b" }, hass), "media_player.b");
  assert.equal(zoneLabel(undefined, hass), "");
});

test("materia-volume takes the art scope's player when it names none", () => {
  assert.deepEqual(inheritScopeEntity({ type: "custom:materia-volume" }, "media_player.a"), {
    type: "custom:materia-volume",
    entity: "media_player.a",
  });
});
