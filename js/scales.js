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
  const minTempExtent = d3.extent(data, (d) => d.min);
  const maxTempExtent = d3.extent(data, (d) => d.max);
  const tempExtent = [minTempExtent[0], maxTempExtent[1]];
  const colorScale = d3
    .scaleSequential(d3.interpolateYlOrRd)
    .domain(tempExtent);

  return { yearScale, monthScale, colorScale };
}
