import { hrZoneDataType } from "./types";

async function analyze(fileName: string, hrZoneData: hrZoneDataType, MAX_HR: number) {
  const runData = Bun.file(`data/${fileName.toString()}`);

  const data = await runData.text();

  const lapData = data.split(/\r?\n|\r/);

  for (const lap of lapData) {
    // Skip header
    if (lap.includes("Lap") || lap.includes("Summary")) {
      continue;
    }
    const time = lap.split(",")[1].slice(1, -1);
    const hr = lap.split(",")[6].slice(1, -1);
    const distance = lap.split(",")[3].slice(1, -1);

    if (hr) {
      addLapData(parseInt(hr), parseInt(time), parseFloat(distance), hrZoneData, MAX_HR);
    }
  }
}

function addLapData(bpm: number, time: number, distance: number, hrZoneData: hrZoneDataType, MAX_HR: number) {
  const hrZone = getHrZone(bpm, MAX_HR)
  hrZoneData[hrZone].time += time;
  hrZoneData[hrZone].distance += distance;
  hrZoneData.totalTime += time;
  hrZoneData.totalDistance += distance;
}

function getHrZone(bpm: number, MAX_HR: number) {
  const hrZones = {
    1: 0.6,
    2: 0.7,
    3: 0.8,
    4: 0.9,
    5: 1,
  };


  const hrZone = Math.floor((bpm / MAX_HR) * 100);

  if (hrZone < 60) {
    return 1;
  }
  if (hrZone < 70) {
    return 2;
  }
  if (hrZone < 80) {
    return 3;
  }
  if (hrZone < 90) {
    return 4;
  }
  if (hrZone >= 100) {
    return 5;
  }

  return hrZones[hrZone];
}

function getAverageTimeInZone(hrZone: number, hrZoneData: hrZoneDataType) {
  return hrZoneData[hrZone].time / hrZoneData.totalTime;
}

function printTimeInZones(hrZoneData: hrZoneDataType) {
  for (const zone of Object.keys(hrZoneData)) {
    if (zone === "totalTime" || zone === "totalDistance") {
      continue;
    }
    // log the time in zone as a percentage of the total time and only show 2 decimal places
    console.log(`Time in zone ${zone}: ${(getAverageTimeInZone(parseInt(zone), hrZoneData) * 100).toFixed(2)}%`);
  }
}

export { analyze, printTimeInZones, getHrZone, getAverageTimeInZone, addLapData }
