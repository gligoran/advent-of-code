const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const sorted = input
    .split('\n')
    .filter((l) => !!l)
    .map(Number)
    .sort((a, b) => a - b);

  let product;
  outerLoop: for (let i = 0; i < sorted.length; i++) {
    for (let j = sorted.length - 1; j > i; j--) {
      if (sorted[i] + sorted[j] === 2020) {
        product = sorted[i] * sorted[j];

        break outerLoop;
      }
    }
  }

  console.log({ product });
}

main(rawInput);
