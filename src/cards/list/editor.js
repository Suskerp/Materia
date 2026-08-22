import { html, css } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";

class MateriaListEditor extends SmartEditorBase {
  static styles = [
    SmartEditorBase.styles,
    css`
      .yaml-note {
        margin-top: 14px;
        padding: 10px 12px;
        border-radius: 12px;
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        font-size: 12px;
        line-height: 1.5;
        color: var(--secondary-text-color);
      }
      .yaml-note code {
        font-family: var(--code-font-family, monospace);
        font-size: 11px;
      }
      .yaml-note pre {
        margin: 6px 0 0;
        white-space: pre-wrap;
        font-size: 11px;
      }
    `,
  ];

  /* Only `variant` has a real card-side default worth seeding. `color` and
     `color_on` deliberately do NOT: absent means "use the container pair for
     the chosen variant", so seeding them would freeze today's tokens into the
     config the first time anyone opened and saved this editor. */
  _formData() {
    return { variant: "surface", ...this._config };
  }

  _sectionsSignature() {
    return this._config?.variant || "surface";
  }

  get _sections() {
    const tonal = this._config?.variant === "tonal";
    return [
      {
        title: "Content",
        icon: "mdi:card-text-outline",
        fields: [
          { name: "title", label: "Title", selector: { text: {} } },
          { name: "icon", label: "Header icon", selector: { icon: {} } },
          {
            name: "entities",
            label: "Entities (rows)",
            helper:
              "For a list of readings. Mixed lists — text lines alongside entities — use the rows: key in YAML instead; see the note below.",
            selector: { entity: { multiple: true } },
          },
        ],
      },
      {
        title: "Appearance",
        icon: "mdi:palette-outline",
        fields: [
          {
            name: "variant",
            label: "Surface",
            helper:
              "Tonal fills the card with a container pair, for a panel meant to read as one block rather than as part of the page.",
            selector: { select: { mode: "dropdown", options: [
              { value: "surface", label: "Card surface" },
              { value: "tonal", label: "Tonal container" },
            ] } },
          },
          ...(tonal
            ? [
                {
                  name: "color",
                  label: "Container (default primary container)",
                  helper: "Pick a CONTAINER role, not an accent — a container carries its matching text colour, an accent does not.",
                  color: true,
                  selector: { text: {} },
                },
                { name: "color_on", label: "Text on the container", color: true, selector: { text: {} } },
              ]
            : []),
        ],
      },
    ];
  }

  /* Rows are YAML-only, on purpose. A row is a union — an entity reading or a
     line of text, each with its own keys — and ha-form has no way to offer
     "one of these two shapes" in a repeatable list. A managed list could be
     built, but it would have to guess which kind the author meant on every
     add, so a short honest note beats a field that fights you. */
  _renderExtra() {
    return html`
      <div class="yaml-note">
        <strong>Text lines and mixed lists are YAML-only.</strong>
        Use <code>rows:</code> instead of <code>entities:</code> — it takes both
        kinds and wins when both are present. A row with <code>text</code> is a
        line; a row with <code>entity</code> is a reading. <code>text</code>
        accepts a template.
        <pre>
rows:
  - icon: mdi:leaf
    text: Charges only on surplus solar
  - icon: mdi:clock-outline
    text: "{{ states('sensor.laadstatus') }}"
  - entity: sensor.over_kw
    name: Over
    unit: kW</pre>
      </div>
    `;
  }
}

customElements.define("materia-list-editor", MateriaListEditor);
