import { chartWidth, chartHeight } from "./config.js";

// Get scales
export function getScales(data) {
  const yearExtent = d3.extent(data, (d) => d.year);
  const yearScale = d3
    .scaleBand()
    .domain(d3.range(yearExtent[0], yearExtent[1] + 1))
    .range([0, chartWidth])
    .padding(0.2);
  const monthScale = d3
    .scaleBand()
    .domain(d3.range(0, 12))
    .range([0, chartHeight])
    .padding(0.2);
  const colorScale = d3
    .scaleQuantize()
    .domain([0, 40])
    .range(d3.schemeSpectral[11].slice(0, 11).reverse());

  return { yearScale, monthScale, colorScale };
}
