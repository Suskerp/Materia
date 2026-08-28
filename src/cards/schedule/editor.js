import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaScheduleEditor extends SmartEditorBase {
  /* Mirror runtime defaults without persisting them merely by opening the
     editor. SmartEditor gives otherwise-unspecified booleans a visible `false`;
     true defaults must be declared here because they are semantic choices. */
  _formData() {
    // presentation is a closed select; the three strings are runtime
    // (i18n-translated) defaults that must not be frozen into config.
    return {
      presentation: "inline",
      editor_presentation: "inline",
      schedule_types: ["window"],
      show_triggers: true,
      ...this._config,
    };
  }

  get _sections() {
    return [
      {
        title: "Setup",
        icon: "mdi:tune",
        expanded: true,
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
              { value: "manager", label: "Manager — list, add and edit several schedules" },
            ] } },
          },
          { name: "empty_label", label: "Strip title when nothing is set", selector: { text: {} } },
          { name: "empty_sub", label: "Strip sub-line when nothing is set", selector: { text: {} } },
        ],
      },
      {
        title: "Wiring",
        icon: "mdi:transit-connection-variant",
        expanded: false,
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
        expanded: false,
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
        title: "Managed schedules",
        icon: "mdi:clock-start",
        expanded: false,
        // Turns the clock tab into a recurring start+stop range instead of a
        // single moment. schedule_entity both seeds the picker from what is
        // already live and is what gets written back to on save.
        fields: [
          {
            name: "schedule_types",
            label: "Schedules people may create",
            helper: "Choose recurring windows, one-time actions, or configured multi-step plans. Existing cards default to recurring windows only.",
            selector: { select: { multiple: true, options: [
              { value: "window", label: "Recurring start and end" },
              { value: "once", label: "One-time action" },
              { value: "plan", label: "Multi-step plan" },
            ] } },
          },
          {
            name: "manager_tag",
            label: "Schedule group",
            helper: "A friendly internal tag used to keep this page's schedules together, for example materia_house_plans.",
            selector: { text: {} },
          },
          {
            name: "plans",
            label: "Multi-step plans",
            helper: 'Advanced: list of {key, name, icon, phases:[{name, offset_minutes, actions:[{service, entity_id, service_data}]}]}. Each phase becomes a restart-safe one-time Scheduler entry.',
            selector: { object: {} },
          },
          {
            name: "manage_schedules",
            label: "Manage multiple schedules",
            helper: "Shows a parent-friendly list and lets people add or edit Scheduler entries without exposing entity IDs or service names.",
            selector: { boolean: {} },
          },
          {
            name: "editor_presentation",
            label: "Open schedule editor",
            helper: "Popup keeps the dashboard compact. Requires Browser Mod; inline remains available as a dependency-free fallback.",
            selector: { select: { mode: "dropdown", options: [
              { value: "popup", label: "Popup" },
              { value: "inline", label: "Expand inline" },
            ] } },
          },
          {
            name: "targets",
            label: "Devices and friendly actions",
            helper: 'List of {entity, name, icon, actions:[{service,label,icon}]}. People may combine devices that share an action; matching schedules are discovered automatically.',
            selector: { object: {} },
          },
          {
            name: "schedule_entities",
            label: "Additional schedule entities",
            helper: "Optional explicit switch.schedule_* list, for schedules that cannot be discovered through their target device.",
            selector: { entity: { domain: "switch", multiple: true } },
          },
          {
            name: "schedule_entity",
            label: "Scheduler entity",
            helper: "A switch.schedule_* entity (HACS Scheduler integration). Reads its current window/weekdays on open, writes back with scheduler.edit. Implies a start+stop window.",
            selector: { entity: { domain: "switch" } },
          },
          {
            name: "show_stop",
            label: "Start+stop window without a scheduler entity",
            helper: "For driving a custom confirm_action with $start/$stop/$weekdays/$actions instead of binding to Scheduler.",
            selector: { boolean: {} },
          },
          {
            name: "actions",
            label: "Start actions",
            helper: 'Actions performed when the window starts, e.g. [{service: "switch.turn_on", entity_id: "switch.pool_pump"}]. Only needed outside manager mode.',
            selector: { object: {} },
          },
          {
            name: "end_actions",
            label: "End actions",
            helper: 'Actions performed when the window ends. If omitted, turn_on/turn_off is inverted where possible.',
            selector: { object: {} },
          },
        ],
      },
      {
        title: "Triggers",
        icon: "mdi:sensors",
        expanded: false,
        // The "When..." tab's list. Left as raw objects rather than a managed
        // list UI: this is a mocked POC, and the shape will change as soon as
        // there is a real backend deciding what a trigger even is.
        fields: [
          {
            name: "show_triggers",
            label: 'Show the "When…" tab',
            helper: "Disable this for a straightforward clock-only scheduler.",
            selector: { boolean: {} },
          },
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
