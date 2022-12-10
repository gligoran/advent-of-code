const fs = require('fs');
const distance = require('euclidean-distance');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const rope = new Array(10).fill(0).map(() => new Array(2).fill(0));

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

const moveKnot = (H, T) => {
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

  return T;
};

const visited = new Set();
moves.forEach((move) => {
  rope[0][0] += move[0];
  rope[0][1] += move[1];

  for (let i = 1; i < rope.length; i += 1) {
    rope[i] = moveKnot([...rope[i - 1]], [...rope[i]]);
  }

  visited.add(`${rope[rope.length - 1][0]},${rope[rope.length - 1][1]}`);
});

console.log(visited.size);
