import { SmartEditorBase } from "../../utils/smart-editor.js";
import { t } from "../../utils/i18n.js";

const VARIANTS = [
  { value: "percent", label: "e_percen_fillin_cookie" },
  { value: "battery", label: "e_batter_vertic_bar" },
  { value: "temperature", label: "e_temper_thermo" },
  { value: "power", label: "e_power_load_bars" },
  { value: "energy", label: "e_energy" },
  { value: "binary", label: "e_on_off_spinni" },
  { value: "plain", label: "e_plain_value" },
  { value: "vacuum", label: "e_robot_vacuum_state" },
  // The gauge family: these spend the tile's empty half on the scale, so all
  // four need a max they can calibrate against (config, the entity's own max
  // attribute, or 100 for a percentage).
  { value: "fill", label: "e_gauge_tile_floods" },
  { value: "bar", label: "e_gauge_value_over" },
  { value: "ladder", label: "e_gauge_ladder_bars" },
  { value: "ring", label: "e_gauge_ring_beside" },
  { value: "scale", label: "e_gauge_positi_on" },
  // The history family: these ask the recorder for the measurement's past.
  { value: "spark", label: "e_histor_area_sparkl" },
  { value: "sparkline", label: "e_histor_bare_line" },
  { value: "weekbars", label: "e_histor_bar_per" },
  { value: "events", label: "e_histor_event_ticks" },
  { value: "detail", label: "e_summar_value_histor" },
  { value: "progress_summary", label: "e_summar_progre_ring" },
];

/** Variants that fetch history. */
const HISTORIC = ["spark", "sparkline", "weekbars", "events"];
/** ...of which these bucket by day rather than plotting a line. */
const BUCKETED = ["weekbars", "events"];

/** Variants that read _gaugeRange and so accept min/max. */
const SCALED = ["fill", "bar", "ladder", "ring", "scale", "progress_summary"];

class MateriaGlanceTileEditor extends SmartEditorBase {
  /* The threshold/label defaults belong to the soil-moisture scale the percent
     tile draws, and the full-load watts to the power tile — both scoped to the
     variant, exactly like the fields they sit next to. The temperature scale is
     deliberately absent: its default depends on the entity's unit (10–30 °C,
     50–86 °F), so the field labels state it instead. */
  _formData() {
    const v = this._config?.variant;
    const perVariant =
      v === "percent"
        ? {
            critical_dry: 10,
            dry_below: 20,
            soggy_above: 60,
            dry_label: t("gt_needs_water_now", this.hass),
            soon_label: t("gt_water_soon", this.hass),
            optimal_label: t("gt_optimal", this.hass),
            wet_label: t("gt_overwatered", this.hass),
          }
        : v === "power"
          ? // bars is seeded at 5 because that is the ladder's real default,
            // and power has always drawn five — an editor that showed any
            // other number here would be lying about what the card does.
            { max: 3000, bars: 5 }
          : v === "ladder"
            ? { bars: 5 }
            : v === "spark" || v === "sparkline"
                ? // 24h and 48 points are the card's real defaults, and
                  // show_delta is true only for the area hero.
                  { hours: 24, points: 48, history_refresh: 5, show_delta: v === "spark" }
                : v === "weekbars" || v === "events"
                  ? // 3 days, not the concept's 7/14: a window past the
                    // recorder's retention returns NO series at all.
                    { days: 3, aggregate: "delta", history_refresh: 5 }
                  : v === "detail"
                    ? { days: 7, aggregate: "delta", history_refresh: 5 }
                    : {};
    return { variant: "percent", show_icon: true, ...perVariant, ...this._config };
  }

  _sectionsSignature() {
    return this._config?.variant || "";
  }

