const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function run(instructions) {
  instructions = instructions.map((i) => [...i, 0]);

  let hasFinished = true;
  let acc = 0;
  for (let i = 0; i < instructions.length; ) {
    const [ins, val] = instructions[i];

    instructions[i][2] += 1;
    if (instructions[i][2] == 2) {
      hasFinished = false;
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

  return { acc, hasFinished };
}

function main(rawInput) {
  const instructions = rawInput
    .split('\n')
    .filter((l) => !!l)
    .map((i) => i.split(' '))
    .map(([i, n]) => [i, Number(n)]);

  for (let i = 0; i < instructions.length; i++) {
    const [ins] = instructions[i];

    let newIns = ins;
    if (ins === 'jmp') {
      newIns = 'nop';
    } else if (ins === 'nop') {
      newIns = 'jmp';
    }

    const newInstructions = JSON.parse(JSON.stringify(instructions));
    newInstructions[i][0] = newIns;

    const { acc, hasFinished } = run(newInstructions);

    if (hasFinished) {
      console.log({ acc, hasFinished, ins: instructions[i] });
      break;
    }
  }
}

main(rawInput);
