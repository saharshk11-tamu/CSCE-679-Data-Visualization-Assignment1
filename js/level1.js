// Level 1: year/month heatmap of all years.
import { getData, processData } from "./data.js";
import { getScales } from "./scales.js";
import { createSVG } from "./heatmap.js";
import { render } from "./render.js";

// main function
async function main() {
  const rawData = await getData();
  const data = processData(rawData);
  const scales = getScales(data);
  const { svg, chart } = createSVG();

  render(data, scales, svg, chart, 2);
}

main();
