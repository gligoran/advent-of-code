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

  console.log({ invalidNumber });
}

main(rawInput, 25);
