import * as fs from "fs";
import { hrZoneDataType } from "./types";
import { analyze, printTimeInZones } from "./zoneAnalyzer";

const MAX_HR = 193;

const hrZoneData: hrZoneDataType = {
  1: {
    time: 0,
    distance: 0,
  },
  2: {
    time: 0,
    distance: 0,
  },
  3: {
    time: 0,
    distance: 0,
  },
  4: {
    time: 0,
    distance: 0,
  },
  5: {
    time: 0,
    distance: 0,
  },
  totalTime: 0,
  totalDistance: 0,
};

// For every file in the data folder, read the file and add the data to the hrZoneData object
for (const file of fs.readdirSync("data")) {
  console.log("Importing data from " + file + "...");
  await analyze(file, hrZoneData, MAX_HR)
}

printTimeInZones(hrZoneData);




