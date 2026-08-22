import { SmartEditorBase, DISABLED_FIELD } from "../../utils/smart-editor.js";

class MateriaConfirmEditor extends SmartEditorBase {
  /* Every boolean, number and enum seeded at the card's REAL default. An
     option absent from config arrives as `undefined`, ha-form draws it as
     off/0/empty, and merely opening this editor and saving writes that wrong
     value for good. This bit the alarm card once with a pending timeout that
     silently halved itself, so it is checked here by assertion too. */
  _formData() {
    return {
      gesture: "hold",
      require_gesture: "activate",
      hold_ms: 800,
      threshold: 0.55,
      pending_timeout_ms: 10000,
      caption_warn: true,
      ...this._config,
    };
  }

  _sectionsSignature() {
    return [
      this._config?.entity ? "e" : "",
      this._config?.gesture || "hold",
      this._config?.require_gesture || "activate",
      this._config?.action ? "a" : "",
    ].join("|");
  }

  get _sections() {
    const hold = (this._config?.gesture ?? "hold") !== "slide";
    const hasEntity = !!this._config?.entity;
    const both = this._config?.require_gesture === "both";

    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "entity",
            label: "Entity to reflect and drive (optional)",
            helper:
              "With an entity and no actions below, the gesture turns it on and the active face turns it off — nothing else to configure. Leave empty to fire an action only.",
            selector: { entity: {} },
          },
          ...(hasEntity
            ? [{
                name: "active_state",
                label: "State that counts as active",
                helper: 'Defaults to the usual on/open/unlocked family. Set this for a control whose "on" is spelled something else.',
                selector: { text: {} },
              }]
            : []),
          {
            name: "action",
            label: "Action when committing",
            helper: "Fired when the gesture completes. Overrides the default turn-on.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "deactivate_action",
            label: "Action when switching off",
            helper: "Fired by the active face. Overrides the default turn-off.",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "Gesture",
        icon: "mdi:gesture-tap-hold",
        fields: [
          {
            name: "gesture",
            label: "Commit gesture",
            selector: { select: { mode: "dropdown", options: [
              { value: "hold", label: "Press and hold" },
              { value: "slide", label: "Slide across" },
            ] } },
          },
          {
            name: "require_gesture",
            label: "Which direction needs the gesture",
            helper:
              "Turning ON only, by default: switching an override off returns things to normal and costs nothing, and making the cheap direction ceremonial teaches people the gesture is a formality. Choose both where OFF is the dangerous direction — a control that disables a protection rather than enabling a cost.",
            selector: { select: { mode: "dropdown", options: [
              { value: "activate", label: "Only turning on" },
              { value: "both", label: "Both directions" },
            ] } },
          },
          ...(hold
            ? [{
                name: "hold_ms",
                label: "Hold for (ms, default 800)",
                helper: "Keep this above 500ms — the platform long-press timeout — or an ordinary long-press commits by accident.",
                selector: { number: { min: 300, max: 5000, step: 50, mode: "box" } },
              }]
            : [{
                name: "threshold",
                label: "Fraction of the track to cross (default 0.55)",
                selector: { number: { min: 0.2, max: 1, step: 0.05, mode: "box" } },
              }]),
          ...(hasEntity
            ? [{
                name: "pending_timeout_ms",
                label: "Give up waiting for the entity after (ms, default 10000)",
                selector: { number: { min: 1000, max: 60000, step: 500, mode: "box" } },
              }]
            : []),
        ],
      },
      {
        title: "Words",
        icon: "mdi:text-short",
        fields: [
          { name: "eyebrow", label: "Eyebrow (optional)", template: true, selector: { text: {} } },
          {
            name: "label",
            label: "Gesture label",
            helper: "The instruction across the track. Keep it short — it sits on one line.",
            template: true,
            selector: { text: {} },
          },
          {
            name: "caption",
            label: "Warning / consequence line",
            helper:
              "THE POINT OF THIS CARD. Shown before the gesture is touched and while it is held, which is strictly more informative than a dialog that appears after the decision and gets dismissed by reflex. Put the cost or the consequence here.",
            template: true,
            selector: { text: {} },
          },
          { name: "caption_warn", label: "Colour the warning line", selector: { boolean: {} } },
          {
            name: "active_label",
            label: "Label while active",
            template: true,
            selector: { text: {} },
          },
          {
            name: "active_caption",
            label: "Caption while active",
            helper: "Falls back to the warning line above when empty.",
            template: true,
            selector: { text: {} },
          },
          ...(both
            ? []
            : [{
                name: "deactivate_hint",
                label: 'Active face hint (default "Tap to stop")',
                selector: { text: {} },
              }]),
          ...(hasEntity
            ? [{ name: "busy_label", label: 'While waiting (default "Working…")', selector: { text: {} } }]
            : []),
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          { name: "active_color", label: "Background while active", color: true, selector: { text: {} } },
          { name: "active_color_on", label: "Text while active", color: true, selector: { text: {} } },
          { name: "track_color", label: "Gesture track", color: true, selector: { text: {} } },
          { name: "track_color_on", label: "Text on the track", color: true, selector: { text: {} } },
          ...(hold
            ? []
            : [
                { name: "handle_color", label: "Slide handle", color: true, selector: { text: {} } },
                { name: "handle_color_on", label: "Handle glyph", color: true, selector: { text: {} } },
              ]),
          { name: "active_icon", label: 'Icon while active (default "check-circle")', selector: { icon: {} } },
          { name: "gesture_icon", label: "Icon on the gesture handle (optional)", selector: { icon: {} } },
        ],
      },
      {
        title: "Disabled",
        icon: "mdi:cancel",
        expanded: false,
        fields: [DISABLED_FIELD],
      },
    ];
  }
}

customElements.define("materia-confirm-editor", MateriaConfirmEditor);
