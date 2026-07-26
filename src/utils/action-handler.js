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
              this._callService("lock", state === "locked" ? "unlock" : "lock", { entity_id: eid });
              break;
            case "cover":
              this._callService("cover", ["closed", "closing"].includes(state) ? "open_cover" : "close_cover", { entity_id: eid });
              break;
            case "valve":
              this._callService("valve", ["closed", "closing"].includes(state) ? "open_valve" : "close_valve", { entity_id: eid });
              break;
            case "scene":
              this._callService("scene", "turn_on", { entity_id: eid });
              break;
            case "button":
            case "input_button":
              this._callService(domain, "press", { entity_id: eid });
              break;
            case "vacuum":
              this._callService("vacuum", ["docked", "idle", "paused"].includes(state) ? "start" : "return_to_base", { entity_id: eid });
              break;
            default:
              this._callService("homeassistant", "toggle", { entity_id: eid });
          }
          break;
        }

        case "perform-action":
        case "call-service": {
          const svc = actionConfig.perform_action || actionConfig.service || "";
          const [domain, service] = svc.split(".", 2);
          if (domain && service) {
            this._callService(
              domain,
              service,
              { ...actionConfig.service_data, ...actionConfig.data },
              actionConfig.target
            );
          }
          break;
        }

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
        .catch((err) => {
          const ev = new Event("hass-notification", { bubbles: true, composed: true });
          ev.detail = { message: err?.message || `Failed: ${domain}.${service}` };
          this.dispatchEvent(ev);
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
