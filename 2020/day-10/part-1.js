const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const adapters = input
    .split('\n')
    .filter((l) => !!l)
    .map(Number)
    .sort((a, b) => a - b);

  const diffs = {
    1: 0,
    2: 0,
    3: 0,
  };

  adapters.forEach((a, i) => {
    if (i === 0) {
      diffs[a]++;
    } else {
      diffs[a - adapters[i - 1]]++;
    }
  });

  diffs[3]++;

  console.log({ product: diffs[1] * diffs[3] });
}

main(rawInput);
