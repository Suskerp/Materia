// AUTO-DERIVED from a damped-spring sampler (mass=1). Do not hand-edit values;
// regenerate via the sampler in tooling. Spatial springs overshoot (bounce),
// effects springs are critically damped (no overshoot) per M3 Expressive.
import { css } from "lit";

/** Raw token table: easing = CSS linear() spring, ms = natural settle duration. */
export const MOTION = {
  "expressive-fast-spatial": { ms: 342, easing: "linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1)" },
  "expressive-default-spatial": { ms: 533, easing: "linear(0, 0.0339, 0.121, 0.2417, 0.3793, 0.5204, 0.6552, 0.7764, 0.88, 0.9639, 1.028, 1.0733, 1.1019, 1.1163, 1.1195, 1.1141, 1.1028, 1.0879, 1.0712, 1.0544, 1.0385, 1.0244, 1.0124, 1.0028, 0.9955, 0.9905, 0.9874, 0.9859, 0.9858, 0.9866, 0.988, 0.9898, 0.9918, 0.9938, 0.9957, 0.9974, 0.9987, 0.9998, 1.0007, 1.0012, 1.0016, 1.0017, 1.0017, 1.0016, 1.0014, 1.0012, 1)" },
  "expressive-slow-spatial": { ms: 637, easing: "linear(0, 0.0227, 0.0824, 0.1675, 0.2681, 0.3762, 0.4852, 0.5902, 0.6876, 0.775, 0.851, 0.9151, 0.9673, 1.0084, 1.0391, 1.0607, 1.0744, 1.0816, 1.0835, 1.0813, 1.0761, 1.0689, 1.0604, 1.0514, 1.0423, 1.0335, 1.0255, 1.0182, 1.012, 1.0067, 1.0024, 0.9991, 0.9966, 0.9948, 0.9937, 0.9932, 0.993, 0.9932, 0.9937, 0.9943, 0.995, 0.9958, 0.9965, 0.9973, 0.9979, 0.9985, 1)" },
  "standard-fast-spatial": { ms: 250, easing: "linear(0, 0.0634, 0.196, 0.3446, 0.4837, 0.603, 0.7002, 0.7768, 0.8357, 0.8801, 0.9132, 0.9376, 0.9553, 0.9682, 0.9775, 0.9841, 0.9888, 0.9921, 0.9945, 0.9962, 0.9973, 0.9981, 0.9987, 1)" },
  "standard-default-spatial": { ms: 392, easing: "linear(0, 0.0294, 0.0993, 0.1892, 0.286, 0.3817, 0.4715, 0.553, 0.6251, 0.6879, 0.7418, 0.7875, 0.8259, 0.8579, 0.8845, 0.9064, 0.9243, 0.939, 0.9509, 0.9606, 0.9685, 0.9748, 0.9799, 0.9839, 0.9872, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 0.998, 0.9984, 0.9988, 1)" },
  "standard-slow-spatial": { ms: 575, easing: "linear(0, 0.0178, 0.0624, 0.1234, 0.1934, 0.2671, 0.3407, 0.4119, 0.4791, 0.5413, 0.5982, 0.6496, 0.6956, 0.7365, 0.7726, 0.8043, 0.832, 0.8561, 0.877, 0.8951, 0.9107, 0.9241, 0.9355, 0.9453, 0.9537, 0.9609, 0.9669, 0.9721, 0.9765, 0.9802, 0.9833, 0.986, 0.9882, 0.9901, 0.9917, 0.993, 0.9942, 0.9951, 0.9959, 0.9966, 0.9971, 0.9976, 0.998, 0.9983, 0.9986, 0.9988, 1)" },
  "fast-effects": { ms: 150, easing: "linear(0, 0.1422, 0.3806, 0.5889, 0.7406, 0.8417, 0.9057, 0.9448, 0.9681, 0.9818, 0.9897, 0.9942, 0.9968, 0.9982, 1)" },
  "default-effects": { ms: 233, easing: "linear(0, 0.0739, 0.2235, 0.3849, 0.5305, 0.6508, 0.7452, 0.8168, 0.8699, 0.9084, 0.9361, 0.9557, 0.9694, 0.979, 0.9857, 0.9902, 0.9934, 0.9955, 0.997, 0.998, 0.9986, 1)" },
  "slow-effects": { ms: 329, easing: "linear(0, 0.0393, 0.1288, 0.2389, 0.3523, 0.4593, 0.5554, 0.6386, 0.7091, 0.7677, 0.8158, 0.8547, 0.886, 0.9109, 0.9307, 0.9462, 0.9584, 0.9679, 0.9753, 0.981, 0.9855, 0.9889, 0.9915, 0.9935, 0.9951, 0.9963, 0.9972, 0.9978, 0.9984, 0.9988, 1)" },
};

