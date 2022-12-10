const fs = require('fs');
const distance = require('euclidean-distance');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const H = [0, 0];
const T = [0, 0];

const moveMap = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const moves = rawInput
  .split('\n')
  .filter((m) => !!m)
  .map((move) => move.split(' '))
  .map(([d, t]) => [d, Number(t)])
  .flatMap(([d, t]) => new Array(t).fill(d))
  .map((d) => moveMap[d]);

const visited = new Set();
moves.forEach((move) => {
  H[0] += move[0];
  H[1] += move[1];

  if (distance(H, T) >= 2) {
    if (H[0] === T[0]) {
      T[1] += H[1] > T[1] ? 1 : -1;
    } else if (H[1] === T[1]) {
      T[0] += H[0] > T[0] ? 1 : -1;
    } else {
      T[0] += H[0] > T[0] ? 1 : -1;
      T[1] += H[1] > T[1] ? 1 : -1;
    }
  }

  visited.add(`${T[0]},${T[1]}`);
});

console.log(visited.size);
