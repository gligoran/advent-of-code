const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const groups = input
    .split('\n\n')
    .map((g) => g.replaceAll('\n', ''))
    .map((g) => [...g].sort().filter((c, i, a) => a.indexOf(c) === i))
    .map((g) => g.length)
    .reduce((sum, g) => sum + g, 0);

  console.log({ groups });
}

main(rawInput);
