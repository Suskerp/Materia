/**
 * Disambiguates a lock's "unlocking"/"locking" reports, shared by
 * materia-lock and materia-hero so the two cards on the same entity never
 * disagree about what a given raw state actually means.
 *
 * "locking"/"unlocking" are DIRECTIONS, not states: "unlocking" only makes
 * sense heading away from locked, and "locking" only makes sense heading
 * away from unlocked. Some hardware (this Nuki) reports a transient
 * "unlocking" seconds after the door was already open again — the latch
 * settling, not a real lock attempt — and that string is indistinguishable
 * from a genuine locked -> unlocking -> unlocked transition by itself. A
 * flat rename ({unlocking: unlocked}) can't tell the two apart either: it
 * either fires always (killing the real transition's "Unlocking…" busy
 * moment too) or never.
 *
 * What DOES tell them apart is asking whether the direction agrees with
 * `lastFamily` — the family ("locked" | "unlocked") the entity last
 * actually settled into. A direction that contradicts it is noise: the
 * settled family's own state is substituted in its place instead of
 * believing the false direction. Every other raw state (locked, unlocked,
 * open, opening, jammed, and a genuine locking/unlocking) passes through
 * unchanged — this only ever intercepts the two ambiguous words.
 */
export function settledLockState(rawState, lastFamily, lockedState = "locked") {
  if (rawState === "unlocking" && lastFamily && lastFamily !== "locked") return "unlocked";
  if (rawState === "locking" && lastFamily && lastFamily !== "unlocked") return lockedState;
  return rawState;
}

/** Family an (already-settled-through settledLockState) state belongs to —
 *  "open" counts as unlocked; only the ICON needs the finer face. */
export function lockFamily(effectiveState, lockedState = "locked") {
  return effectiveState === lockedState ? "locked" : "unlocked";
}

/** True while `effectiveState` is a genuine in-flight direction/fault —
 *  the set `settledLockState` never rewrites, so these are always real. */
export function isLockBusy(effectiveState) {
  return effectiveState === "locking" || effectiveState === "unlocking"
    || effectiveState === "opening" || effectiveState === "jammed";
}
