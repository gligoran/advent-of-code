const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const reindeer = rawInput
  .split('\n')
  .filter((r) => !!r)
  .map((rawReindeer) => {
    const parts = rawReindeer.split(' ');

    const name = parts[0];
    const stints = [
      { speed: Number(parts[3]), time: Number(parts[6]) },
      { speed: 0, time: Number(parts[13]) },
    ];

    return { name, stints };
  });

const TRAVEL_TIME = 2503;

const distances = reindeer.map((r) => {
  let time = TRAVEL_TIME;
  let stint = 0;
  let distance = 0;
  while (time > 0) {
    if (r.stints[stint].time < time) {
      distance += r.stints[stint].speed * r.stints[stint].time;
      time -= r.stints[stint].time;
    } else {
      distance += r.stints[stint].speed * time;
      time -= time;
    }

    stint = (stint + 1) % r.stints.length;
  }

  return distance;
});

const maxDistance = Math.max(...distances);

console.log(maxDistance);
