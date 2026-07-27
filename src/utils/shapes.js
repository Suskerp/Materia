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

/** Fillet geometry for a closed polygon of {x, y, r} vertices — the same
 *  tangent-arc construction androidx RoundedPolygon uses; concave corners
 *  (cross sign) bow inward. Returns arc segments incl. centers so callers can
 *  measure true curve bounds. */
export function filletSegments(pts) {
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
    // Arc center: on the wedge bisector, rEff from both edges.
    const bx = uP[0] + uN[0];
    const by = uP[1] + uN[1];
    const bl = Math.hypot(bx, by) || 1;
    const hyp = rEff / Math.sin(half);
    const C = [V.x + (bx / bl) * hyp, V.y + (by / bl) * hyp];
    // Arc direction: convex corners bow outward, concave inward.
    // (Verified numerically: with this vertex winding, convex needs sweep 1.)
    const cross = uP[0] * uN[1] - uP[1] * uN[0];
    seg.push({ T1, T2, C, rEff, sweep: cross > 0 ? 0 : 1 });
  }
  return seg;
}

function segmentsToPath(seg) {
  const n = seg.length;
  let d = `M${seg[0].T1[0].toFixed(2)} ${seg[0].T1[1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const s = seg[i];
    const next = seg[(i + 1) % n];
    d += `A${s.rEff.toFixed(2)} ${s.rEff.toFixed(2)} 0 0 ${s.sweep} ${s.T2[0].toFixed(2)} ${s.T2[1].toFixed(2)} `;
    d += `L${next.T1[0].toFixed(2)} ${next.T1[1].toFixed(2)} `;
  }
  return d + "Z";
}

/** TRUE bounds of the filleted outline — samples along each arc, so the
 *  bulges count (tangent points alone under-measure heavily-rounded corners). */
export function segmentsBounds(seg) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const upd = (x, y) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };
  for (const s of seg) {
    const a1 = Math.atan2(s.T1[1] - s.C[1], s.T1[0] - s.C[0]);
    const a2 = Math.atan2(s.T2[1] - s.C[1], s.T2[0] - s.C[0]);
    let delta = a2 - a1;
    if (s.sweep === 1) { while (delta < 0) delta += Math.PI * 2; }
    else { while (delta > 0) delta -= Math.PI * 2; }
    for (let i = 0; i <= 16; i++) {
      const a = a1 + (delta * i) / 16;
      upd(s.C[0] + s.rEff * Math.cos(a), s.C[1] + s.rEff * Math.sin(a));
    }
  }
  return { minX, minY, maxX, maxY };
}

export function filletPath(pts) {
  return segmentsToPath(filletSegments(pts));
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
  // Rotate FIRST, fillet in raw units, then place the shape's AREA CENTROID
  // at (cx, cy) and scale so its farthest outline point sits at distance r —
  // optical centering for a round tile. (Bounding-box centering LOOKS wrong
  // here: the mass sits toward the round base, so the box's center isn't the
  // visual center.)
  const cosR = Math.cos(rotate);
  const sinR = Math.sin(rotate);
  const segs = filletSegments(raw.map((p) => ({
    x: p.x * cosR - p.y * sinR,
    y: p.x * sinR + p.y * cosR,
    r: p.r,
  })));
  // Dense outline samples in path order → shoelace area centroid.
  const pts = [];
  for (const sg of segs) {
    const a1 = Math.atan2(sg.T1[1] - sg.C[1], sg.T1[0] - sg.C[0]);
    const a2 = Math.atan2(sg.T2[1] - sg.C[1], sg.T2[0] - sg.C[0]);
    let delta = a2 - a1;
    if (sg.sweep === 1) { while (delta < 0) delta += Math.PI * 2; }
    else { while (delta > 0) delta -= Math.PI * 2; }
    for (let i = 0; i <= 16; i++) {
      const a = a1 + (delta * i) / 16;
      pts.push([sg.C[0] + sg.rEff * Math.cos(a), sg.C[1] + sg.rEff * Math.sin(a)]);
    }
  }
  let A = 0, gx = 0, gy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    const w = x1 * y2 - x2 * y1;
    A += w;
    gx += (x1 + x2) * w;
    gy += (y1 + y2) * w;
  }
  A /= 2;
  gx /= 6 * A;
  gy /= 6 * A;
  const maxDist = Math.max(...pts.map(([x, y]) => Math.hypot(x - gx, y - gy)));
  const s = r / maxDist;
  const t = (p) => [cx + (p[0] - gx) * s, cy + (p[1] - gy) * s];
  return segmentsToPath(segs.map((sg) => ({
    T1: t(sg.T1),
    T2: t(sg.T2),
    C: t(sg.C),
    rEff: sg.rEff * s,
    sweep: sg.sweep,
  })));
}

/** Canonical MaterialShapes BOOM — an explosive 15-point starburst.
 *
 *  Straight from MaterialShapes.kt:
 *    Boom = customPolygon([(0.457, 0.296) r .007, (0.500, -0.051) r .007], reps 15)
 *
 *  customPolygon points are unit-square coordinates about a (0.5, 0.5) centre,
 *  and `reps` repeats the point pair around the circle. Relative to centre the
 *  pair sits at radius .21 and .55, so repeating it 15 times gives 30 vertices
 *  alternating inner/outer — the spike. The .007 rounding is deliberately tiny:
 *  the tips stay almost sharp, which is what separates Boom from a Cookie.
 *
 *  rotate is in radians; r is the outer-spike radius. */
export function boomPath(cx, cy, r, rotate = 0) {
  const PAIR = [
    { x: 0.457, y: 0.296, r: 0.007 },
    { x: 0.5, y: -0.051, r: 0.007 },
  ];
  const REPS = 15;
  const raw = [];
  for (let k = 0; k < REPS; k++) {
    const a = rotate + (k / REPS) * Math.PI * 2;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    for (const p of PAIR) {
      // Offset from the (0.5, 0.5) centre, then spun into this repetition.
      const dx = p.x - 0.5;
      const dy = p.y - 0.5;
      raw.push({ x: 0.5 + dx * cosA - dy * sinA, y: 0.5 + dx * sinA + dy * cosA, r: p.r });
    }
  }

  // Fillet in raw units, then scale off the TRUE filleted outline (same
  // reasoning as arrowPath: vertex distance overstates the extent once the
  // corner arcs pull the outline in).
  const segs = filletSegments(raw);
  const pts = [];
  for (const sg of segs) {
    const a1 = Math.atan2(sg.T1[1] - sg.C[1], sg.T1[0] - sg.C[0]);
    const a2 = Math.atan2(sg.T2[1] - sg.C[1], sg.T2[0] - sg.C[0]);
    let delta = a2 - a1;
    if (sg.sweep === 1) { while (delta < 0) delta += Math.PI * 2; }
    else { while (delta > 0) delta -= Math.PI * 2; }
    for (let i = 0; i <= 8; i++) {
      const a = a1 + (delta * i) / 8;
      pts.push([sg.C[0] + sg.rEff * Math.cos(a), sg.C[1] + sg.rEff * Math.sin(a)]);
    }
  }
  // Radially symmetric, so the centroid is the construction centre.
  const maxDist = Math.max(...pts.map(([x, y]) => Math.hypot(x - 0.5, y - 0.5)));
  const sc = r / maxDist;
  const t = (pt) => [cx + (pt[0] - 0.5) * sc, cy + (pt[1] - 0.5) * sc];
  return segmentsToPath(segs.map((sg) => ({
    T1: t(sg.T1),
    T2: t(sg.T2),
    C: t(sg.C),
    rEff: sg.rEff * sc,
    sweep: sg.sweep,
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

/** Lit region of the moon at cycle position p ∈ [0,1) (0 = new, .5 = full).
 *  Outer rim on the lit side + elliptical terminator; "" at new moon. */
export function moonPath(cx, cy, r, p) {
  const cos = Math.cos(2 * Math.PI * p);
  if (p < 0.02 || p > 0.98) return ""; // new moon — nothing lit
  const rx = Math.max(0.01, Math.abs(cos) * r).toFixed(2);
  const top = `${cx} ${cy - r}`;
  const bot = `${cx} ${cy + r}`;
  // Sweep semantics with y-down screen coords: bottom→top with sweep 0 passes
  // the RIGHT side, sweep 1 the LEFT.
  if (p <= 0.5) {
    // Waxing: lit right rim; terminator bulges right (crescent, cos>0 → sweep
    // 0) or left (gibbous → sweep 1).
    return `M${top} A${r} ${r} 0 0 1 ${bot} A${rx} ${r} 0 0 ${cos > 0 ? 0 : 1} ${top} Z`;
  }
  // Waning: lit left rim; terminator bulges left (crescent → sweep 1) or
  // right (gibbous → sweep 0).
  return `M${top} A${r} ${r} 0 0 0 ${bot} A${rx} ${r} 0 0 ${cos > 0 ? 1 : 0} ${top} Z`;
}
