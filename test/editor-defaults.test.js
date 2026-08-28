import test from "node:test";
import assert from "node:assert/strict";
import {
  effectiveEditorValue,
  isImplicitDefaultEvent,
} from "../src/utils/editor-defaults.js";

test("effective editor values prefer form data and field defaults", () => {
  assert.equal(effectiveEditorValue({}, { show: true }, { name: "show", selector: { boolean: {} } }), true);
  assert.equal(effectiveEditorValue({}, {}, { name: "step", default: 0.5, selector: { number: {} } }), 0.5);
  assert.equal(effectiveEditorValue({}, {}, { name: "show", selector: { boolean: {} } }), false);
  assert.equal(effectiveEditorValue({ show: false }, { show: false }, { name: "show", default: true, selector: { boolean: {} } }), false);
});

test("selector initialisation cannot persist an implicit default", () => {
  assert.equal(isImplicitDefaultEvent({}, "show", true, true), true);
  assert.equal(isImplicitDefaultEvent({}, "show", false, true), false);
  assert.equal(isImplicitDefaultEvent({ show: true }, "show", true, true), false);
});
