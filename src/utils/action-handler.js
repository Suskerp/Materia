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
     * Dispatch an action based on a tap_action / hold_action config object.
     * Supports: toggle, call-service, navigate, more-info, none.
     */
    _handleAction(actionConfig) {
      if (!actionConfig || actionConfig.action === "none") return;

      switch (actionConfig.action) {
        case "toggle":
          if (this.config?.entity) {
            this.hass.callService("homeassistant", "toggle", {
              entity_id: this.config.entity,
            });
          }
          break;

        case "call-service": {
          const [domain, service] = (actionConfig.service || "").split(".", 2);
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

        default:
          break;
      }
    }

    /**
     * Evaluate a template string. If value is wrapped in [[ ]], evaluate as JS
     * with access to hass, states, and entity. Otherwise return as-is.
     */
    _evalTemplate(value) {
      if (typeof value !== "string") return value;
      if (!value.startsWith("[[") || !value.endsWith("]]")) return value;
      const expr = value.slice(2, -2).trim();
      try {
        const fn = new Function("hass", "states", "entity", `return ${expr};`);
        return fn(this.hass, this.hass?.states, this.hass?.states?.[this.config?.entity]);
      } catch {
        return value;
      }
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
