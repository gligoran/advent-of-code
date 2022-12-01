const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let distances = rawInput
  .split('\n')
  .filter((d) => !!d)
  .map((line) => {
    const [from, rest] = line.split(' to ');
    const [to, distance] = rest.split(' = ');

    return { from, to, distance: Number(distance) };
  });

let locations = _.uniq(distances.flatMap(({ from, to }) => [from, to]));

function getPermutations(elements) {
  if (elements.length < 2) {
    return [elements];
  }

  return elements.flatMap((el, i) => {
    const restOfElements = [...elements];
    restOfElements.splice(i, 1);

    const permutations = getPermutations(restOfElements);

    return permutations.map((permutation) => [el, ...permutation]);
  });
}

const paths = getPermutations(locations);

const pathLenghts = paths
  .map((path) => {
    let [fromLocation, ...restOfPath] = path;

    return restOfPath.reduce((total, toLocation) => {
      const distance = distances.find(
        ({ from, to }) =>
          (from === fromLocation && to === toLocation) ||
          (from === toLocation && to === fromLocation),
      );

      fromLocation = toLocation;

      return total + distance.distance;
    }, 0);
  })
  .sort((a, b) => a - b);

const [shortestPath] = pathLenghts;

console.log(shortestPath);
