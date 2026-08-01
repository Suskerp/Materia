import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaScheduleEditor extends SmartEditorBase {
  /* Nothing here defaults to TRUE, so there is no switch to seed — but the text
     defaults are still mirrored so the fields show what the card will actually
     render rather than sitting empty. */
  _formData() {
    // presentation is a closed select; the three strings are runtime
    // (i18n-translated) defaults that must not be frozen into config.
    return {
      presentation: "inline",
      ...this._config,
    };
  }

  get _sections() {
    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        fields: [
          {
            name: "name",
            label: "Eyebrow above the chosen moment",
            helper: 'What is being scheduled — e.g. "Start cleaning".',
            selector: { text: {} },
          },
          {
            name: "presentation",
            label: "Presentation",
            helper: "Sheet drops the collapsed strip and renders the picker directly — for putting the card inside a browser_mod popup.",
            selector: { select: { mode: "dropdown", options: [
              { value: "inline", label: "Inline — collapsed strip that expands" },
              { value: "sheet", label: "Sheet — always open, for a modal" },
            ] } },
          },
          { name: "empty_label", label: "Strip title when nothing is set", selector: { text: {} } },
          { name: "empty_sub", label: "Strip sub-line when nothing is set", selector: { text: {} } },
        ],
      },
      {
        title: "Wiring",
        icon: "mdi:transit-connection-variant",
        // $placeholders are substituted by the card before the service is
        // called — see the note in index.js on why this is not Jinja.
        fields: [
          {
            name: "confirm_action",
            label: "On confirm",
            helper: "Use $datetime, $date, $time, $duration, $weekdays, $repeat, $trigger, $label in the data.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "trigger_action",
            label: "On confirm, trigger tab",
            helper: "Falls back to the confirm action when unset.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "close_action",
            label: "How to dismiss the modal",
            helper: "Sheet presentation only. Defaults to browser_mod.close_popup.",
            selector: { ui_action: { default_action: "none" } },
          },
        ],
      },
      {
        title: "Shortcuts",
        icon: "mdi:clock-fast",
        fields: [
          {
            name: "presets",
            label: 'The "At a time" shortcuts',
            helper: "List of { label, offset: 90m|2h|1d } or { label, at: \"09:00\", days: 1 } or { label, at, weekday: 6 }. Each may carry its own tap_action. Empty for the built-in six.",
            selector: { object: {} },
          },
          { name: "minutes", label: "Minute options (default 0, 15, 30, 45)", selector: { object: {} } },
        ],
      },
      {
        title: "Triggers",
        icon: "mdi:sensors",
        // The "When..." tab's list. Left as raw objects rather than a managed
        // list UI: this is a mocked POC, and the shape will change as soon as
        // there is a real backend deciding what a trigger even is.
        fields: [
          {
            name: "triggers",
            label: "Non-clock triggers",
            helper: "List of { key, name, sub, icon }. Leave empty for the built-in four.",
            selector: { object: {} },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-schedule-editor", MateriaScheduleEditor);
