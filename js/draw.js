import { containerSelector, width, height, margin } from "./config.js";

// Create SVG
export function createSVG() {
  const svg = d3
    .select(containerSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  return { svg, chart };
}

// Draw one rect per month (the heatmap cells).
// TODO:
//   - data join: chart.selectAll(...).data(data).join("rect")
//   - x / y from yearScale(d.year) / monthScale(d.month)
//   - width / height from each scale's bandwidth()
//   - do NOT set fill here; updateColors handles that
// Returns: the cells selection, so other functions can recolor / attach events.
export function drawCells(chart, data, scales) {}

// Recolor existing cells for the current mode ("max" or "min").
// TODO:
//   - set each cell's fill using colorScale and the value for `mode`
//     (hint: the mode string matches the data field name)
export function updateColors(cells, colorScale, mode) {}

// Draw the year axis (top) and month axis (left).
// TODO:
//   - year axis: d3.axisTop(yearScale), appended in a <g> at y = 0
//   - month axis: d3.axisLeft(monthScale), with tickFormat turning 0-11
//     into month names
//   - remember: .call(axis) on a <g> is how an axis gets drawn
export function drawAxes(chart, scales) {}

// Draw the chart title.
// TODO:
//   - append a <text> above the plot area (inside margin.top)
//   - decide: append to svg (full-svg coords) or chart (inner coords)
export function drawTitle(svg) {}

// Draw the color legend mapping colors to temperatures.
// TODO:
//   - place it in the right margin (or wherever you leave room)
//   - show a color gradient or color steps plus temperature labels
//   - hint: a small scale + axis next to the colors works well for labels
export function drawLegend(svg, colorScale) {}

// Show date and temperatures when hovering over a cell.
// TODO:
//   - create a tooltip element once (an HTML <div> is easiest)
//   - on cells: mouseover/mousemove -> fill text + position it,
//     mouseout -> hide it
//   - format to match the reference: "Date: 2002-03; max: 28 min: 14"
export function setupTooltip(cells) {}

// Wire up the max/min toggle.
// TODO:
//   - decide the trigger: a <button> (in index.html or created with d3),
//     or clicking the chart itself
//   - on click, call onToggle() and update any button label
export function setupToggle(onToggle) {}
