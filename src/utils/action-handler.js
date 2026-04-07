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

    /** Resolve a config field that may be a Jinja2 template into a reactive property. */
    _resolveField(configKey, propKey) {
      const val = this.config?.[configKey];
      if (this._isTemplate(val)) {
        this._renderTemplate(val).then(result => {
          const trimmed = typeof result === "string" ? result.trim() : result;
          if (trimmed !== this[propKey]) this[propKey] = trimmed;
        });
      }
    }

    /**
     * Render a Jinja2 template via HA's REST API.
     * Returns the raw value if it doesn't contain {{ }}.
     */
    async _renderTemplate(template) {
      if (!template || typeof template !== "string") return template;
      if (!template.includes("{{") && !template.includes("{%")) return template;
      try {
        const result = await this.hass.callApi("POST", "template", { template });
        return typeof result === "string" ? result.trim() : String(result).trim();
      } catch {
        return template;
      }
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
