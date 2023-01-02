const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const EGGNOG = 150;

const containers = rawInput
  .split('\n')
  .filter((c) => !!c)
  .map(Number);

const generateCombinations = (cntnrs) => {
  if (cntnrs.length === 1) {
    return [[], cntnrs];
  }

  const [first, ...rest] = cntnrs;

  const cmbntn = generateCombinations(rest);
  return cmbntn.flatMap((c) => [[...c], [first, ...c]]);
};

const combinations = generateCombinations(containers);

const fittingCombinations = combinations.filter(
  (combination) =>
    combination.reduce((sum, container) => sum + container, 0) === EGGNOG,
);

const combinationsByLength = _.groupBy(fittingCombinations, 'length');
const shortestCombinations = Object.entries(combinationsByLength).sort(
  (a, b) => a[0] - b[0],
)[0];
const shortestCombinationsCount = shortestCombinations[1].length;

console.log(shortestCombinationsCount);
