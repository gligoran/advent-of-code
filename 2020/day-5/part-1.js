const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const passes = input.split('\n');

  const ids = passes
    .map((p) => parseInt(p.replace(/[FL]/gi, 0).replace(/[BR]/gi, 1), 2))
    .sort((a, b) => b - a);

  const max = ids[0];

  console.log({ max: max });
}

main(rawInput);
