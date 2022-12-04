const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const pairs = rawInput
  .split('\n')
  .filter((r) => !!r)
  .map((r) => r.split(','))
  .map((pair) =>
    pair
      .map((p) => p.split('-').map(Number))
      .map((p) => _.range(p[0], p[1] + 1, 1)),
  )
  .filter((p) => _.intersection(p[0], p[1]).length);

console.log(pairs.length);
