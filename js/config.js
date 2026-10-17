// Shared configuration: tweak layout and data settings here.

export const dataPath = "temperature_daily.csv";
export const containerSelector = "#chart";

export const width = 900;
export const height = 600;
export const margin = { top: 60, right: 100, bottom: 20, left: 80 };
export const chartWidth = width - margin.left - margin.right;
export const chartHeight = height - margin.top - margin.bottom;
