/**
 * Action handler mixin for Materia cards.
 * Provides _handleAction(actionConfig) to any LitElement subclass.
 *
 * Usage:
 *   import { ActionMixin } from "../utils/action-handler.js";
 *   class MyCard extends ActionMixin(LitElement) { ... }
 */
import { t } from "./i18n.js";

/** Timestamp of the last haptic fired anywhere in the library.
 *
 *  One user action must produce ONE haptic. Nested Materia elements each own a
 *  slice of a single gesture — a chip fires its selection, then delegates to
 *  _handleAction, which used to fire again — so a tap on a room chip buzzed
 *  twice. Because the `haptic` event bubbles to the document, HA cannot tell the
 *  two apart; the only place to collapse them is here. */
let _lastHapticAt = 0;
const HAPTIC_DEDUPE_MS = 120;

/** Actions that actually CHANGE something.
 *
 *  Google's haptic principles list exactly one relevant use for a tap: "to
 *  confirm a state change in the device following a user action". Opening a
 *  more-info dialog, navigating to another view or firing a dom-event changes no
 *  device state, so those are silent — and on a dashboard where most tiles
 *  navigate, that is the difference between haptics meaning something and
 *  buzzing on every touch. */
const STATE_CHANGING_ACTIONS = new Set(["toggle", "perform-action", "call-service"]);

/** Long-press arm time. Exported so hold-progress visuals animate over the
 *  exact same window the timer fires on — two numbers here WILL drift. */
export const HOLD_MS = 500;

