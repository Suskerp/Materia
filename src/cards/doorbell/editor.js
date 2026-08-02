import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaDoorbellEditor extends SmartEditorBase {
  _formData() {
    return { ...this._config };
  }

  get _sections() {
    return [
      {
        title: "Doorbell",
        icon: "mdi:doorbell",
        fields: [
          {
            name: "entity",
            label: "Doorbell entity",
            helper: "on = ringing. The countdown runs from its last change.",
            selector: { entity: { domain: ["input_boolean", "binary_sensor", "switch"] } },
          },
          {
            name: "timeout",
            label: "Ring timeout (seconds)",
            helper: "Match the popup timeout so the bar and the dialog agree.",
            selector: { number: { min: 5, max: 300, mode: "box" } },
          },
          { name: "name", label: "Eyebrow while ringing (default: Doorbell)", selector: { text: {} } },
          { name: "place", label: "Where the ring is from (default: Front door)", selector: { text: {} } },
        ],
      },
      {
        title: "Buzz panel",
        icon: "mdi:bullhorn",
        fields: [
          {
            name: "buzz_action",
            label: "Tap-to-buzz action",
            helper: "The street-door buzzer. Leave empty to hide the panel.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "buzz_entity",
            label: "Buzzing indicator",
            helper: "on = buzzing (usually the buzzer script itself).",
            selector: { entity: {} },
          },
          { name: "buzz_title", label: "Panel title (default: Buzz in)", selector: { text: {} } },
          {
            name: "buzz_sub",
            label: "Panel sub-line",
            helper: 'Default: "Street door only", translated with the dashboard.',
            selector: { text: {} },
          },
        ],
      },
      {
        title: "Open panel",
        icon: "mdi:lock-open-variant-outline",
        fields: [
          {
            name: "lock",
            label: "Lock",
            helper: "The gesture unlocks this. Leave empty to hide the panel.",
            selector: { entity: { domain: "lock" } },
          },
          {
            name: "open_gesture",
            label: "Open gesture",
            selector: { select: { mode: "dropdown", options: [
              { value: "slide", label: "Slide" },
              { value: "hold", label: "Hold" },
            ] } },
          },
          {
            name: "open_action",
            label: "Open action (replaces the plain unlock)",
            helper: "For a let-them-in sequence that clears more than this one lock. Re-locking always drives the lock itself.",
            selector: { ui_action: { default_action: "none" } },
          },
          { name: "open_title", label: "Panel title (default: Open the front door)", selector: { text: {} } },
          {
            name: "open_sub",
            label: "Panel sub-line",
            helper: 'Default: "Unlocks the front door for your visitor.", translated with the dashboard.',
            selector: { text: {} },
          },
        ],
      },
      {
        title: "Bottom row",
        icon: "mdi:dots-horizontal",
        fields: [
          {
            name: "ignore_action",
            label: "Ignore",
            helper: "Empty hides the button. The whole row hides when nothing in it is configured.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "replay_action",
            label: "Replay ring",
            helper: "Empty hides the button.",
            selector: { ui_action: { default_action: "none" } },
          },
          {
            name: "mute_entity",
            label: "Mute toggle entity",
            helper: "input_boolean silencing the chime. Empty hides the button.",
            selector: { entity: { domain: "input_boolean" } },
          },
        ],
      },
    ];
  }
}

customElements.define("materia-doorbell-editor", MateriaDoorbellEditor);
