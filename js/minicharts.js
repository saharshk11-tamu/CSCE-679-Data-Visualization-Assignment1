// Level 2: mini line charts of daily max/min temperatures inside each cell.
import { miniChartPadding } from "./config.js";

// Draw one mini chart per month, on top of the heatmap cells.
export function drawMiniCharts(chart, data, scales) {
  const cellWidth = scales.yearScale.bandwidth();
  const cellHeight = scales.monthScale.bandwidth();
  const allDays = data.flatMap((d) => d.days);

  const dayScale = d3
    .scaleLinear()
    .domain([1, 31])
    .range([miniChartPadding, cellWidth - miniChartPadding]);
  const tempScale = d3
    .scaleLinear()
    .domain([
      d3.min(allDays, (day) => day.min),
      d3.max(allDays, (day) => day.max),
    ])
    .range([cellHeight - miniChartPadding, miniChartPadding]);

  const maxLine = d3
    .line()
    .x((day) => dayScale(day.date.getDate()))
    .y((day) => tempScale(day.max));
  const minLine = d3
    .line()
    .x((day) => dayScale(day.date.getDate()))
    .y((day) => tempScale(day.min));

  const groups = chart
    .selectAll(".mini-chart")
    .data(data)
    .join("g")
    .attr("class", "mini-chart")
    .attr(
      "transform",
      (d) =>
        `translate(${scales.yearScale(d.year)}, ${scales.monthScale(d.month)})`,
    );

  groups
    .append("path")
    .attr("class", "max-line")
    .attr("d", (d) => maxLine(d.days));
  groups
    .append("path")
    .attr("class", "min-line")
    .attr("d", (d) => minLine(d.days));
}
