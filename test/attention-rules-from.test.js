import assert from "node:assert/strict";
import test from "node:test";
import { findRules } from "../src/cards/attention/model.js";

const rules = [{ name: "Waterlek!", level: "urgent" }];
const dashboard = {
  views: [
    { path: "home", sections: [{ cards: [{ type: "custom:materia-attention", id: "home", items: rules }] }] },
    { path: "dashboard", sections: [{ cards: [{ type: "custom:simple-swipe-card", cards: [{ type: "custom:materia-attention", rules_from: "home", layout: "vertical" }] }] }] },
  ],
};

test("finds a named attention card's rules anywhere in the dashboard", () => {
  assert.equal(findRules(dashboard, "home"), rules);
});

test("finds it nested in stacks and swipe cards too", () => {
  const nested = { views: [{ cards: [{ type: "vertical-stack", cards: [{ type: "custom:simple-swipe-card", cards: [{ type: "custom:materia-attention", id: "tablet", items: rules }] }] }] }] };
  assert.equal(findRules(nested, "tablet"), rules);
});

test("an unknown name, no name or a copy without rules gives nothing", () => {
  assert.equal(findRules(dashboard, "kitchen"), null);
  assert.equal(findRules(dashboard, ""), null);
  assert.equal(findRules({ views: [{ cards: [{ type: "custom:materia-attention", id: "x" }] }] }, "x"), null);
});
