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
  return repeatedPairPath(cx, cy, r, rotate, [
    { x: 0.457, y: 0.296, r: 0.007 },
    { x: 0.5, y: -0.051, r: 0.007 },
  ], 15);
}

/** Canonical MaterialShapes SOFT BURST — Boom's gentle sibling.
 *
 *    SoftBurst = customPolygon([(0.193, 0.277) r .053, (0.176, 0.055) r .053], reps 10)
 *
 *  Same construction as Boom, softer numbers: relative to the (0.5, 0.5)
 *  centre the pair sits at radius .38 and .55 — a .69 inner/outer ratio against
 *  Boom's .38 — and the rounding is .053 rather than .007, so the lobes are
 *  round instead of spiked. Ten reps, so twenty vertices. */
export function softBurstPath(cx, cy, r, rotate = 0) {
  return repeatedPairPath(cx, cy, r, rotate, [
    { x: 0.193, y: 0.277, r: 0.053 },
    { x: 0.176, y: 0.055, r: 0.053 },
  ], 10);
}

/** SoftBurst's WORKING pose: the inner vertex pulled toward the centre (.31
 *  against SoftBurst's .38, a .56 ratio) so the lobes deepen — energetic, but
 *  the .053 rounding keeps it a world away from Boom's spikes, which this card
 *  family reserves for faults. Same pair count and reps as softBurstPath ON
 *  PURPOSE: identical segment structure is what lets CSS interpolate the two
 *  as a shape morph. Change one, change both. */
export function liveBurstPath(cx, cy, r, rotate = 0) {
  return repeatedPairPath(cx, cy, r, rotate, [
    { x: 0.248, y: 0.317, r: 0.053 },
    { x: 0.176, y: 0.055, r: 0.053 },
  ], 10);
}

/** Shared engine for MaterialShapes' `customPolygon(points, reps)` shapes:
 *  point offsets are unit-square coords about a (0.5, 0.5) centre, and `reps`
 *  spins the set around the circle. */
