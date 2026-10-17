// Level 2: mini line charts of daily max/min temperatures inside each cell.

// Draw one mini chart per month, on top of the heatmap cells.
// TODO:
//   - one <g> per month, translated to the cell's x/y (like drawCells)
//   - local x scale: day of month (d.date.getDate()) -> [0, cell width]
//   - y scale: temperature -> [cell height, 0], shared across all cells
//   - d3.line() to build a path for the daily max and one for the daily min
//   - give the paths pointer-events: none so the tooltip still works
export function drawMiniCharts(chart, data, scales) {}
