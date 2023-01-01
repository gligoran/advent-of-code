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

    return { name, stints, score: 0 };
  });

const getDistances = (travelTime) =>
  reindeer.map((r, index) => {
    let time = travelTime;
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

    return { index, distance };
  });

const TRAVEL_TIME = 2503;
for (let time = 1; time <= TRAVEL_TIME; time += 1) {
  const distances = getDistances(time);
  const maxDistance = Math.max(...distances.map(({ distance }) => distance));

  distances
    .filter(({ distance }) => distance === maxDistance)
    .forEach(({ index }) => {
      reindeer[index].score += 1;
    });
}

const scores = reindeer.map(({ score }) => score);
const maxScore = Math.max(...scores);

console.log(maxScore);
