import assert from "node:assert/strict";
import test from "node:test";
import { STRINGS, t } from "../src/utils/i18n.js";

test("every runtime string has non-empty English and Dutch copy", () => {
  for (const [key, entry] of Object.entries(STRINGS)) {
    assert.equal(typeof entry.en, "string", `${key} needs English copy`);
    assert.equal(typeof entry.nl, "string", `${key} needs Dutch copy`);
    assert.ok(entry.en.trim(), `${key} English copy is empty`);
    assert.ok(entry.nl.trim(), `${key} Dutch copy is empty`);
  }
});

test("translations interpolate placeholders in either locale", () => {
  const key = Object.keys(STRINGS).find((candidate) => STRINGS[candidate].en.includes("{"));
  assert.ok(key, "translation table should contain an interpolated string");
  const variable = STRINGS[key].en.match(/\{([^}]+)\}/)?.[1];
  assert.ok(variable);
  assert.equal(t(key, "nl", { [variable]: "TEST" }).includes("TEST"), true);
});
