import { dataPath } from "./config.js";

// Load and Process Data
export async function getData() {
  const parseDate = d3.timeParse("%Y-%m-%d");
  return d3.csv(dataPath, (row) => {
    return {
      date: parseDate(row.date), // convert to Date
      max: Number(row.max_temperature), // convert to Number
      min: Number(row.min_temperature), // convert to Number
    };
  });
}

export function processData(rawData) {
  const tuples = d3.flatRollup(
    rawData,
    (group) => {
      return {
        min: d3.min(group, (d) => d.min),
        max: d3.max(group, (d) => d.max),
        days: group, // for level 2
      };
    },
    (d) => d.date.getFullYear(),
    (d) => d.date.getMonth(),
  );

  return tuples.map(([year, month, { min, max, days }]) => ({
    year,
    month,
    min,
    max,
    days, // for level 2
  }));
}

// filter only recent years for level 2
export function filterRecentYears(data, numYears) {
  const latestYear = d3.max(data, (d) => d.year);
  const firstYear = latestYear - numYears + 1;
  return data.filter((d) => d.year >= firstYear);
}
