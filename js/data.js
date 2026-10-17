import { dataPath } from "./config.js";

// Load and Process Data
export async function getData() {
  const parseDate = d3.timeParse("%Y-%m-%d");
  return d3.csv(dataPath, (row) => {
    return {
      date: parseDate(row.date),
      max: Number(row.max_temperature),
      min: Number(row.min_temperature),
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
      };
    },
    (d) => d.date.getFullYear(),
    (d) => d.date.getMonth(),
  );

  return tuples.map(([year, month, { min, max }]) => ({
    year,
    month,
    min,
    max,
  }));
}