export const ActionMixin = (superClass) =>
  class extends superClass {
    /**
     * Fire a haptic event. The HA Android Companion app listens for this
     * and triggers a native haptic on the device.
     * type: light | medium | heavy | success | warning | failure | selection
     */
    _fireHaptic(type = "light") {
      const now = Date.now();
      if (now - _lastHapticAt < HAPTIC_DEDUPE_MS) return;
      _lastHapticAt = now;
      this.dispatchEvent(
        new CustomEvent("haptic", {
          detail: type,
          bubbles: true,
          composed: true,
        })
      );
    }

    /**
     * Dispatch an action based on a tap_action / hold_action config object.
     * Supports: toggle, call-service/perform-action, navigate, url,
     * more-info, fire-dom-event, none — plus `confirmation:`.
     *
     * CONFIRMATION IS HONOURED FIRST. The editors offer HA's full ui_action
     * selector, so a lock action can carry confirmation: {...} — and this
     * used to be read by nobody: the guard the user configured did not
     * exist, and the door unlocked on first tap. window.confirm is plainer
     * than HA's dialog, but a custom card cannot summon HA's internal
     * showConfirmationDialog, and a plain guard that exists beats a pretty
     * one that doesn't.
     */
    _handleAction(actionConfig) {
      if (!actionConfig || actionConfig.action === "none") return;
      const conf = actionConfig.confirmation;
      if (conf) {
        const c = conf === true ? {} : conf;
        const exempt = Array.isArray(c.exemptions)
          && c.exemptions.some((e) => e.user === this.hass?.user?.id);
        if (!exempt) {
          const text = c.text || t("confirm_action", this.hass);
          // eslint-disable-next-line no-alert
          if (!window.confirm(text)) return Promise.resolve({ ok: false, cancelled: true });
        }
      }
      if (STATE_CHANGING_ACTIONS.has(actionConfig.action)) this._fireHaptic("light");

      switch (actionConfig.action) {
        case "toggle": {
          // homeassistant.toggle only forwards to <domain>.toggle — locks,
          // scenes, vacuums, buttons and covers have no toggle service, so
          // route those domains explicitly (mirrors ha-frontend toggleEntity).
          // actionConfig.entity wins over the card entity so per-option
          // buttons (button-group/icon-row) toggle THEIR OWN entity.
          const eid = actionConfig.entity || this.config?.entity;
          if (!eid) break;
          const domain = eid.split(".")[0];
          const state = String(this.hass?.states[eid]?.state ?? "");
          switch (domain) {
            case "lock":
              return this._callService("lock", state === "locked" ? "unlock" : "lock", { entity_id: eid });
            case "cover":
              return this._callService("cover", ["closed", "closing"].includes(state) ? "open_cover" : "close_cover", { entity_id: eid });
            case "valve":
              return this._callService("valve", ["closed", "closing"].includes(state) ? "open_valve" : "close_valve", { entity_id: eid });
            case "scene":
              return this._callService("scene", "turn_on", { entity_id: eid });
            case "button":
            case "input_button":
              return this._callService(domain, "press", { entity_id: eid });
            case "vacuum":
              return this._callService("vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "return_to_base", { entity_id: eid });
            default:
              return this._callService("homeassistant", "toggle", { entity_id: eid });
          }
          break;
        }

        case "perform-action":
        case "call-service": {
          const svc = actionConfig.perform_action || actionConfig.service || "";
          const [domain, service] = svc.split(".", 2);
          if (domain && service) {
            return this._callService(
              domain,
              service,
              { ...actionConfig.service_data, ...actionConfig.data },
              actionConfig.target
            );
          }
          return Promise.resolve({ ok: false, error: new Error("Invalid service action") });
        }

        case "url": {
          // Offered by every ui_action selector in the editors and previously
          // unimplemented — the tap silently did nothing. Scheme-gated: only
          // web URLs and in-app relative paths; anything else (javascript:,
          // data:) is refused.
          const url = String(actionConfig.url_path ?? "");
          if (/^https?:\/\//.test(url)) window.open(url, "_blank", "noopener");
          else if (url.startsWith("/")) window.open(url, "_blank", "noopener");
          break;
        }
        case "assist":
          // Not implementable from a custom card without HA internals; warn
          // so a configured-but-dead action is at least diagnosable.
          console.warn("materia: the 'assist' action is not supported by Materia cards");
          break;
        case "navigate": {
          if (!actionConfig.navigation_path) break; // would push literal "undefined"
          const replace = !!actionConfig.navigation_replace;
          history[replace ? "replaceState" : "pushState"](null, "", actionConfig.navigation_path);
          const ev = new Event("location-changed", { bubbles: true, composed: true });
          ev.detail = { replace };
          this.dispatchEvent(ev);
          break;
        }

        case "more-info":
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              bubbles: true,
              composed: true,
              detail: {
                entityId: actionConfig.entity || this.config?.entity,
              },
            })
          );
          break;

        case "fire-dom-event": {
          // Fires a `ll-custom` DOM event with the config as detail — picked
          // up by browser_mod and other listeners (e.g. popups).
          const ev = new Event("ll-custom", { bubbles: true, composed: true, cancelable: false });
          ev.detail = actionConfig;
          this.dispatchEvent(ev);
          break;
        }

        default:
          break;
      }
    }

    /**
     * Call a HA service. Failures are caught (no unhandled rejections) but
     * surfaced as a HA toast — a silently-reverting optimistic state
     * otherwise looks like the card is broken.
     */
    _callService(domain, service, data, target) {
      return this.hass
        .callService(domain, service, data, target)
        .then((value) => ({ ok: true, value }))
        .catch((err) => {
          // A failure MUST feel different from a success. Without this a lock
          // that refused the call is indistinguishable by touch from one that
          // threw the bolt — Apple's notification generator exists precisely to
          // "communicate successes, failures, and warnings".
          _lastHapticAt = 0; // never let the de-dupe swallow a failure
          this._fireHaptic("failure");
          const ev = new Event("hass-notification", { bubbles: true, composed: true });
          ev.detail = { message: err?.message || `Failed: ${domain}.${service}` };
          this.dispatchEvent(ev);
          // Resolve to an explicit result rather than swallowing the failure as
          // indistinguishable `undefined`. Existing fire-and-forget controls can
          // continue to ignore the promise, while transactional flows (schedule
          // editors, optimistic inputs) can await it and keep their UI open or
          // roll back without creating an unhandled rejection.
          return { ok: false, error: err };
        });
    }

    /** Capitalize first letter of a string. */
    _capitalize(str) {
      if (!str || typeof str !== "string") return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /** Check if a value is a Jinja2 template string. */
    _isTemplate(val) {
      return val && typeof val === "string" && (val.includes("{{") || val.includes("{%"));
    }

    /**
     * Resolve a config field that may be a Jinja2 template into a reactive
     * property.
     *
     * Uses HA's WebSocket `render_template` subscription — NOT the REST
     * `/api/template` endpoint. The subscription renders once and then pushes a
     * new value only when the result actually changes, over the already
     * authenticated WS connection. This is critical: the old REST approach fired
     * one POST per templatable field on every single `hass` update across every
     * card, which floods `/api/template`, trips HA's http.ban, and fails for
     * non-admin users. Because we keep the subscription alive and short-circuit
     * when the template string is unchanged, calling _resolveField on every
     * `hass` update (as the cards do) costs nothing after the first subscribe.
     */
    /**
     * Like _resolveField, but for templates that don't live at a top-level
     * config key (e.g. per-option templates in a list). Pass the template
     * value directly with a stable key; results land in this._tplResults[key]
     * and trigger a re-render. Same WS render_template machinery + teardown.
     */
    _resolveTemplateValue(key, template) {
      this._tplSubs ??= {};
      this._tplResults ??= {};
      const existing = this._tplSubs[key];

      if (!this._isTemplate(template)) {
        if (existing) {
          this._tplSubs[key] = null;
          existing.unsub?.then((u) => u && u()).catch(() => {});
          delete this._tplResults[key];
        }
        return;
      }

      if (existing && existing.template === template) return;
      if (existing) existing.unsub?.then((u) => u && u()).catch(() => {});

      const conn = this.hass?.connection;
      if (!conn) return;

      const rec = { template, unsub: null };
      this._tplSubs[key] = rec;
      rec.unsub = conn.subscribeMessage(
        (msg) => {
          if (this._tplSubs?.[key] !== rec) return; // superseded
          const result = msg?.result;
          const value = typeof result === "string" ? result.trim() : result;
          if (this._tplResults[key] !== value) {
            this._tplResults[key] = value;
            this.requestUpdate();
          }
        },
        { type: "render_template", template, report_errors: false }
      );
      rec.unsub.catch(() => {});
    }

    _resolveField(configKey, propKey) {
      const val = this.config?.[configKey];
      this._tplSubs ??= {};
      const existing = this._tplSubs[propKey];

      // Not (or no longer) a template — tear down any live subscription.
      if (!this._isTemplate(val)) {
        if (existing) {
          this._tplSubs[propKey] = null;
          existing.unsub?.then((u) => u && u()).catch(() => {});
          this[propKey] = undefined;
        }
        return;
      }

      // Same template already subscribed — no-op (the cheap repeat path).
      if (existing && existing.template === val) return;

      // Template string changed — replace the subscription.
      if (existing) existing.unsub?.then((u) => u && u()).catch(() => {});

      const conn = this.hass?.connection;
      if (!conn) return;

      const rec = { template: val, unsub: null };
      this._tplSubs[propKey] = rec;

      rec.unsub = conn
        .subscribeMessage(
          (msg) => {
            if (this._tplSubs?.[propKey] !== rec) return; // superseded
            const result = msg?.result;
            const value = typeof result === "string" ? result.trim() : result;
            if (value !== this[propKey]) this[propKey] = value;
          },
          { type: "render_template", template: val, report_errors: false }
        )
        .catch(() => {
          // Subscription failed (e.g. a bad template) — show the raw string.
          if (this._tplSubs?.[propKey] === rec && this[propKey] === undefined) {
            this[propKey] = val;
          }
          return null;
        });
    }

    /** Tear down all live template subscriptions (called on disconnect). */
    _unsubscribeTemplates() {
      if (!this._tplSubs) return;
      for (const key of Object.keys(this._tplSubs)) {
        this._tplSubs[key]?.unsub?.then((u) => u && u()).catch(() => {});
      }
      this._tplSubs = {};
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      this._unsubscribeTemplates();
      clearTimeout(this._haTimer);
      this._haTimer = null;
      this._haArming = false;
    }

    /* ---- generic hold_action ------------------------------------------
       Native HA cards have hold_action; Materia didn't. These three
       handlers give it to any card that binds them on its root:

         pointerdown -> _holdDown, pointermove -> _holdMove,
         pointerup / pointercancel -> _holdUp

       HOLD_MS — the platform long-press timeout, so it agrees with what
       fingers already expect. Pointer travel over 12px hands the gesture
       back to the dashboard as a scroll. After a hold fires, the click
       that the browser still delivers on release must be swallowed:
       tap handlers call _consumeHold() first. A hold is deliberate BY
       CONSTRUCTION, which is what makes it a fit for guard duty on
       actions a stray tap must never fire (the drag-confirm rule).

       While the hold arms, _haArming is true so the component can show
       progress (the badge sweeps a fill across itself over HOLD_MS) —
       the gesture must LOOK like it is charging, or a short hold reads
       as an unresponsive tap. */

    _holdDown(ev) {
      const a = this.config?.hold_action;
      if (!a?.action || a.action === "none") return;
      this._haX = ev.clientX;
      this._haY = ev.clientY;
      clearTimeout(this._haTimer);
      this._haArming = true;
      this.requestUpdate();
      this._haTimer = setTimeout(() => {
        this._haFired = true;
        this._haArming = false;
        this.requestUpdate();
        this._fireHaptic("medium");
        this._handleAction(a);
      }, HOLD_MS);
    }

    _holdMove(ev) {
      if (!this._haTimer) return;
      if (Math.hypot(ev.clientX - this._haX, ev.clientY - this._haY) > 12) {
        this._holdCancel();
      }
    }

    _holdUp() {
      this._holdCancel();
    }

    _holdCancel() {
      clearTimeout(this._haTimer);
      this._haTimer = null;
      if (this._haArming) {
        this._haArming = false;
        this.requestUpdate();
      }
    }

    /** True exactly once after a hold fired — the following click is the
     *  same gesture, not a tap. */
    _consumeHold() {
      const fired = !!this._haFired;
      this._haFired = false;
      return fired;
    }

    /** Check if tap_action is navigate (for chevron rendering). */
    get _hasNavigateAction() {
      return this.config?.tap_action?.action === "navigate";
    }

    /** Check if entity is unavailable. */
    _isUnavailable(stateObj) {
      if (!stateObj) return true;
      return stateObj.state === "unavailable";
    }

    /** Convenience: fire more-info for a specific entity. */
    _fireMoreInfo(entityId) {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        })
      );
    }
  };
