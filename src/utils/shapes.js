/**
 * Expressive M3 shape helpers.
 *
 * cookiePath: polar-cosine scallop — r(θ) = R + A·cos(lobes·θ) — sampled
 * densely and splined (closed Catmull-Rom → cubic Bézier), so both peaks
 * and valleys stay rounded at any scale. lobes=9 amp≈0.1R is the weather
 * sun; 12 lobes makes the M3 cookie; 3 lobes with a big amp approaches the
 * soft wind-triangle blob.
 */
export function cookiePath(cx, cy, r, lobes = 12, amp = r * 0.1, rotate = 0) {
  const n = Math.max(lobes * 8, 48);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const rad = r + amp * Math.cos(lobes * t + rotate);
    pts.push([cx + rad * Math.cos(t), cy + rad * Math.sin(t)]);
  }
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + "Z";
}

/** Soft rounded-triangle blob (Pixel wind tile): 3 lobes, deep amplitude,
 *  rotated so one soft point faces up. */
export function windBlobPath(cx, cy, r) {
  return cookiePath(cx, cy, r * 0.92, 3, r * 0.22, Math.PI / 2);
}

/** SVG arc path (for gauges), angles in degrees, 0° = 12 o'clock, clockwise. */
export function arcPath(cx, cy, r, startDeg, endDeg) {
  const toXY = (deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x1, y1] = toXY(startDeg);
  const [x2, y2] = toXY(endDeg);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}
