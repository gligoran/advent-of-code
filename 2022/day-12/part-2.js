const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let E;

function GridPoint(elevation, x, y, steps) {
  this.x = x;
  this.y = y;
  this.elevation = elevation;
  this.steps = steps;
}

const grid = rawInput
  .split('\n')
  .filter((l) => !!l)
  .map((line, lineIndex) =>
    line.split('').map((char, charIndex) => {
      if (char === 'S') {
        return 0;
      }

      if (char === 'E') {
        E = { x: charIndex, y: lineIndex };
        return 'z'.charCodeAt(0) - 'a'.charCodeAt(0);
      }

      return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }),
  );

const rows = grid.length;
const cols = grid[0].length;

const search = () => {
  let openPositions = grid
    .flatMap((row, y) =>
      row.map((e, x) => (e === 0 ? new GridPoint(e, x, y, 0) : null)),
    )
    .filter((p) => !!p);

  const closedPositions = [];

  while (openPositions.length > 0) {
    openPositions.sort((a, b) => a.steps - b.steps);

    const currentPosition = openPositions.shift();
    closedPositions.push(currentPosition);

    if (currentPosition.x === E.x && currentPosition.y === E.y) {
      return currentPosition.steps;
    }

    let neighbors = [];
    if (currentPosition.y < rows - 1) {
      neighbors.push(
        new GridPoint(
          grid[currentPosition.y + 1][currentPosition.x],
          currentPosition.x,
          currentPosition.y + 1,
          currentPosition.steps + 1,
        ),
      );
    }

    if (currentPosition.y > 0) {
      neighbors.push(
        new GridPoint(
          grid[currentPosition.y - 1][currentPosition.x],
          currentPosition.x,
          currentPosition.y - 1,
          currentPosition.steps + 1,
        ),
      );
    }

    if (currentPosition.x < cols - 1) {
      neighbors.push(
        new GridPoint(
          grid[currentPosition.y][currentPosition.x + 1],
          currentPosition.x + 1,
          currentPosition.y,
          currentPosition.steps + 1,
        ),
      );
    }

    if (currentPosition.x > 0) {
      neighbors.push(
        new GridPoint(
          grid[currentPosition.y][currentPosition.x - 1],
          currentPosition.x - 1,
          currentPosition.y,
          currentPosition.steps + 1,
        ),
      );
    }

    neighbors = neighbors.filter(
      (n) =>
        n.elevation <= currentPosition.elevation + 1 &&
        closedPositions.findIndex((p) => p.x === n.x && p.y === n.y) < 0,
    );

    openPositions.push(...neighbors);
    openPositions = openPositions.filter(
      (op1) =>
        closedPositions.findIndex((op2) => op1.x === op2.x && op1.y === op2.y) <
        0,
    );
  }
};

const steps = search();
console.log(steps);
