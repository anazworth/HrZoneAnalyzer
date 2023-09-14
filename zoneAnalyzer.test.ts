import { expect, test, describe, mock } from "bun:test";
import { hrZoneDataType } from "./types";
import { addLapData, getAverageTimeInZone, getHrZone, printTimeInZones } from "./zoneAnalyzer";

describe("getHrZone", () => {
  // Setup
  const MAX_HR = 193;

  test("should return 1 for 59bpm", () => {
    // Test
    expect(getHrZone(59, MAX_HR))
      // Assert
      .toBe(1);
  });

  test("should return 2 for 120bpm", () => {
    expect(getHrZone(120, MAX_HR)).toBe(2);
  });

  test("should return 5 for 193bpm (at max HR)", () => {
    expect(getHrZone(193, MAX_HR)).toBe(5);
  });

  test("should return 5 for 194bpm (over max HR)", () => {
    expect(getHrZone(194, MAX_HR)).toBe(5);
  });
});

describe("getAverageTimeInZone", () => {
  test("should return 100% Zone 1", () => {
    // Setup
    const hrZoneData: hrZoneDataType = {
      1: {
        time: 1,
        distance: 1,
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
      totalTime: 1,
      totalDistance: 1,
    };

    // Test
    expect(getAverageTimeInZone(1, hrZoneData))
      // Assert
      .toBe(1);
  });

  test("should return 50% Zone 1, 50% Zone 5", () => {
    // Setup
    const hrZoneData: hrZoneDataType = {
      1: {
        time: 10,
        distance: 10,
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
        time: 10,
        distance: 10,
      },
      totalTime: 20,
      totalDistance: 20,
    };

    // Test                                     // Assert
    expect(getAverageTimeInZone(1, hrZoneData)).toBe(0.5);
    expect(getAverageTimeInZone(5, hrZoneData)).toBe(0.5);
  });
});

// Mock
const hrZoneDataMock = mock(() => ({
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
}));

describe("addLapData", () => {
  test("should add 1 minute to Zone 2", () => {
    const hrZoneData = hrZoneDataMock();
    const time = 60;
    const distance = 1;
    const bpm = 130;
    const MAX_HR = 193;

    // Test
    addLapData(bpm, time, distance, hrZoneData, MAX_HR);

    // Assert
    expect(hrZoneData[2].time).toBe(60);
  });
});

describe("printTimeInZones", () => {
  test.todo("should print time in zones", () => {
  });
});

