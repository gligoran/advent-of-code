const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const numbers = input.split('\n')[0].split(',').map(Number);

  while (numbers.length < 2020) {
    const lastNumber = numbers[numbers.length - 1];

    const previousIndex = numbers
      .slice(0, numbers.length - 1)
      .lastIndexOf(lastNumber);

    const newNumber =
      previousIndex === -1 ? 0 : numbers.length - 1 - previousIndex;

    numbers.push(newNumber);
  }

  console.log({ lastNumber: numbers[numbers.length - 1] });
}

main(rawInput);
