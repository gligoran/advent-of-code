const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const numbers = input.split('\n')[0].split(',').map(Number);

  const lastNumbers = [];
  numbers.slice(0, numbers.length - 1).forEach((n, i) => (lastNumbers[n] = i));

  while (numbers.length < 30000000) {
    const lastNumber = numbers[numbers.length - 1];
    const previousIndex = lastNumbers[lastNumber];
    const newNumber =
      previousIndex !== undefined ? numbers.length - 1 - previousIndex : 0;

    numbers.push(newNumber);

    lastNumbers[lastNumber] = numbers.length - 2;
  }

  console.log({ lastNumber: numbers[numbers.length - 1] });
}

main(rawInput);
