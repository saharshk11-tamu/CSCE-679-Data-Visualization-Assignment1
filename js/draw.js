import {
  containerSelector,
  width,
  height,
  margin,
  legendWidth,
  legendHeight,
} from "./config.js";

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
export function drawCells(chart, data, scales) {
  const cells = chart
    .selectAll(".cell")
    .data(data)
    .join("rect")
    .attr("class", "cell")
    .attr("x", (d) => scales.yearScale(d.year))
    .attr("width", scales.yearScale.bandwidth())
    .attr("y", (d) => scales.monthScale(d.month))
    .attr("height", scales.monthScale.bandwidth());

  return cells;
}

// Recolor existing cells for the current mode ("max" or "min").
export function updateColors(cells, colorScale, mode) {
  cells
    .transition()
    .duration(500)
    .attr("fill", (d) => colorScale(d[mode]));
}

// Draw the year axis (top) and month axis (left).
export function drawAxes(chart, scales) {
  const xAxis = d3.axisTop(scales.yearScale);
  chart.append("g").call(xAxis);

  const timeFormat = d3.timeFormat("%B");
  const yAxis = d3
    .axisLeft(scales.monthScale)
    .tickFormat((d) => timeFormat(new Date(2000, d, 1)));
  chart.append("g").call(yAxis);
}

// Draw the chart title.
// Returns: the title selection, so the toggle button can be placed beside it.
export function drawTitle(svg) {
  return svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Monthly Temperature in Hong Kong");
}

// Draw the color legend mapping colors to temperatures.
export function drawLegend(svg, colorScale) {
  const [minTemp, maxTemp] = colorScale.domain();
  const legend = svg
    .append("g")
    .attr(
      "transform",
      `translate(${width - margin.right + margin.right / 2}, ${margin.top})`,
    );

  // One swatch per quantized color, stacked cold (top) to hot (bottom)
  const colors = colorScale.range();
  const swatchHeight = legendHeight / colors.length;

  legend
    .selectAll(".legend-swatch")
    .data(colors)
    .join("rect")
    .attr("class", "legend-swatch")
    .attr("x", 0)
    .attr("y", (d, i) => i * swatchHeight)
    .attr("width", legendWidth)
    .attr("height", swatchHeight - 1) // 1px gap between swatches
    .attr("fill", (d) => d);

  // End labels, centered above and below the swatch column
  legend
    .append("text")
    .attr("class", "legend-label")
    .attr("x", legendWidth / 2)
    .attr("y", -8)
    .attr("text-anchor", "middle")
    .text(`${minTemp} Celsius`);

  legend
    .append("text")
    .attr("class", "legend-label")
    .attr("x", legendWidth / 2)
    .attr("y", legendHeight + 4)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "hanging") // y marks the top of the text
    .text(`${maxTemp} Celsius`);
}

// Show date and temperatures when hovering over a cell.
export function setupTooltip(cells) {
  const tooltip = d3.select("body").append("div").attr("class", "tooltip");

  cells
    .on("mouseover", (event, d) => {
      tooltip.style("opacity", 1);
      // month is 0-based; +1 and zero-pad so March shows as "03"
      const month = String(d.month + 1).padStart(2, "0");
      tooltip.text(`Date: ${d.year}-${month}; max: ${d.max} min: ${d.min}`);
    })
    .on("mousemove", (event) => {
      tooltip.style("left", event.pageX + 10 + "px");
      tooltip.style("top", event.pageY + 10 + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });
}

// Wire up the max/min toggle, placed just right of the title.
export function setupToggle(title, onToggle) {
  const titleBox = title.node().getBBox();

  const button = d3
    .select(containerSelector)
    .append("button")
    .attr("class", "toggle-button mode-max")
    .style("left", `${titleBox.x + titleBox.width + 16}px`)
    .style("top", `${titleBox.y + titleBox.height / 2}px`)
    .text("Switch to min");

  button.on("click", () => {
    const newMode = onToggle();
    button
      .text(`Switch to ${newMode === "max" ? "min" : "max"}`)
      .classed("mode-max", newMode === "max")
      .classed("mode-min", newMode === "min");
  });
}
