const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const gusts = rawInput
  .split('\n')
  .filter((row) => !!row)
  .flatMap((row) => row.split(''))
  .map((d) => (d === '<' ? -1 : 1));

const getGust = () => {
  const gust = gusts.shift();
  gusts.push(gust);
  return gust;
};

const getRock = (rockIndex, highestRock) => {
  switch (rockIndex % 5) {
    case 0:
      return [
        { x: 2, y: highestRock + 3 },
        { x: 3, y: highestRock + 3 },
        { x: 4, y: highestRock + 3 },
        { x: 5, y: highestRock + 3 },
      ];
    case 1:
      return [
        { x: 3, y: highestRock + 3 },
        { x: 2, y: highestRock + 4 },
        { x: 3, y: highestRock + 4 },
        { x: 4, y: highestRock + 4 },
        { x: 3, y: highestRock + 5 },
      ];
    case 2:
      return [
        { x: 2, y: highestRock + 3 },
        { x: 3, y: highestRock + 3 },
        { x: 4, y: highestRock + 3 },
        { x: 4, y: highestRock + 4 },
        { x: 4, y: highestRock + 5 },
      ];
    case 3:
      return [
        { x: 2, y: highestRock + 3 },
        { x: 2, y: highestRock + 4 },
        { x: 2, y: highestRock + 5 },
        { x: 2, y: highestRock + 6 },
      ];
    case 4:
      return [
        { x: 2, y: highestRock + 3 },
        { x: 3, y: highestRock + 3 },
        { x: 2, y: highestRock + 4 },
        { x: 3, y: highestRock + 4 },
      ];
  }
};

let tower = {};

const blowRock = (rock, gust) => {
  const newRock = rock.map((part) => ({ x: part.x + gust, y: part.y }));

  if (newRock.some((part) => part.x < 0 || part.x > 6)) {
    return rock;
  }

  if (
    newRock.some((part) => !!tower[part.y] && tower[part.y].includes(part.x))
  ) {
    return rock;
  }

  return newRock;
};

const dropRock = (rock) => {
  const newRock = rock.map((part) => ({ x: part.x, y: part.y - 1 }));

  if (newRock.some((part) => part.y < 0)) {
    return null;
  }

  if (
    newRock.some((part) => !!tower[part.y] && tower[part.y].includes(part.x))
  ) {
    return null;
  }

  return newRock;
};

const addRockToTower = (rock) => {
  rock.forEach((part) => {
    if (!tower[part.y]) {
      tower[part.y] = [];
    }
    tower[part.y].push(part.x);
  });
};

let highestRock = 0;
const ROCKS = 2022;
for (let rockIndex = 0; rockIndex < ROCKS; rockIndex += 1) {
  let rock = getRock(rockIndex, highestRock);

  while (true) {
    const gust = getGust();
    rock = blowRock(rock, gust);

    const newRock = dropRock(rock);

    if (!newRock) {
      break;
    }

    rock = newRock;
  }

  addRockToTower(rock);

  highestRock = Math.max(
    ...Object.keys(tower).map((level) => Number(level) + 1),
  );
}

console.log(highestRock);
