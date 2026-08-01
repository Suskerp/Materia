/**
 * Cross-card optimistic state. Every Materia card shares this module
 * instance, so the card that FIRES a command can tell sibling cards watching
 * the same entity what is about to happen — the hero above a lock says
 * "Unlocking" the same instant the lock's own track does, instead of sitting
 * on the stale state for the round-trip.
 *
 * A prediction carries the BASELINE it was made against and dies the moment
 * the entity moves off it (reality has taken over) or after a short TTL
 * (the command was ignored). It is a bridge over the ack gap, never a second
 * source of truth.
 */
const subs = new Set();
const predictions = new Map(); // entity -> { state, baseline, until }

export const OptimismBus = {
  /** Announce that `entity` (currently reporting `baseline`) was just told
   *  to move — `state` is what the UI should say in the meantime. */
  publish(entity, state, baseline, ttlMs = 10000) {
    if (!entity) return;
    predictions.set(entity, { state: String(state), baseline: String(baseline ?? ""), until: Date.now() + ttlMs });
    subs.forEach((fn) => fn(entity));
  },

  /** The predicted state for `entity`, or null once reality moved or the
   *  prediction expired. Callers pass the entity's CURRENT state. */
  peek(entity, currentState) {
    const p = predictions.get(entity);
    if (!p) return null;
    if (Date.now() > p.until || String(currentState) !== p.baseline) {
      predictions.delete(entity);
      return null;
    }
    return p.state;
  },

  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  },
};
