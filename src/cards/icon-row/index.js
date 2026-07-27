import { MateriaButtonGroup } from "../../elements/button-group/index.js";

/**
 * DEPRECATED — `materia-icon-row` is now the `standard` configuration of
 * `materia-button-group`, matching the M3 spec, which describes one "Button
 * group" component with standard and connected configurations.
 *
 * Kept registered so existing dashboards keep rendering: it simply forwards to
 * the merged card with `group: "standard"`. Prefer writing new cards as:
 *
 *   type: custom:materia-button-group
 *   group: standard
 *   size: l          # sizes the whole group — M3 sizes a group as one unit
 *   buttons: [...]
 *
 * Intentionally absent from window.customCards so the picker only offers the
 * canonical name.
 */
class MateriaIconRow extends MateriaButtonGroup {
  setConfig(config) {
    super.setConfig({ ...config, group: "standard" });
  }
}

customElements.define("materia-icon-row", MateriaIconRow);
