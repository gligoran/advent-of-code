const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const instructions = input.split('');

  const upInstructions = instructions.filter((c) => c === '(').length;
  const downInstructions = instructions.filter((c) => c === ')').length;

  const floor = upInstructions - downInstructions;

  console.log({ floor });
}

main(rawInput);
