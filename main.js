import { getData, processData } from "./js/data.js";
import { getScales } from "./js/scales.js";
import {
  createSVG,
  drawCells,
  updateColors,
  drawAxes,
  drawTitle,
  drawLegend,
  setupTooltip,
  setupToggle,
} from "./js/draw.js";

// Draw every part of the heatmap once, then handle toggling.
function render(data, scales, svg, chart) {
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
  setupToggle(title, () => {
    mode = mode === "max" ? "min" : "max";
    updateColors(cells, scales.colorScale, mode);
    return mode;
  });
}

// main function
async function main() {
  const rawData = await getData();
  const data = processData(rawData);
  const scales = getScales(data);
  const { svg, chart } = createSVG();

  render(data, scales, svg, chart);
}

main();
