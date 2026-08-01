/**
 * Optimistic single-value selection, extracted from materia-button-group's
 * proven contract so bar-select and select-hero don't grow three diverging
 * copies (the hero-shell lesson).
 *
 * THE CONTRACT. On tap, pin the predicted value and remember the REAL value
 * at tap time as a baseline. The pin is released the moment reality moves at
 * all — either it matches the prediction, or it landed somewhere else
 * (automations may remap an option; a device may refuse) — because the real
 * state must always win over a prediction. A 10s failsafe releases the pin
 * even if nothing ever moves, so a dead service call can't wedge the UI in a
 * fiction.
 *
 * The host card supplies one thing: `_optimisticActual()`, the current real
 * value as a string (or null while unknown). It then reads `_optimistic`
 * instead of the raw value, calls `_optimisticSet(v)` when the user picks,
 * and `_optimisticReconcile()` from updated() on hass changes.
 */
export const OptimisticMixin = (Base) =>
  class extends Base {
    static properties = {
      // Reactive: pinning must re-render immediately — that IS the feature.
      _optimisticValue: { state: true },
    };

    _optimisticSet(predicted) {
      this._optimisticBaseline = this._optimisticActual();
      this._optimisticValue = String(predicted);
      clearTimeout(this._optimisticTimer);
      this._optimisticTimer = setTimeout(() => {
        this._optimisticValue = null;
      }, 10000);
    }

    /** The value the UI should show: the pin while it holds, reality after. */
    get _optimistic() {
      return this._optimisticValue ?? this._optimisticActual();
    }

    /** Call on every hass change. Case-insensitive match on the prediction —
     *  integrations disagree with themselves about casing — but exact match on
     *  the baseline, since any real movement at all is release-worthy. */
    _optimisticReconcile() {
      if (this._optimisticValue == null) return;
      const actual = this._optimisticActual();
      if (actual == null) return;
      const landed = String(actual).toLowerCase() === this._optimisticValue.toLowerCase();
      const moved = this._optimisticBaseline != null && String(actual) !== String(this._optimisticBaseline);
      if (landed || moved) {
        this._optimisticValue = null;
        this._optimisticBaseline = null;
        clearTimeout(this._optimisticTimer);
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      clearTimeout(this._optimisticTimer);
    }
  };
