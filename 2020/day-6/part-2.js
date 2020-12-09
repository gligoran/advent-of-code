const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const groups = input
    .split('\n\n')
    .map((group) =>
      group
        .split('\n')
        .map((g) => [...g])
        .filter((g) => g.length),
    )
    .map((g) => _.intersection(...g))
    .map((g) => g.length)
    .reduce((sum, g) => sum + g, 0);

  console.log({ groups });
}

main(rawInput);
