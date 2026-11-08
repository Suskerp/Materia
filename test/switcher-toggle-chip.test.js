import assert from "node:assert/strict";
import test from "node:test";
import { switcherItems, clampIndex, storageKey, readIndex, writeIndex, tabClass } from "../src/cards/switcher/model.js";
import { chipVariant, chipIsOn, chipLabel } from "../src/cards/toggle-chip/model.js";

const memory = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)) };
};

test("switcherItems keeps object items only", () => {
  assert.deepEqual(switcherItems({ items: [{ name: "A" }, null, "x", { name: "B" }] }), [{ name: "A" }, { name: "B" }]);
  assert.deepEqual(switcherItems({}), []);
});

test("clampIndex falls back to the first item", () => {
  assert.equal(clampIndex(1, 2), 1);
  assert.equal(clampIndex(2, 2), 0);
  assert.equal(clampIndex(-1, 2), 0);
  assert.equal(clampIndex("1", 2), 1);
  assert.equal(clampIndex(undefined, 2), 0);
});

test("remember needs both remember: true and a key", () => {
  assert.equal(storageKey({ remember: true, key: "volume" }), "materia-switcher:volume");
  assert.equal(storageKey({ remember: true }), null);
  assert.equal(storageKey({ key: "volume" }), null);
});

test("the remembered index round-trips; junk and failures read as none", () => {
  const s = memory();
  const key = storageKey({ remember: true, key: "k" });
  assert.equal(readIndex(s, key), null);
  writeIndex(s, key, 1);
  assert.equal(readIndex(s, key), 1);
  s.setItem(key, "zone");
  assert.equal(readIndex(s, key), null);
  const throwing = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("denied"); } };
  assert.equal(readIndex(throwing, key), null);
  assert.doesNotThrow(() => writeIndex(throwing, key, 0));
  assert.equal(readIndex(s, null), null);
});

test("tab corner classes match the zone tabs", () => {
  const split = (c) => c.split(" ").filter(Boolean).sort();
  assert.deepEqual(split(tabClass(0, 2, 0)), ["first", "on"]);
  assert.deepEqual(split(tabClass(1, 2, 0)), ["last"]);
  assert.deepEqual(split(tabClass(1, 3, 1)), ["on"]);
  assert.deepEqual(split(tabClass(0, 1, 0)), ["first", "last", "on"]);
});

test("toggle chip variant and state", () => {
  assert.equal(chipVariant({}), "chip");
  assert.equal(chipVariant({ variant: "switch" }), "switch");
  assert.equal(chipVariant({ variant: "other" }), "chip");
  assert.equal(chipIsOn({ state: "on" }), true);
  assert.equal(chipIsOn({ state: "off" }), false);
  assert.equal(chipIsOn(undefined), false);
});

test("toggle chip label: plain, template result, name fallback", () => {
  const cfg = { label_on: "linked {{ x }}", label_off: "unlinked" };
  assert.equal(chipLabel(cfg, true, { label_on: "linked +2" }), "linked +2");
  assert.equal(chipLabel(cfg, true, {}), "");
  assert.equal(chipLabel(cfg, false, {}), "unlinked");
  assert.equal(chipLabel({}, true, {}, "Link"), "Link");
  assert.equal(chipLabel({ label_on: "  on " }, true), "on");
});