/** Shared style: exposes --md-sys-motion-* custom properties on the host.
 *  Cards adopt this and reference e.g.
 *    transition: transform var(--md-sys-motion-expressive-fast-spatial);
 *    transition: background var(--md-sys-motion-fast-effects);
 *  Each var packs <duration> <easing> so it drops straight into shorthand. */
export const motionTokens = css`
  :host {
    --md-sys-motion-expressive-fast-spatial: 342ms linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1);
    --md-sys-motion-expressive-fast-spatial-duration: 342ms;
    --md-sys-motion-expressive-fast-spatial-easing: linear(0, 0.0731, 0.247, 0.463, 0.6769, 0.8602, 0.9987, 1.089, 1.1357, 1.1476, 1.1353, 1.1088, 1.0767, 1.0453, 1.0187, 0.9989, 0.9861, 0.9796, 0.9782, 0.9803, 0.9843, 0.9891, 0.9937, 0.9975, 1.0004, 1.0022, 1.003, 1.0032, 1.0029, 1.0023, 1.0016, 1);
    --md-sys-motion-expressive-default-spatial: 533ms linear(0, 0.0339, 0.121, 0.2417, 0.3793, 0.5204, 0.6552, 0.7764, 0.88, 0.9639, 1.028, 1.0733, 1.1019, 1.1163, 1.1195, 1.1141, 1.1028, 1.0879, 1.0712, 1.0544, 1.0385, 1.0244, 1.0124, 1.0028, 0.9955, 0.9905, 0.9874, 0.9859, 0.9858, 0.9866, 0.988, 0.9898, 0.9918, 0.9938, 0.9957, 0.9974, 0.9987, 0.9998, 1.0007, 1.0012, 1.0016, 1.0017, 1.0017, 1.0016, 1.0014, 1.0012, 1);
    --md-sys-motion-expressive-default-spatial-duration: 533ms;
    --md-sys-motion-expressive-default-spatial-easing: linear(0, 0.0339, 0.121, 0.2417, 0.3793, 0.5204, 0.6552, 0.7764, 0.88, 0.9639, 1.028, 1.0733, 1.1019, 1.1163, 1.1195, 1.1141, 1.1028, 1.0879, 1.0712, 1.0544, 1.0385, 1.0244, 1.0124, 1.0028, 0.9955, 0.9905, 0.9874, 0.9859, 0.9858, 0.9866, 0.988, 0.9898, 0.9918, 0.9938, 0.9957, 0.9974, 0.9987, 0.9998, 1.0007, 1.0012, 1.0016, 1.0017, 1.0017, 1.0016, 1.0014, 1.0012, 1);
    --md-sys-motion-expressive-slow-spatial: 637ms linear(0, 0.0227, 0.0824, 0.1675, 0.2681, 0.3762, 0.4852, 0.5902, 0.6876, 0.775, 0.851, 0.9151, 0.9673, 1.0084, 1.0391, 1.0607, 1.0744, 1.0816, 1.0835, 1.0813, 1.0761, 1.0689, 1.0604, 1.0514, 1.0423, 1.0335, 1.0255, 1.0182, 1.012, 1.0067, 1.0024, 0.9991, 0.9966, 0.9948, 0.9937, 0.9932, 0.993, 0.9932, 0.9937, 0.9943, 0.995, 0.9958, 0.9965, 0.9973, 0.9979, 0.9985, 1);
    --md-sys-motion-expressive-slow-spatial-duration: 637ms;
    --md-sys-motion-expressive-slow-spatial-easing: linear(0, 0.0227, 0.0824, 0.1675, 0.2681, 0.3762, 0.4852, 0.5902, 0.6876, 0.775, 0.851, 0.9151, 0.9673, 1.0084, 1.0391, 1.0607, 1.0744, 1.0816, 1.0835, 1.0813, 1.0761, 1.0689, 1.0604, 1.0514, 1.0423, 1.0335, 1.0255, 1.0182, 1.012, 1.0067, 1.0024, 0.9991, 0.9966, 0.9948, 0.9937, 0.9932, 0.993, 0.9932, 0.9937, 0.9943, 0.995, 0.9958, 0.9965, 0.9973, 0.9979, 0.9985, 1);
    --md-sys-motion-standard-fast-spatial: 250ms linear(0, 0.0634, 0.196, 0.3446, 0.4837, 0.603, 0.7002, 0.7768, 0.8357, 0.8801, 0.9132, 0.9376, 0.9553, 0.9682, 0.9775, 0.9841, 0.9888, 0.9921, 0.9945, 0.9962, 0.9973, 0.9981, 0.9987, 1);
    --md-sys-motion-standard-fast-spatial-duration: 250ms;
    --md-sys-motion-standard-fast-spatial-easing: linear(0, 0.0634, 0.196, 0.3446, 0.4837, 0.603, 0.7002, 0.7768, 0.8357, 0.8801, 0.9132, 0.9376, 0.9553, 0.9682, 0.9775, 0.9841, 0.9888, 0.9921, 0.9945, 0.9962, 0.9973, 0.9981, 0.9987, 1);
    --md-sys-motion-standard-default-spatial: 392ms linear(0, 0.0294, 0.0993, 0.1892, 0.286, 0.3817, 0.4715, 0.553, 0.6251, 0.6879, 0.7418, 0.7875, 0.8259, 0.8579, 0.8845, 0.9064, 0.9243, 0.939, 0.9509, 0.9606, 0.9685, 0.9748, 0.9799, 0.9839, 0.9872, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 0.998, 0.9984, 0.9988, 1);
    --md-sys-motion-standard-default-spatial-duration: 392ms;
    --md-sys-motion-standard-default-spatial-easing: linear(0, 0.0294, 0.0993, 0.1892, 0.286, 0.3817, 0.4715, 0.553, 0.6251, 0.6879, 0.7418, 0.7875, 0.8259, 0.8579, 0.8845, 0.9064, 0.9243, 0.939, 0.9509, 0.9606, 0.9685, 0.9748, 0.9799, 0.9839, 0.9872, 0.9898, 0.9919, 0.9936, 0.9949, 0.996, 0.9968, 0.9975, 0.998, 0.9984, 0.9988, 1);
    --md-sys-motion-standard-slow-spatial: 575ms linear(0, 0.0178, 0.0624, 0.1234, 0.1934, 0.2671, 0.3407, 0.4119, 0.4791, 0.5413, 0.5982, 0.6496, 0.6956, 0.7365, 0.7726, 0.8043, 0.832, 0.8561, 0.877, 0.8951, 0.9107, 0.9241, 0.9355, 0.9453, 0.9537, 0.9609, 0.9669, 0.9721, 0.9765, 0.9802, 0.9833, 0.986, 0.9882, 0.9901, 0.9917, 0.993, 0.9942, 0.9951, 0.9959, 0.9966, 0.9971, 0.9976, 0.998, 0.9983, 0.9986, 0.9988, 1);
    --md-sys-motion-standard-slow-spatial-duration: 575ms;
    --md-sys-motion-standard-slow-spatial-easing: linear(0, 0.0178, 0.0624, 0.1234, 0.1934, 0.2671, 0.3407, 0.4119, 0.4791, 0.5413, 0.5982, 0.6496, 0.6956, 0.7365, 0.7726, 0.8043, 0.832, 0.8561, 0.877, 0.8951, 0.9107, 0.9241, 0.9355, 0.9453, 0.9537, 0.9609, 0.9669, 0.9721, 0.9765, 0.9802, 0.9833, 0.986, 0.9882, 0.9901, 0.9917, 0.993, 0.9942, 0.9951, 0.9959, 0.9966, 0.9971, 0.9976, 0.998, 0.9983, 0.9986, 0.9988, 1);
    --md-sys-motion-fast-effects: 150ms linear(0, 0.1422, 0.3806, 0.5889, 0.7406, 0.8417, 0.9057, 0.9448, 0.9681, 0.9818, 0.9897, 0.9942, 0.9968, 0.9982, 1);
    --md-sys-motion-fast-effects-duration: 150ms;
    --md-sys-motion-fast-effects-easing: linear(0, 0.1422, 0.3806, 0.5889, 0.7406, 0.8417, 0.9057, 0.9448, 0.9681, 0.9818, 0.9897, 0.9942, 0.9968, 0.9982, 1);
    --md-sys-motion-default-effects: 233ms linear(0, 0.0739, 0.2235, 0.3849, 0.5305, 0.6508, 0.7452, 0.8168, 0.8699, 0.9084, 0.9361, 0.9557, 0.9694, 0.979, 0.9857, 0.9902, 0.9934, 0.9955, 0.997, 0.998, 0.9986, 1);
    --md-sys-motion-default-effects-duration: 233ms;
    --md-sys-motion-default-effects-easing: linear(0, 0.0739, 0.2235, 0.3849, 0.5305, 0.6508, 0.7452, 0.8168, 0.8699, 0.9084, 0.9361, 0.9557, 0.9694, 0.979, 0.9857, 0.9902, 0.9934, 0.9955, 0.997, 0.998, 0.9986, 1);
    --md-sys-motion-slow-effects: 329ms linear(0, 0.0393, 0.1288, 0.2389, 0.3523, 0.4593, 0.5554, 0.6386, 0.7091, 0.7677, 0.8158, 0.8547, 0.886, 0.9109, 0.9307, 0.9462, 0.9584, 0.9679, 0.9753, 0.981, 0.9855, 0.9889, 0.9915, 0.9935, 0.9951, 0.9963, 0.9972, 0.9978, 0.9984, 0.9988, 1);
    --md-sys-motion-slow-effects-duration: 329ms;
    --md-sys-motion-slow-effects-easing: linear(0, 0.0393, 0.1288, 0.2389, 0.3523, 0.4593, 0.5554, 0.6386, 0.7091, 0.7677, 0.8158, 0.8547, 0.886, 0.9109, 0.9307, 0.9462, 0.9584, 0.9679, 0.9753, 0.981, 0.9855, 0.9889, 0.9915, 0.9935, 0.9951, 0.9963, 0.9972, 0.9978, 0.9984, 0.9988, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    :host {
      --md-sys-motion-expressive-fast-spatial: 1ms linear;
      --md-sys-motion-expressive-default-spatial: 1ms linear;
      --md-sys-motion-expressive-slow-spatial: 1ms linear;
      --md-sys-motion-standard-fast-spatial: 1ms linear;
      --md-sys-motion-standard-default-spatial: 1ms linear;
      --md-sys-motion-standard-slow-spatial: 1ms linear;
      --md-sys-motion-fast-effects: 1ms linear;
      --md-sys-motion-default-effects: 1ms linear;
      --md-sys-motion-slow-effects: 1ms linear;
      /* Components that need duration/easing as separate WAAPI/CSS inputs
         must reduce too. Keeping only the shorthand overrides here left
         those consumers animating at full spring duration. */
      --md-sys-motion-expressive-fast-spatial-duration: 1ms;
      --md-sys-motion-expressive-fast-spatial-easing: linear;
      --md-sys-motion-expressive-default-spatial-duration: 1ms;
      --md-sys-motion-expressive-default-spatial-easing: linear;
      --md-sys-motion-expressive-slow-spatial-duration: 1ms;
      --md-sys-motion-expressive-slow-spatial-easing: linear;
      --md-sys-motion-standard-fast-spatial-duration: 1ms;
      --md-sys-motion-standard-fast-spatial-easing: linear;
      --md-sys-motion-standard-default-spatial-duration: 1ms;
      --md-sys-motion-standard-default-spatial-easing: linear;
      --md-sys-motion-standard-slow-spatial-duration: 1ms;
      --md-sys-motion-standard-slow-spatial-easing: linear;
      --md-sys-motion-fast-effects-duration: 1ms;
      --md-sys-motion-fast-effects-easing: linear;
      --md-sys-motion-default-effects-duration: 1ms;
      --md-sys-motion-default-effects-easing: linear;
      --md-sys-motion-slow-effects-duration: 1ms;
      --md-sys-motion-slow-effects-easing: linear;
    }
  }
`;

/** Runtime spring sampler for canvas/SVG animation (e.g. the wavy thermostat).
 *  Returns normalized position 0..1 at time t (seconds) for a unit step,
 *  mass=1, given stiffness k and damping ratio zeta. */
export function springAt(t, k = 560, zeta = 0.56) {
  const wn = Math.sqrt(k);
  if (zeta < 1) {
    const wd = wn * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * wn * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-wn * t) * (1 + wn * t);
}
