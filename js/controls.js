import { containerSelector } from "./config.js";

// Create the button row, placed just right of the title.
// Returns: the row selection, so buttons can be added to it.
export function createControls(title) {
  const titleBox = title.node().getBBox();

  return d3
    .select(containerSelector)
    .append("div")
    .attr("class", "controls")
    .style("left", `${titleBox.x + titleBox.width + 16}px`)
    .style("top", `${titleBox.y + titleBox.height / 2}px`);
}

// Wire up the max/min toggle.
export function setupToggle(controls, onToggle) {
  const button = controls
    .append("button")
    .attr("class", "toggle-button mode-max")
    .text("Switch to min");

  button.on("click", () => {
    const newMode = onToggle();
    button
      .text(`Switch to ${newMode === "max" ? "min" : "max"}`)
      .classed("mode-max", newMode === "max")
      .classed("mode-min", newMode === "min");
  });
}

// Button that navigates to the other level's page.
export function setupLevelLink(controls, targetLevel) {
  controls
    .append("button")
    .attr("class", "level-button")
    .text(`Go to Level ${targetLevel}`)
    .on("click", () => {
      window.location.href = `level${targetLevel}.html`;
    });
}
