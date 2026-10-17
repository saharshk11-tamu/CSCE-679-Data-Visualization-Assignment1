// Level 2: heatmap of recent years with daily mini line charts.
import { getData, processData, filterRecentYears } from "./data.js";
import { recentYears } from "./config.js";
import { getScales } from "./scales.js";
import { createSVG } from "./heatmap.js";
import { render } from "./render.js";
import { drawMiniCharts } from "./minicharts.js";

// main function
async function main() {
  const rawData = await getData();
  const data = processData(rawData);
  const recent = filterRecentYears(data, recentYears);
  const scales = getScales(recent);
  const { svg, chart } = createSVG();

  render(recent, scales, svg, chart, 1);
  // After render so lines paint on top of the cells
  drawMiniCharts(chart, recent, scales);
}

main();
