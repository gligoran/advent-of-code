const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

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

const pixels = cycles.map((register, position) => {
  if (register >= (position % 40) - 1 && register <= (position % 40) + 1) {
    return '#';
  }
  return '.';
});

const lines = [];
const lineLength = 40;
for (let i = 0; i < pixels.length; i += lineLength) {
  lines.push(pixels.slice(i, i + lineLength));
}

console.log(lines.map((line) => line.join('')).join('\n'));
