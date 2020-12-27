const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const instructions = input.split('');

  let floor = 0;
  let position = 0;
  while (floor >= 0) {
    const instruction = instructions[position++];

    if (instruction === '(') {
      floor += 1;
    } else {
      floor -= 1;
    }
  }

  console.log({ position });
}

main(rawInput);
