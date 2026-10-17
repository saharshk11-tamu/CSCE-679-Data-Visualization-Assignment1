import {
  drawCells,
  updateColors,
  drawAxes,
  drawTitle,
  drawLegend,
  setupTooltip,
} from "./heatmap.js";
import { createControls, setupToggle, setupLevelLink } from "./controls.js";

// Draw every part of the heatmap once, then handle toggling.
// Shared by both levels; linkedLevel is the page the level button goes to.
export function render(data, scales, svg, chart, linkedLevel) {
  // Current temperature shown: "max" or "min" (matches the data field names)
  let mode = "max";

  // Cells first so axes/legend paint on top
  const cells = drawCells(chart, data, scales);
  updateColors(cells, scales.colorScale, mode);

  drawAxes(chart, scales);
  const title = drawTitle(svg);
  drawLegend(svg, scales.colorScale);
  setupTooltip(cells);

  // Toggle only recolors the existing cells, it never redraws
  const controls = createControls(title);
  setupToggle(controls, () => {
    mode = mode === "max" ? "min" : "max";
    updateColors(cells, scales.colorScale, mode);
    return mode;
  });
  setupLevelLink(controls, linkedLevel);
}
