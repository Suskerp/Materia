import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const palette = JSON.parse(
  await readFile(new URL("../src/custom_colors.json", import.meta.url), "utf8")
);

function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map((part) => Number.parseInt(part, 16) / 255);
  const linear = rgb.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

test("light custom foreground/background pairs meet WCAG AA for text", () => {
  const colors = palette.light.colors;
  const pairs = [
    ["on-climate-cool", "climate-cool"],
    ["on-climate-cool", "climate-cool-container"],
    ["on-warning", "warning"],
    ["on-warning-container", "warning-container"],
  ];

  for (const [foreground, background] of pairs) {
    assert.ok(
      contrast(colors[foreground], colors[background]) >= 4.5,
      `${foreground} on ${background} must reach 4.5:1`
    );
  }
});
