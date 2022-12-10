const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const INTERESTING_CYCLES = [20, 60, 100, 140, 180, 220];

let X = 1;

const cycles = rawInput
  .split(`\n`)
  .filter((instruction) => !!instruction)
  .flatMap((instruction) => {
    if (instruction === 'noop') {
      return X;
    }

    const [_, diff] = instruction.split(' ');
    const r = [X, X];

    X += Number(diff);

    return r;
  });

const sum = cycles
  .map((c, i) => (INTERESTING_CYCLES.includes(i + 1) ? c * (i + 1) : 0))
  .reduce((total, cycle) => total + cycle, 0);

console.log(sum);
