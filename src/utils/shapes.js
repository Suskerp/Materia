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

/** Canonical MaterialShapes cookie: star(vertices, innerRadius .8, rounding .5). */
export function materialCookiePath(cx, cy, r, vertices = 12) {
  return roundedPolygonPath(cx, cy, r, {
    vertices,
    innerRadius: 0.8,
    rounding: 0.5,
    rotate: -Math.PI / 2,
  });
}

/**
 * Port of androidx.graphics.shapes RoundedPolygon (the geometry behind
 * androidx.compose.material3.MaterialShapes, which Breezy Weather uses).
 * Star polygon vertices alternating outer/inner radius, each corner replaced
 * by a circular-arc fillet tangent to both edges. Canonical parameters:
 *   Cookie12Sided: star(12, innerRadius .8, rounding .5)
 *   Cookie9Sided:  star(9,  innerRadius .8, rounding .5)
 *   Sunny:         star(8,  innerRadius .8, rounding .15)
 *   Triangle:      polygon(3, rounding .2)
 */
export function roundedPolygonPath(cx, cy, R, { vertices, innerRadius = null, rounding = 0.2, rotate = 0 } = {}) {
  // Vertex ring (star = alternating outer/inner).
  const pts = [];
  const n = innerRadius != null ? vertices * 2 : vertices;
  for (let i = 0; i < n; i++) {
    const r = innerRadius != null && i % 2 === 1 ? R * innerRadius : R;
    const a = rotate + (i / n) * Math.PI * 2;
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), r: rounding * R });
  }
  return filletPath(pts);
}

/** Corner-fillet a closed polygon of {x, y, r} vertices (per-vertex radius) —
 *  the same tangent-arc construction androidx RoundedPolygon uses; concave
 *  corners (cross sign) bow inward. */
export function filletPath(pts) {
  const n = pts.length;
  const seg = [];
  for (let i = 0; i < n; i++) {
    const P = pts[(i - 1 + n) % n];
    const V = pts[i];
    const N = pts[(i + 1) % n];
    const uP = [P.x - V.x, P.y - V.y];
    const uN = [N.x - V.x, N.y - V.y];
    const lP = Math.hypot(...uP);
    const lN = Math.hypot(...uN);
    uP[0] /= lP; uP[1] /= lP;
    uN[0] /= lN; uN[1] /= lN;
    // Interior half-angle at V.
    const dot = uP[0] * uN[0] + uP[1] * uN[1];
    const half = Math.acos(Math.min(1, Math.max(-1, dot))) / 2;
    // Cut distance for a tangent fillet of radius V.r, capped to half edge.
    let d = V.r / Math.tan(half);
    d = Math.min(d, lP * 0.5, lN * 0.5);
    const rEff = d * Math.tan(half); // radius that actually fits after capping
    const T1 = [V.x + uP[0] * d, V.y + uP[1] * d];
    const T2 = [V.x + uN[0] * d, V.y + uN[1] * d];
    // Arc direction: convex corners bow outward, concave inward.
    // (Verified numerically: with this vertex winding, convex needs sweep 1.)
    const cross = uP[0] * uN[1] - uP[1] * uN[0];
    seg.push({ T1, T2, rEff, sweep: cross > 0 ? 0 : 1 });
  }
  let d = `M${seg[0].T1[0].toFixed(2)} ${seg[0].T1[1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const s = seg[i];
    const next = seg[(i + 1) % n];
    d += `A${s.rEff.toFixed(2)} ${s.rEff.toFixed(2)} 0 0 ${s.sweep} ${s.T2[0].toFixed(2)} ${s.T2[1].toFixed(2)} `;
    d += `L${next.T1[0].toFixed(2)} ${next.T1[1].toFixed(2)} `;
  }
  return d + "Z";
}

/** Canonical MaterialShapes ARROW (MaterialShapes.kt customPolygon points):
 *  apex, two base corners, and a NOTCHED base center — per-vertex rounding.
 *  rotate = 0 points UP; r = half the shape's larger dimension. */
export function arrowPath(cx, cy, r, rotate = 0) {
  const raw = [
    { x: 0.5, y: 0.892, r: 0.313 },   // base center notch (concave)
    { x: -0.216, y: 1.05, r: 0.207 }, // base left
    { x: 0.499, y: -0.16, r: 0.215 }, // apex
    { x: 1.225, y: 1.06, r: 0.211 },  // base right
  ];
  // Rotate FIRST, then center + scale by the ROTATED bounds — centering the
  // unrotated bbox left the shape off-center (and looking squished) at
  // rotated bearings.
  const cosR = Math.cos(rotate);
  const sinR = Math.sin(rotate);
  const rot = raw.map((p) => ({
    x: p.x * cosR - p.y * sinR,
    y: p.x * sinR + p.y * cosR,
    r: p.r,
  }));
  const xs = rot.map((p) => p.x);
  const ys = rot.map((p) => p.y);
  const cx0 = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy0 = (Math.min(...ys) + Math.max(...ys)) / 2;
  const s = (2 * r) / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  return filletPath(rot.map((p) => ({
    x: cx + (p.x - cx0) * s,
    y: cy + (p.y - cy0) * s,
    r: p.r * s,
  })));
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