function repeatedPairPath(cx, cy, r, rotate, PAIR, REPS) {
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

/* ------------------------------------------------------------------ */
/*  customPolygon with MIRRORING                                       */
/*                                                                     */
/*  repeatedPairPath above only spins a point set around the circle,    */
/*  which is MaterialShapes' `customPolygon(points, reps)`. A good half  */
/*  of the catalogue instead uses `customPolygon(..., mirroring = true)`,*/
/*  where every other repetition is REFLECTED rather than rotated —     */
/*  that is what gives Pill, Gem, Clover and friends their reflective   */
/*  symmetry, and without it they cannot be drawn at all.               */
/* ------------------------------------------------------------------ */

/** Faithful port of MaterialShapes.kt's private `doRepeat`.
 *
 *  The mirroring branch is not a geometric reflection of the points — it works
 *  in POLAR space about the centre. Each point becomes (angle, distance); even
 *  repetitions replay the angles forward, odd repetitions replay them BACKWARD
 *  and reflected within their section:
 *
 *      even:  a = section*it + angles[i]
 *      odd:   a = section*it + section - angles[i] + 2*angles[0]
 *
 *  The `2*angles[0]` term is what pins the seam: it re-anchors the reflected
 *  run to the first point's angle, so the mirrored half meets the original
 *  half exactly instead of at an arbitrary offset. Odd repetitions also SKIP
 *  index 0 (`i > 0 || it % 2 == 0`), because that vertex is the seam itself and
 *  would otherwise be emitted twice — a duplicate point that makes the fillet
 *  at the join degenerate.
 *
 *  Angles are degrees, y-down (Compose and SVG agree here, so no flip). */
function doRepeat(points, reps, mirroring, cx = 0.5, cy = 0.5) {
  const out = [];

  if (!mirroring) {
    const np = points.length;
    for (let i = 0; i < np * reps; i++) {
      const p = points[i % np];
      const a = ((Math.floor(i / np) * 360) / reps) * (Math.PI / 180);
      const dx = p.x - cx;
      const dy = p.y - cy;
      out.push({
        x: cx + dx * Math.cos(a) - dy * Math.sin(a),
        y: cy + dx * Math.sin(a) + dy * Math.cos(a),
        r: p.r,
      });
    }
    return out;
  }

  const angles = points.map((p) => (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI);
  const dists = points.map((p) => Math.hypot(p.x - cx, p.y - cy));
  const actualReps = reps * 2;
  const section = 360 / actualReps;

  for (let it = 0; it < actualReps; it++) {
    const even = it % 2 === 0;
    for (let index = 0; index < points.length; index++) {
      const i = even ? index : points.length - 1 - index;
      if (!(i > 0 || even)) continue; // the seam vertex, already emitted
      const deg = section * it + (even ? angles[i] : section - angles[i] + 2 * angles[0]);
      const a = deg * (Math.PI / 180);
      out.push({ x: cx + Math.cos(a) * dists[i], y: cy + Math.sin(a) * dists[i], r: points[i].r });
    }
  }
  return out;
}

/** Generic MaterialShapes `customPolygon`, normalised into a square box.
 *
 *  androidx publishes these shapes through `.normalized()`, which fits the
 *  outline to a unit box — so the scale comes from the TRUE filleted bounds,
 *  not from vertex distance, and the box (not the centroid) is what gets
 *  centred. Aspect ratio is preserved: the longer axis is fitted to `size` and
 *  the shorter one is centred inside it, so a non-square shape stays itself
 *  instead of being stretched to fill a square tile. */
export function customPolygonPath(cx, cy, size, { points, reps = 1, mirroring = false, rotate = 0 }) {
  const verts = doRepeat(points, reps, mirroring);

  // Rotate about the construction centre before filleting, so the corner radii
  // stay attached to their own vertices.
  const cosR = Math.cos(rotate);
  const sinR = Math.sin(rotate);
  const spun = verts.map((p) => {
    const dx = p.x - 0.5;
    const dy = p.y - 0.5;
    return { x: 0.5 + dx * cosR - dy * sinR, y: 0.5 + dx * sinR + dy * cosR, r: p.r };
  });

  const segs = filletSegments(spun);
  const b = segmentsBounds(segs);
  const w = b.maxX - b.minX;
  const h = b.maxY - b.minY;
  const sc = size / Math.max(w, h);
  const mx = (b.minX + b.maxX) / 2;
  const my = (b.minY + b.maxY) / 2;
  const t = (p) => [cx + (p[0] - mx) * sc, cy + (p[1] - my) * sc];

  return segmentsToPath(segs.map((sg) => ({
    T1: t(sg.T1),
    T2: t(sg.T2),
    C: t(sg.C),
    rEff: sg.rEff * sc,
    sweep: sg.sweep,
  })));
}

/** Canonical MaterialShapes PILL.
 *
 *    Pill = customPolygon([
 *             (0.961, 0.039) r .426,
 *             (1.001, 0.428),            // unrounded
 *             (1.000, 0.609) r 1.000,
 *           ], reps = 2, mirroring = true)
 *
 *  reps 2 + mirroring gives four 90° sections and TEN vertices (3 on each even
 *  repetition, 2 on each odd one once the seam is skipped). Despite the name it
 *  is not a stadium — the CSS `border-radius: 999px` pill in forecast-daily is
 *  a different object that happens to share the word. */
export function pillPath(cx, cy, size, rotate = 0) {
  return customPolygonPath(cx, cy, size, {
    points: [
      { x: 0.961, y: 0.039, r: 0.426 },
      { x: 1.001, y: 0.428, r: 0 },
      { x: 1.0, y: 0.609, r: 1.0 },
    ],
    reps: 2,
    mirroring: true,
    rotate,
  });
}

/** Canonical MaterialShapes GEM.
 *
 *    Gem = customPolygon([
 *            (0.499, 1.023) r .241 smoothing .778,
 *            (-0.005, 0.792) r .208,
 *            (0.073, 0.258) r .228,
 *            (0.433, -0.000) r .491,
 *          ], reps = 1, mirroring = true)
 *
 *  reps 1 + mirroring gives two 180° sections and SEVEN vertices.
 *
 *  CAVEAT — the first vertex carries CornerRounding(radius, SMOOTHING = .778),
 *  and filletSegments draws a bare circular arc with no smoothing support. That
 *  corner therefore renders as a pure r=.241 fillet rather than androidx's
 *  arc-flanked-by-two-cubics. The radius is the real published value, so this is
 *  a missing feature rather than an invented number, but it is a real deviation
 *  on that one corner. Everything else is exact. */
export function gemPath(cx, cy, size, rotate = 0) {
  return customPolygonPath(cx, cy, size, {
    points: [
      { x: 0.499, y: 1.023, r: 0.241 }, // smoothing .778 not yet implemented
      { x: -0.005, y: 0.792, r: 0.208 },
      { x: 0.073, y: 0.258, r: 0.228 },
      { x: 0.433, y: -0.0, r: 0.491 },
    ],
    reps: 1,
    mirroring: true,
    rotate,
  });
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
