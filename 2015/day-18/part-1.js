const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const lights = rawInput
  .split('\n')
  .filter((l) => !!l)
  .map((row) => row.split('').map((light) => light === '#'));

const getLight = (state, x, y) => {
  if (y < 0 || x < 0 || y > state.length - 1 || x > state[y].length - 1) {
    return false;
  }

  return state[y][x];
};

const neighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

for (let i = 0; i < 100; i += 1) {
  const currentLights = _.cloneDeep(lights);

  for (let y = 0; y < lights.length; y += 1) {
    for (let x = 0; x < lights[y].length; x += 1) {
      const neighboursOn = neighbours
        .map(([nx, ny]) => getLight(currentLights, x + nx, y + ny))
        .filter((light) => light).length;

      if (currentLights[y][x]) {
        lights[y][x] = neighboursOn === 2 || neighboursOn === 3;
      } else {
        lights[y][x] = neighboursOn === 3;
      }
    }
  }
}

const lightsOn = lights.flatMap((row) => row).filter((light) => light).length;

console.log(lightsOn);
