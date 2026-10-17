// Shared configuration: tweak layout and data settings here.

export const dataPath = "data/temperature_daily.csv";
export const containerSelector = "#chart";

export const width = 1400;
export const height = 900;
export const margin = { top: 60, right: 100, bottom: 20, left: 80 };
export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;
export const legendWidth = 20;
export const legendHeight = chartHeight / 2;

// Level 2: number of most recent years to show
export const recentYears = 10;
export const miniChartPadding = 4;
