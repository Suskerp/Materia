import { html } from "lit";
import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";
import "../../utils/media-editors.js";

const ROW_KEYS = ["text", "entity", "name", "icon", "attribute", "unit", "tap_action"];

/** A row form result; empty keys are dropped, others kept. */
const rowFromForm = (old, value) => {
  const next = { ...old, ...value };
  for (const k of ROW_KEYS) if (next[k] === "" || next[k] == null) delete next[k];
  return next;
};

const rowSchemas = {};
const rowSchema = (hass) =>
  (rowSchemas[hass?.locale?.language ?? ""] ??= [
    { name: "text", label: t("ed_row_text", hass), selector: { text: {} } },
    { name: "entity", label: t("ed_row_entity", hass), selector: { entity: {} } },
    { name: "name", label: t("ed_row_name", hass), selector: { text: {} } },
    { name: "icon", selector: { icon: {} } },
    { name: "attribute", label: t("ed_row_attribute", hass), selector: { text: {} } },
    { name: "unit", label: t("ed_row_unit", hass), selector: { text: {} } },
    { name: "tap_action", label: t("ed_alert_action", hass), selector: { ui_action: {} } },
  ]);

class MateriaListEditor extends SmartEditorBase {
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
          /* template: true on BOTH, because the card resolves both. An editor
             that cannot enter a template the card would honour is the same bug
             from the other side — and that half was missed on the expander. */
          { name: "title", label: "Title", template: true, selector: { text: {} } },
          { name: "icon", label: "Header icon", template: true, selector: { icon: {} } },
          {
            name: "entities",
            label: "Entities (rows)",
            helper: t("ed_list_entities_helper", this.hass),
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

  /* `rows` (text lines and readings, mixed) as a list: a row with text is a
     line, one without a reading; it wins over `entities` when both exist. */
  _renderExtra() {
    const h = this.hass;
    return html`<materia-item-list-editor
      .hass=${h}
      .items=${Array.isArray(this._config.rows) ? this._config.rows : []}
      .schema=${rowSchema(h)}
      .itemLabel=${(r) => r?.text || r?.name || r?.entity}
      .fromForm=${rowFromForm}
      .newItem=${() => ({ text: "" })}
      addLabel=${t("ed_list_rows", h)}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._setField("rows", e.detail.value?.length ? e.detail.value : undefined);
      }}
    ></materia-item-list-editor>`;
  }
}

customElements.define("materia-list-editor", MateriaListEditor);
