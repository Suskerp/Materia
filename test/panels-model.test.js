import assert from "node:assert/strict";
import test from "node:test";
import {
  panelList,
  panelView,
  patchPanel,
  panelsFromList,
  renamePanel,
  addPanel,
  removePanel,
  setPanel,
  freePanelId,
} from "../src/utils/panels-model.js";
import { powerEntryForm, powerEntryFromForm, tileItemForm, tileItemFromForm, alertForm, alertFromForm } from "../src/utils/media-editor-model.js";

const CHIP = { type: "custom:materia-toggle-chip", entity: "input_boolean.link", variant: "switch" };
const SWITCHER = { type: "custom:materia-switcher", bar: "connected", items: [{ name: "Living" }] };
const PANELS = {
  volume: { heading: "Volume", actions: [CHIP], cards: [SWITCHER] },
  stations: { type: "custom:materia-station-grid", stations: [] },
  one: { heading: "One", card: { type: "markdown", content: "x" }, extra: 1 },
};

test("the registry round-trips through the list unchanged", () => {
  assert.deepEqual(panelsFromList(panelList(PANELS)), PANELS);
  assert.deepEqual(Object.keys(panelsFromList(panelList(PANELS))), ["volume", "stations", "one"]);
  assert.equal(panelsFromList([]), undefined);
  assert.deepEqual(panelList(undefined), []);
});

test("every entry form shows as heading, actions, cards, head", () => {
  assert.deepEqual(panelView(PANELS.volume), { heading: "Volume", actions: [CHIP], cards: [SWITCHER], head: true });
  assert.deepEqual(panelView(PANELS.stations), { heading: "", actions: [], cards: [PANELS.stations], head: true });
  assert.deepEqual(panelView(PANELS.one).cards, [{ type: "markdown", content: "x" }]);
  assert.equal(panelView({ head: false, cards: [] }).head, false);
});

test("patching keeps the entry's form and unknown keys", () => {
  // A no-op patch on each form gives the same entry back.
  for (const e of Object.values(PANELS)) {
    const v = panelView(e);
    assert.deepEqual(patchPanel(e, { heading: v.heading, actions: v.actions, cards: v.cards, head: v.head }), e);
  }
  assert.deepEqual(patchPanel(PANELS.one, { heading: "Two" }), { ...PANELS.one, heading: "Two" });
  // card: becomes cards: once there are two
  const two = patchPanel(PANELS.one, { cards: [{ type: "a" }, { type: "b" }] });
  assert.deepEqual(two, { heading: "One", cards: [{ type: "a" }, { type: "b" }], extra: 1 });
  // a bare card gains a heading: it becomes { heading, cards }
  assert.deepEqual(patchPanel(PANELS.stations, { heading: "Zenders" }), { cards: [PANELS.stations], heading: "Zenders" });
  // empty heading / actions and head: true are absent keys
  assert.deepEqual(patchPanel(PANELS.volume, { heading: "", actions: [] }), { cards: [SWITCHER] });
  assert.deepEqual(patchPanel({ cards: [] }, { head: false }), { cards: [], head: false });
  assert.deepEqual(patchPanel({ cards: [], head: false }, { head: true }), { cards: [] });
});

test("rename keeps order and refuses empty or taken ids", () => {
  const next = renamePanel(PANELS, "stations", " radio ");
  assert.deepEqual(Object.keys(next), ["volume", "radio", "one"]);
  assert.equal(next.radio, PANELS.stations);
  assert.equal(renamePanel(PANELS, "stations", "volume"), null);
  assert.equal(renamePanel(PANELS, "stations", "  "), null);
  assert.equal(renamePanel(PANELS, "stations", "stations"), PANELS);
  assert.equal(Object.keys(renamePanel(PANELS, "one", "a b"))[2], "a_b");
});

test("add, remove and set", () => {
  assert.equal(freePanelId({ panel: {}, panel_2: {} }), "panel_3");
  const { id, panels } = addPanel(PANELS);
  assert.equal(id, "panel");
  assert.deepEqual(panels.panel, { cards: [] });
  assert.equal(addPanel(undefined).id, "panel");
  assert.deepEqual(Object.keys(removePanel(PANELS, "volume")), ["stations", "one"]);
  assert.equal(removePanel({ a: {} }, "a"), undefined);
  assert.deepEqual(Object.keys(setPanel(PANELS, "stations", { cards: [] })), ["volume", "stations", "one"]);
});

test("power rows round-trip ids and { entity, name }", () => {
  assert.deepEqual(powerEntryForm("media_player.a"), { entity: "media_player.a" });
  assert.equal(powerEntryFromForm("media_player.a", { entity: "media_player.b" }), "media_player.b");
  assert.deepEqual(powerEntryFromForm("media_player.a", { name: "Living" }), { entity: "media_player.a", name: "Living" });
  assert.deepEqual(powerEntryFromForm({ entity: "media_player.a", name: "L" }, { name: "" }), { entity: "media_player.a" });
});

test("hero alerts: state shows as a list and writes back as it was", () => {
  const a = { entity: "binary_sensor.d", state: "on", text: "Open" };
  assert.deepEqual(alertForm(a).state, ["on"]);
  assert.deepEqual(alertFromForm(a, alertForm(a)), a);
  assert.deepEqual(alertFromForm(a, { state: ["on", "open"], icon: "" }), { ...a, state: ["on", "open"] });
  assert.deepEqual(alertFromForm({ text: "{{ x }}" }, { entity: "", state: [] }), { text: "{{ x }}" });
});

test("tile items: match shows as a list and writes back as it was", () => {
  assert.deepEqual(tileItemForm({ name: "A", match: "x" }).match, ["x"]);
  assert.deepEqual(tileItemFromForm({ name: "A", match: "x" }, { match: ["y"] }), { name: "A", match: "y" });
  assert.deepEqual(tileItemFromForm({ name: "A", match: ["x", "z"] }, { match: ["y"] }), { name: "A", match: ["y"] });
  assert.deepEqual(tileItemFromForm({ name: "A", match: "x" }, { match: [] }), { name: "A" });
  assert.deepEqual(tileItemFromForm({ name: "A" }, { icon: "" }), { name: "A" });
});