  get _sections() {
    const v = this._config?.variant;

    const content = {
      title: "e_content",
      icon: "mdi:card-text-outline",
      fields: [
        { name: "entity", required: true, selector: { entity: {} } },
        { name: "variant", label: "e_category", required: true, selector: { select: { mode: "dropdown", options: VARIANTS } } },
        { name: "name", label: "e_title", selector: { text: {} } },
        { name: "icon", label: "e_icon_overri_entity", selector: { icon: {} } },
        { name: "label", label: "e_subtitle", selector: { text: {} } },
        { name: "active_state", label: "e_active_state_binary", helper: "e_option_state_value", template: true, selector: { text: {} } },
      ],
    };

    const extras = { title: "e_options", icon: "mdi:tune", fields: [] };
    if (v === "temperature") {
      extras.fields.push(
        { name: "min", label: "e_scale_min_defaul", selector: { number: { mode: "box" } } },
        { name: "max", label: "e_scale_max_defaul", selector: { number: { mode: "box" } } },
      );
    }
    if (v === "power") {
      extras.fields.push(
        { name: "max", label: "e_full_load_watts", selector: { number: { mode: "box" } } },
        { name: "bars", label: "e_number_bars_defaul", selector: { number: { min: 2, max: 40, mode: "box" } } },
      );
    }
    if (SCALED.includes(v)) {
      extras.fields.push(
        {
          name: "min",
          label: "e_scale_min_defaul2",
          selector: { number: { mode: "box", step: "any" } },
        },
        {
          name: "max",
          label: "e_scale_max_defaul2",
          helper: "e_withou_max_gauge",
          selector: { number: { mode: "box", step: "any" } },
        },
        {
          name: "caption",
          label: "e_captio_under_gauge",
          helper:
            "e_your_senten_in",
          template: true,
          selector: { text: {} },
        },
        {
          name: "precision",
          label: "e_decima_places_defaul",
          selector: { number: { min: 0, max: 6, mode: "box" } },
        },
      );
    }
    if (v === "ladder") {
      extras.fields.push({ name: "bars", label: "e_number_bars_defaul", selector: { number: { min: 2, max: 40, mode: "box" } } });
    }
    // The bar variant needs no caption field of its own: the Content
    // section's Subtitle IS the caption override, and repeating that same
    // name in a second section would put it in the schema twice.
    if (v === "scale") {
      extras.fields.push(
        {
          name: "good",
          label: "e_which_end_good",
          helper:
            "e_left_empty_ramp",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "low", label: "e_low_values_are" },
                { value: "high", label: "e_high_values_are" },
              ],
            },
          },
        },
        {
          name: "min_label",
          label: "e_label_at_low",
          helper: "e_your_words_placeh",
          template: true,
          selector: { text: {} },
        },
        {
          name: "max_label",
          label: "e_label_at_high",
          helper: "e_same_placeh_empty",
          template: true,
          selector: { text: {} },
        },
        {
          name: "show_delta",
          label: "e_show_change_pill",
          helper: "e_fetche_histor_only",
          selector: { boolean: {} },
        },
      );
    }
    if (v === "plain") {
      extras.fields.push({ name: "battery_entity", label: "e_paired_batter_sensor", selector: { entity: { domain: "sensor" } } });
    }
    if (v === "detail") {
      extras.fields.push(
        { name: "days", label: "e_histor_bars_days", selector: { number: { min: 1, max: 90, mode: "box" } } },
        {
          name: "aggregate",
          label: "e_what_each_histor",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "delta", label: "e_change_across_day" },
                { value: "mean", label: "e_average" },
                { value: "min", label: "e_minimum" },
                { value: "max", label: "e_maximum" },
                { value: "sum", label: "e_sum_sample" },
                { value: "count", label: "e_number_sample" },
              ],
            },
          },
        },
        { name: "metric_1_entity", label: "e_suppor_metric_1", selector: { entity: {} } },
        { name: "metric_1_label", label: "e_metric_1_label", template: true, selector: { text: {} } },
        { name: "metric_1_value", label: "e_metric_1_displa", helper: "e_option_jinja_text", template: true, selector: { text: {} } },
        { name: "metric_1_tap_action", label: "e_metric_1_tap", selector: { ui_action: { default_action: "more-info" } } },
        { name: "metric_2_entity", label: "e_suppor_metric_2", selector: { entity: {} } },
        { name: "metric_2_label", label: "e_metric_2_label", template: true, selector: { text: {} } },
        { name: "metric_2_value", label: "e_metric_2_displa", template: true, selector: { text: {} } },
        { name: "metric_2_tap_action", label: "e_metric_2_tap", selector: { ui_action: { default_action: "more-info" } } },
        { name: "metric_3_entity", label: "e_suppor_metric_3", selector: { entity: {} } },
        { name: "metric_3_label", label: "e_metric_3_label", template: true, selector: { text: {} } },
        { name: "metric_3_value", label: "e_metric_3_displa", template: true, selector: { text: {} } },
        { name: "metric_3_tap_action", label: "e_metric_3_tap", selector: { ui_action: { default_action: "more-info" } } },
        { name: "history_refresh", label: "e_refres_histor_every", selector: { number: { min: 1, max: 180, mode: "box" } } },
      );
    }
    if (v === "progress_summary") {
      extras.fields.push(
        {
          name: "headline",
          label: "e_headline",
          helper: "e_opt_jinja_headline",
          template: true,
          selector: { text: {} },
        },
        {
          name: "footer",
          label: "e_footer",
          helper: "e_opt_jinja_footer",
          template: true,
          selector: { text: {} },
        },
        { name: "footer_icon", label: "e_footer_icon", selector: { icon: {} } },
      );
    }
    if (v === "vacuum") {
      extras.fields.push(
        { name: "status_entity", label: "e_detail_status_sensor", selector: { entity: { domain: "sensor" } } },
        { name: "room_entity", label: "e_curren_room_sensor", selector: { entity: { domain: "sensor" } } },
        { name: "battery_entity", label: "e_batter_sensor_adds", selector: { entity: { domain: "sensor" } } },
      );
    }
    // Only meaningful for device_class: moisture (soil sensors) — harmless
    // no-ops for battery/humidity/other percent entities.
    if (v === "percent") {
      extras.fields.push(
        { name: "critical_dry", label: "e_critic_dry_defaul", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_below", label: "e_water_soon_defaul", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "soggy_above", label: "e_overwa_defaul_60", selector: { number: { min: 0, max: 100, mode: "box" } } },
        { name: "dry_label", label: "e_needs_water_now", selector: { text: {} } },
        { name: "soon_label", label: "e_water_soon_label", selector: { text: {} } },
        { name: "optimal_label", label: "e_optima_label", selector: { text: {} } },
        { name: "wet_label", label: "e_overwa_label", selector: { text: {} } },
      );
    }

    if (HISTORIC.includes(v)) {
      if (BUCKETED.includes(v)) {
        extras.fields.push(
          {
            name: "days",
            label: "e_days_histor_defaul",
            helper:
              "e_kept_short_on",
            selector: { number: { min: 1, max: 90, mode: "box" } },
          },
          {
            name: "aggregate",
            label: "e_what_each_bar",
            helper: "e_change_how_much",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "delta", label: "e_change_across_day" },
                  { value: "mean", label: "e_average" },
                  { value: "min", label: "e_minimum" },
                  { value: "max", label: "e_maximum" },
                  { value: "sum", label: "e_sum_sample" },
                  { value: "count", label: "e_number_sample" },
                ],
              },
            },
          },
          {
            name: "summary_period",
            label: "e_separa_captio_period",
            helper:
              "e_keeps_visibl_bars",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "current_month", label: "e_curren_calend_month" },
                ],
              },
            },
          },
        );
      } else {
        extras.fields.push(
          {
            name: "hours",
            label: "e_hours_histor_defaul",
            helper: "e_window_longer_than",
            selector: { number: { min: 1, max: 2160, mode: "box" } },
          },
          { name: "points", label: "e_points_plotte_defaul", selector: { number: { min: 2, max: 400, mode: "box" } } },
          { name: "show_delta", label: "e_show_change_pill", selector: { boolean: {} } },
          {
            name: "delta_label",
            label: "e_change_pill_text",
            helper: "e_placeh_delta_delta",
            template: true,
            selector: { text: {} },
          },
        );
      }
      extras.fields.push(
        {
          name: "caption",
          label: "e_caption",
          helper: "e_your_words_placeh2",
          template: true,
          selector: { text: {} },
        },
        {
          name: "history_refresh",
          label: "e_refres_every_n",
          helper: "e_histor_polled_on",
          selector: { number: { min: 1, max: 180, mode: "box" } },
        },
      );
    }

    const appearance = {
      title: "e_appearance",
      icon: "mdi:palette-outline",
      fields: [
        { name: "accent", label: "e_accent_color_fill", color: true, selector: { text: {} } },
        { name: "color", label: "e_tile_color", color: true, template: true, selector: { text: {} } },
        { name: "color_on", label: "e_text_color", color: true, template: true, selector: { text: {} } },
        { name: "show_icon", label: "e_show_icon_beside", selector: { boolean: {} } },
      ],
    };

    const actions = {
      title: "e_actions",
      icon: "mdi:gesture-tap",
      fields: [{ name: "tap_action", selector: { ui_action: { default_action: "more-info" } } }],
    };

    return extras.fields.length
      ? [content, extras, appearance, actions]
      : [content, appearance, actions];
  }
}

customElements.define("materia-glance-tile-editor", MateriaGlanceTileEditor);
