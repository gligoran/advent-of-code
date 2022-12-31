const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const cols = rawInput.split('\n')[0].length - 2;
const rows = rawInput.split('\n').filter((l) => !!l).length;

let lcm = Math.max(cols, rows - 2);
while (lcm % Math.min(cols, rows - 2)) {
  lcm += Math.max(cols, rows - 2);
}

let blizzardMaps = new Array(lcm + 1).fill(null);

blizzardMaps[0] = rawInput
  .split('\n')
  .filter((l) => !!l)
  .flatMap((row, y) =>
    row.split('').map((col, x) => {
      if (col === '>') {
        return { x: x - 1, y, y, direction: [1, 0] };
      }

      if (col === '<') {
        return { x: x - 1, y, direction: [-1, 0] };
      }

      if (col === '^') {
        return { x: x - 1, y, direction: [0, -1] };
      }

      if (col === 'v') {
        return { x: x - 1, y, direction: [0, 1] };
      }

      return null;
    }),
  )
  .filter((b) => !!b);

for (let m = 1; m <= lcm; m += 1) {
  const latestBlizzardMap = blizzardMaps[m - 1];

  blizzardMaps[m] = latestBlizzardMap.map((b) => {
    const newB = {
      x: b.x + b.direction[0],
      y: b.y + b.direction[1],
      direction: [...b.direction],
    };

    if (newB.x > cols - 1) {
      newB.x = 0;
    } else if (newB.x < 0) {
      newB.x = cols - 1;
    } else if (newB.y > rows - 2) {
      newB.y = 1;
    } else if (newB.y < 1) {
      newB.y = rows - 2;
    }

    return newB;
  });
}

blizzardMaps = blizzardMaps.map((bm) => {
  const newMap = {};

  for (let y = 0; y < rows; y += 1) {
    newMap[y] = bm.filter((w) => w.y === y).map((w) => w.x);
  }

  return newMap;
});

const adjacentPositons = [
  [0, -1],
  [-1, 0],
  [0, 0],
  [0, 1],
  [1, 0],
];

const navigate = () => {
  let openPositions = [{ x: 0, y: 0, minute: 0 }];
  let visited = new Array(cols)
    .fill(null)
    .map(() =>
      new Array(rows).fill(null).map(() => new Array(lcm).fill(false)),
    );

  while (openPositions.length) {
    const position = openPositions.shift();
    visited[position.x][position.y][position.minute % lcm] = true;

    if (position.x === cols - 1 && position.y === rows - 1) {
      return position.minute;
    }

    const minute = position.minute + 1;

    const potentialMoves = adjacentPositons
      .map(([ax, ay]) => [position.x + ax, position.y + ay])
      .filter(
        ([px, py]) =>
          (px >= 0 && px < cols && py > 0 && py < rows - 1) ||
          (px === 0 && py === 0) ||
          (px === cols - 1 && py === rows - 1),
      )
      .filter(([px, py]) => !blizzardMaps[minute % lcm][py].includes(px))
      .map(([x, y]) => ({
        x,
        y,
        minute,
      }));

    openPositions.push(...potentialMoves);
    openPositions = openPositions.filter(
      (op) => !visited[op.x][op.y][op.minute % lcm],
    );
  }
};

const trip = navigate();
console.log(trip);
