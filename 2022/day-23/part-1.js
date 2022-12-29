const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let elves = rawInput
  .split('\n')
  .filter((l) => !!l)
  .flatMap((row, rowIndex) =>
    row
      .split('')
      .map((col, colIndex) => ({ col, colIndex }))
      .filter(({ col }) => col === '#')
      .map(({ colIndex }) => [colIndex, rowIndex]),
  );

const adjacentPositons = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const checkDirections = [
  {
    checks: [
      [-1, -1],
      [0, -1],
      [1, -1],
    ],
    move: [0, -1],
  },
  {
    checks: [
      [-1, 1],
      [0, 1],
      [1, 1],
    ],
    move: [0, 1],
  },
  {
    checks: [
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ],
    move: [-1, 0],
  },
  {
    checks: [
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    move: [1, 0],
  },
];

let elvesHash = {};
const calcHash = () => {
  elvesHash = {};
  elves.forEach(([x, y]) => {
    if (!elvesHash[x]) {
      elvesHash[x] = [];
    }
    elvesHash[x].push(y);
  });
};

const isPositionEmpty = (x, y) => {
  return !elvesHash[x]?.includes(y);
};

const ROUNDS = 10;
for (let round = 1; round <= ROUNDS; round += 1) {
  calcHash();

  const proposals = elves.map((elf) => {
    const empty8 = adjacentPositons.every((p) =>
      isPositionEmpty(elf[0] + p[0], elf[1] + p[1]),
    );

    if (empty8) {
      return elf;
    }

    const direction = checkDirections.find((checkDirection) =>
      checkDirection.checks.every((p) =>
        isPositionEmpty(elf[0] + p[0], elf[1] + p[1]),
      ),
    );

    if (!direction) {
      return elf;
    }

    return [elf[0] + direction.move[0], elf[1] + direction.move[1]];
  });

  Object.entries(_.countBy(proposals))
    .filter(([key, value]) => value > 1)
    .forEach(([key]) => {
      const [x, y] = key.split(',').map(Number);
      proposals.forEach(([px, py], index) => {
        if (px === x && py === y) {
          proposals[index] = elves[index];
        }
      });
    });

  elves = proposals;

  checkDirections.push(checkDirections.shift());
}

const xs = elves.map(([x]) => x);
const ys = elves.map(([, y]) => y);
const minX = _.min(xs);
const maxX = _.max(xs);
const minY = _.min(ys);
const maxY = _.max(ys);

const emptySpaces =
  (Math.abs(maxX - minX) + 1) * (Math.abs(maxY - minY) + 1) - elves.length;

console.log(emptySpaces);
