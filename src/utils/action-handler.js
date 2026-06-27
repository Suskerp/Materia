/**
 * Action handler mixin for Materia cards.
 * Provides _handleAction(actionConfig) to any LitElement subclass.
 *
 * Usage:
 *   import { ActionMixin } from "../utils/action-handler.js";
 *   class MyCard extends ActionMixin(LitElement) { ... }
 */

export const ActionMixin = (superClass) =>
  class extends superClass {
    /**
     * Fire a haptic event. The HA Android Companion app listens for this
     * and triggers a native haptic on the device.
     * type: light | medium | heavy | success | warning | failure | selection
     */
    _fireHaptic(type = "light") {
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
     * Supports: toggle, call-service/perform-action, navigate, more-info,
     * fire-dom-event, none.
     */
    _handleAction(actionConfig) {
      if (!actionConfig || actionConfig.action === "none") return;
      this._fireHaptic("light");

      switch (actionConfig.action) {
        case "toggle":
          if (this.config?.entity) {
            this.hass.callService("homeassistant", "toggle", {
              entity_id: this.config.entity,
            });
          }
          break;

        case "perform-action":
        case "call-service": {
          const svc = actionConfig.perform_action || actionConfig.service || "";
          const [domain, service] = svc.split(".", 2);
          if (domain && service) {
            this.hass.callService(
              domain,
              service,
              { ...actionConfig.service_data, ...actionConfig.data },
              actionConfig.target
            );
          }
          break;
        }

        case "navigate":
          history.pushState(null, "", actionConfig.navigation_path);
          this.dispatchEvent(
            new Event("location-changed", { bubbles: true, composed: true })
          );
          break;

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
