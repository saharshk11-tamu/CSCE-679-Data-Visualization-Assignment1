# Hong Kong Temperature Heatmap

CSCE 679 Data Visualization, Assignment 1: an introduction to D3.js.

Two visualizations of daily Hong Kong temperatures (1997–2017) built with
[D3.js v7](https://d3js.org/). The assignment instructions are in the
[course repository](https://github.com/xiameng552180/CSCE-679-Data-Visualization-Assignment1).

## Level 1: Year/Month Heatmap

A matrix with one column per year and one row per month. Each cell is
colored by that month's temperature.

- **Max/min toggle:** switches the cells between the month's highest daily
  maximum and lowest daily minimum, with an animated color transition.
- **Tooltip:** hover over a cell to see its date and both temperatures.
- **Legend:** a quantized color scale from 0 to 40 °C.

## Level 2: Heatmap with Daily Trends

The same heatmap limited to the 10 most recent years (2008–2017). Each cell
also contains a mini line chart of that month's daily temperatures:

- **Green:** daily maximum
- **Blue:** daily minimum

All mini charts share one temperature scale, so line heights can be compared
across cells. The toggle, tooltip and legend from Level 1 are kept.

A **Go to Level 1 / 2** button next to the toggle switches between the two pages.

## Running Locally

The page loads the CSV with `fetch`, which browsers block for files opened
directly from disk (`file://`). Serve the folder over HTTP instead:

```bash
./launch.sh      # Level 1
./launch.sh 2    # Level 2
```

The script starts a local server on port 8000 and opens the page in your
browser. Press Ctrl+C to stop it. Without the script:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/level1.html> or
<http://localhost:8000/level2.html>.

## Project Structure

```
level1.html            Level 1 page
level2.html            Level 2 page
launch.sh              Starts a local server and opens a level
css/style.css          Title, legend, button, tooltip and line styles
data/
  temperature_daily.csv
js/
  config.js            Layout sizes, margins, data path, Level 2 settings
  data.js              Load CSV, group days into months, filter recent years
  scales.js            Year, month and color scales
  heatmap.js           SVG setup, cells, axes, title, legend, tooltip
  controls.js          Max/min toggle and level link buttons
  render.js            Draws the full heatmap (shared by both levels)
  minicharts.js        Level 2 daily line charts
  level1.js            Level 1 entry point
  level2.js            Level 2 entry point
```

### How the pieces fit together

1. **Load and process once.** `getData` parses each CSV row into a date and
   two numbers. `processData` groups the days by year and month with
   `d3.flatRollup`, keeping each month's max, min and daily rows.
2. **Scales.** Band scales place years and months on the grid, and a
   quantize scale maps temperature to one of 11 colors.
3. **Render.** `render` draws the cells, axes, title, legend, tooltip and
   buttons. The toggle only recolors the existing cells; nothing is redrawn.
4. **Level 2.** `level2.js` filters to the most recent years before building
   the scales, then calls `drawMiniCharts` after `render` so the lines are
   drawn on top of the cells.

To change the layout, number of years or line padding, edit `js/config.js`.
