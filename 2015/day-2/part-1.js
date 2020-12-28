const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const wrappingPaper = input
    .split('\n')
    .filter((l) => !!l)
    .map((p) =>
      p
        .split('x')
        .map(Number)
        .sort((a, b) => a - b),
    )
    .map(([l, w, h]) => 3 * l * w + 2 * l * h + 2 * w * h)
    .reduce((sum, p) => sum + p, 0);

  console.log({ wrappingPaper });
}

main(rawInput);
