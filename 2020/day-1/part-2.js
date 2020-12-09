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
    for (let j = i + 1; j < sorted.length; j++) {
      innerLoop: for (let k = j + 1; k < sorted.length; k++) {
        if (sorted[i] + sorted[j] + sorted[k] === 2020) {
          product = sorted[i] * sorted[j] * sorted[k];
          break outerLoop;
        }
        if (sorted[i] + sorted[j] + sorted[k] > 2020) {
          break innerLoop;
        }
      }
    }
  }

  console.log({ product });
}

main(rawInput);
