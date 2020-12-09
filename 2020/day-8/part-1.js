const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const instructions = input
    .split('\n')
    .filter((l) => !!l)
    .map((i) => i.split(' '))
    .map(([i, n]) => [i, Number(n), 0]);

  let acc = 0;
  for (let i = 0; i < instructions.length; ) {
    const [ins, val] = instructions[i];

    instructions[i][2] += 1;
    if (instructions[i][2] == 2) {
      break;
    }

    switch (ins) {
      case 'acc':
        acc += val;
      case 'nop':
        i += 1;
        break;
      case 'jmp':
        i += val;
        break;
    }
  }

  console.log({ acc });
}

main(rawInput);
