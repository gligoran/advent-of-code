const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const cubes = rawInput
  .split('\n')
  .filter((l) => !!l)
  .map((line) => line.split(',').map(Number))
  .map(([x, y, z]) => ({ x, y, z }));

const isTouching = (cube1, cube2) => {
  return (
    (cube1.x === cube2.x &&
      cube1.y === cube2.y &&
      Math.abs(cube1.z - cube2.z) === 1) ||
    (cube1.x === cube2.x &&
      cube1.z === cube2.z &&
      Math.abs(cube1.y - cube2.y) === 1) ||
    (cube1.y === cube2.y &&
      cube1.z === cube2.z &&
      Math.abs(cube1.x - cube2.x) === 1)
  );
};

let openSides = cubes.length * 6;
for (let i = 0; i < cubes.length - 1; i += 1) {
  for (let j = i; j < cubes.length; j += 1) {
    if (isTouching(cubes[i], cubes[j])) {
      openSides -= 2;
    }
  }
}

console.log(openSides);
