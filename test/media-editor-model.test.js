import assert from "node:assert/strict";
import test from "node:test";
import {
  toolbarList,
  toggleToolbarBuiltin,
  toolbarCustoms,
  setToolbarCustoms,
  stationFormData,
  stationFromForm,
  inheritScopeEntity,
} from "../src/utils/media-editor-model.js";
import { volumePanelCard } from "../src/utils/media.js";

const power = { icon: "mdi:power", tap_action: { action: "toggle" } };

test("toolbar: absent buttons means the default, an empty list means none", () => {
  assert.deepEqual(toolbarList(undefined), ["shuffle", "repeat", "volume"]);
  assert.deepEqual(toolbarList([]), []);
});

test("toolbar: built-ins toggle in canonical order and keep custom slots", () => {
  assert.deepEqual(toggleToolbarBuiltin(undefined, "shuffle", false), ["repeat", "volume"]);
  assert.deepEqual(toggleToolbarBuiltin(["repeat", "volume"], "shuffle", true), ["shuffle", "repeat", "volume"]);
  assert.deepEqual(toggleToolbarBuiltin(["shuffle", power, "volume"], "repeat", true), ["shuffle", "repeat", power, "volume"]);
  assert.deepEqual(toggleToolbarBuiltin([power], "volume", true), ["volume", power], "built-ins first");
  const list = ["shuffle", "repeat", "volume"];
  assert.equal(toggleToolbarBuiltin(list, "volume", true).length, 3, "already on: no duplicate");
});

test("toolbar: custom buttons refill their slots, new ones append", () => {
  const list = ["shuffle", power, "volume"];
  assert.deepEqual(toolbarCustoms(list), [power]);
  const mute = { icon: "mdi:volume-off" };
  assert.deepEqual(setToolbarCustoms(list, [mute, power]), ["shuffle", mute, "volume", power]);
  assert.deepEqual(setToolbarCustoms(list, []), ["shuffle", "volume"]);
  assert.deepEqual(setToolbarCustoms(undefined, [power]), ["shuffle", "repeat", "volume", power]);
});

test("stations: the short action form round-trips until the action is edited", () => {
  const st = { name: "Klara", image: "/local/k.png", action: "script.klara", data: { a: 1 } };
  const form = stationFormData(st);
  assert.deepEqual(form.tap_action, { action: "perform-action", perform_action: "script.klara", data: { a: 1 } });
  // Editing only the name keeps the short form.
  assert.deepEqual(stationFromForm(st, { ...form, name: "Klara!" }), { ...st, name: "Klara!" });
  // Editing the action writes tap_action and drops the short form.
  const edited = stationFromForm(st, { ...form, tap_action: { action: "more-info" } });
  assert.deepEqual(edited, { name: "Klara", image: "/local/k.png", tap_action: { action: "more-info" } });
  // A station with tap_action is left as it is.
  const modern = { name: "R1", tap_action: { action: "perform-action", perform_action: "script.r1" } };
  assert.equal(stationFormData(modern), modern);
  assert.deepEqual(stationFromForm(modern, modern), modern);
});

test("the art scope fills in its entity on media cards that have none, also in stacks", () => {
  const e = "media_player.living";
  assert.deepEqual(inheritScopeEntity({ type: "custom:materia-media", variant: "player" }, e), {
    type: "custom:materia-media",
    variant: "player",
    entity: e,
  });
  const own = { type: "custom:materia-media", entity: "media_player.other" };
  assert.equal(inheritScopeEntity(own, e), own, "an own entity wins");
  const connected = { type: "custom:materia-button-group", options: [] };
  assert.equal(inheritScopeEntity(connected, e), connected, "a connected button group is not a media card");
  assert.equal(inheritScopeEntity({ type: "custom:materia-button-group", group: "toolbar" }, e).entity, e);
  const stack = { type: "vertical-stack", cards: [{ type: "custom:materia-media-progress" }, { type: "markdown" }] };
  const out = inheritScopeEntity(stack, e);
  assert.equal(out.cards[0].entity, e);
  assert.equal(out.cards[1], stack.cards[1]);
  assert.equal(stack.cards[0].entity, undefined, "the original config is not mutated");
});

test("a volume button without a host panel opens the player's volume control", () => {
  assert.deepEqual(volumePanelCard("media_player.a"), { type: "custom:materia-volume", entity: "media_player.a" });
});
