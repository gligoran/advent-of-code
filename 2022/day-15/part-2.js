const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });
const maxX = 4_000_000;
const maxY = 4_000_000;

const sensors = rawInput
  .split('\n')
  .filter((l) => !!l)
  .map((line) => line.split(':'))
  .map(([rawSensor, rawBeacon]) => ({
    sensor: rawSensor.split('='),
    beacon: rawBeacon.split('='),
  }))
  .map(({ sensor, beacon }) => ({
    position: {
      x: parseInt(sensor[1]),
      y: parseInt(sensor[2]),
    },
    closestBeacon: {
      x: parseInt(beacon[1]),
      y: parseInt(beacon[2]),
    },
  }))
  .map((sensor) => {
    const distance =
      Math.abs(sensor.position.x - sensor.closestBeacon.x) +
      Math.abs(sensor.position.y - sensor.closestBeacon.y);

    return { ...sensor, distance };
  });

let coveredPositions = new Array(maxY + 1).fill(null).map(() => []);

sensors.forEach((sensor, sensorIndex) => {
  const fromY = Math.max(sensor.position.y - sensor.distance, 0);
  const toY = Math.min(sensor.position.y + sensor.distance, maxY);

  for (let y = fromY; y <= toY; y += 1) {
    const yDiff = sensor.distance - Math.abs(y - sensor.position.y);
    const fromX = Math.max(sensor.position.x - yDiff, 0);
    const toX = Math.min(sensor.position.x + yDiff, maxX);

    coveredPositions[y].push({ fromX, toX });
  }
});

coveredPositions = coveredPositions.map((ranges) =>
  _.sortBy(ranges, ['fromX', 'toX']),
);

let uncoveredX = -1;
let uncoveredY = -1;
for (const [y, ranges] of coveredPositions.entries()) {
  const [first, ...rest] = ranges;

  const bigRange = { ...first };
  for (const range of rest) {
    if (range.fromX > bigRange.toX) {
      uncoveredX = bigRange.toX + 1;
      break;
    }

    bigRange.toX = Math.max(bigRange.toX, range.toX);
  }

  if (uncoveredX > -1) {
    uncoveredY = y;
    break;
  }
}

const tuningFrequency = 4_000_000 * uncoveredX + uncoveredY;

console.log(tuningFrequency);
