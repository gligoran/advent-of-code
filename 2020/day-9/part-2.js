const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function isSum(number, array) {
  return array.some((x, index) =>
    array.slice(index + 1).some((y) => x + y === number),
  );
}

function main(input, preamble) {
  const numbers = input.split(`\n`).map(Number);

  let invalidNumber;
  for (let i = preamble; i < numbers.length; i++) {
    if (!isSum(numbers[i], numbers.slice(i - preamble, i))) {
      invalidNumber = numbers[i];
      break;
    }
  }

  let weakness;
  for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 2; j < numbers.length; j++) {
      const array = numbers.slice(i, j);
      const sum = array.reduce((acc, n) => acc + n, 0);

      if (sum === invalidNumber) {
        const sortedArray = array.sort((a, b) => a - b);
        const min = sortedArray[0];
        const max = sortedArray[sortedArray.length - 1];
        weakness = min + max;
      }
    }
  }

  console.log({ weakness });
}

main(rawInput, 25);
