const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const pairs = rawInput
  .split('\n')
  .filter((r) => !!r)
  .map((r) => r.split(','))
  .map((pair) => pair.map((p) => p.split('-').map(Number)))
  .filter(
    (pair) =>
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
      (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]),
  );

console.log(pairs.length);
