import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaScheduleEditor extends SmartEditorBase {
  /* Nothing here defaults to TRUE, so there is no switch to seed — but the text
     defaults are still mirrored so the fields show what the card will actually
     render rather than sitting empty. */
  _formData() {
    return {
      name: "Schedule",
      empty_label: "Not scheduled",
      empty_sub: "Tap to pick a time or a trigger",
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
          { name: "empty_label", label: "Strip title when nothing is set", selector: { text: {} } },
          { name: "empty_sub", label: "Strip sub-line when nothing is set", selector: { text: {} } },
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
