const fs = require('fs');
const _ = require('lodash');

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
const rock0Heights = [];

const ROCKS = 1_000_000_000_000;

const isPair = (y1, y2) => {
  for (let offset = 0; offset < Math.abs(y1 - y2); offset += 1) {
    const row1 = tower?.[y1 + offset] || [];
    const row2 = tower?.[y2 + offset] || [];

    if (_.difference(row1, row2).length || _.difference(row2, row1).length) {
      return false;
    }
  }

  return true;
};

const findPair = () => {
  for (let j = rock0Heights.length - 1; j > 0; j -= 1) {
    for (let i = j - 1; i >= 0; i -= 1) {
      const iRock0 = rock0Heights[i];
      const jRock0 = rock0Heights[j];
      if (isPair(iRock0.y, jRock0.y)) {
        return {
          offsetRocks: iRock0.rockIndex,
          offsetHeight: iRock0.y,
          frequencyRocks: jRock0.rockIndex - iRock0.rockIndex,
          frequencyHeight: jRock0.y - iRock0.y,
        };
      }
    }
  }

  return null;
};

let rockIndex = 0;
let pair = null;
while (true) {
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

  if (rockIndex % 5 === 0 && rockIndex > 0) {
    rock0Heights.push({
      rockIndex,
      highestRock,
      y: rock[0].y,
    });

    pair = findPair();
    if (pair) {
      pair.topRocks = (ROCKS - pair.offsetRocks) % pair.frequencyRocks;
    }
  }

  highestRock = _.max(Object.keys(tower).map((level) => Number(level) + 1));

  if (
    pair &&
    rockIndex >= pair.offsetRocks + pair.frequencyRocks * 2 + pair.topRocks
  ) {
    pair.topHeight =
      highestRock - 1 - pair.offsetHeight - pair.frequencyHeight * 2;

    break;
  }

  rockIndex += 1;
}

const towerHeight =
  pair.offsetHeight +
  Math.floor((ROCKS - pair.offsetRocks) / pair.frequencyRocks) *
    pair.frequencyHeight +
  pair.topHeight;
console.log(towerHeight);
