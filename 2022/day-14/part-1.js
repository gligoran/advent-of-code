const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const paths = rawInput
  .split('\n')
  .filter((p) => !!p)
  .map((path) =>
    path
      .split(' -> ')
      .map((wall) => wall.split(',').map(Number))
      .map(([x, y]) => ({ x, y })),
  );

const corners = paths.flatMap((path) => path);
const minX = _.min(corners.map(({ x }) => x));
const maxX = _.max(corners.map(({ x }) => x));
const maxY = _.max(corners.map(({ x, y }) => y));

const grid = new Array(maxY + 1)
  .fill(null)
  .map(() => new Array(maxX - minX + 1).fill('.'));

const printGrid = () => {
  console.log();
  grid.forEach((row) => console.log(row.join('')));
  console.log();
};

grid[0][500 - minX] = '+';

paths.forEach((path) => {
  for (let i = 1; i < path.length; i += 1) {
    const first = path[i - 1];
    const second = path[i];

    const [startX, endX] = [first.x, second.x].sort();
    const [startY, endY] = [first.y, second.y].sort();

    for (let x = startX; x <= endX; x += 1) {
      for (let y = startY; y <= endY; y += 1) {
        grid[y][x - minX] = '#';
      }
    }
  }
});

const pourSand = (x, y) => {
  if (y + 1 > maxY) {
    return null;
  }

  if (grid[y + 1][x] === '.') {
    return pourSand(x, y + 1);
  }

  if (x - 1 < 0) {
    return null;
  }

  if (grid[y + 1][x - 1] === '.') {
    return pourSand(x - 1, y + 1);
  }

  if (x + 1 > maxX - minX) {
    return null;
  }

  if (grid[y + 1][x + 1] === '.') {
    return pourSand(x + 1, y + 1);
  }

  return { x, y };
};

while (true) {
  const sand = pourSand(500 - minX, 0);
  if (!sand) {
    break;
  }

  grid[sand.y][sand.x] = 'o';
}

const sandUnits = grid
  .flatMap((row) => row)
  .filter((unit) => unit === 'o').length;

console.log(sandUnits);
