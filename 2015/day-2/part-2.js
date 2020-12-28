const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const ribbon = input
    .split('\n')
    .filter((l) => !!l)
    .map((p) =>
      p
        .split('x')
        .map(Number)
        .sort((a, b) => a - b),
    )
    .map(([l, w, h]) => 2 * l + 2 * w + l * w * h)
    .reduce((sum, p) => sum + p, 0);

  console.log({ ribbon });
}

main(rawInput);
