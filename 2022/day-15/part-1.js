const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });
const Y = 2000000;

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

const sensorsInRange = sensors.filter(
  (sensor) =>
    sensor.position.y - sensor.distance < Y &&
    sensor.position.y + sensor.distance > Y,
);

const coveredPositions = new Set(
  sensorsInRange.flatMap((sensor) => {
    return _.range(
      sensor.position.x - (sensor.distance - Math.abs(Y - sensor.position.y)),
      sensor.position.x +
        (sensor.distance - Math.abs(Y - sensor.position.y) + 1),
    );
  }),
);

const beaconsOnY = new Set(
  sensors
    .filter(
      ({ closestBeacon }) =>
        closestBeacon.y === Y && coveredPositions.has(closestBeacon.x),
    )
    .map(({ closestBeacon }) => closestBeacon.x),
);

const positionsWithoutABeacon = coveredPositions.size - beaconsOnY.size;

console.log(positionsWithoutABeacon);
