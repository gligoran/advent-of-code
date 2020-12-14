const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const cmds = input
    .split('\n')
    .filter((l) => !!l)
    .map((cmd) => cmd.split(' = '))
    .map(([c, v]) => {
      if (c === 'mask') {
        return [c, v.split('')];
      }

      return ['mem', parseInt(c.slice(4, c.length - 1)), Number(v)];
    });

  const memory = {};
  let bitmask;

  cmds.forEach((cmd) => {
    const c = cmd[0];

    if (c === 'mask') {
      bitmask = cmd[1];
      return;
    }

    const addr = cmd[1];
    const val = parseInt(
      cmd[2]
        .toString(2)
        .padStart(bitmask.length, '0')
        .split('')
        .map((v, i) => (bitmask[i] === 'X' ? v : bitmask[i]))
        .join(''),
      2,
    );

    memory[addr] = val;
  });

  const sum = Object.values(memory).reduce((acc, v) => (acc += v), 0);

  console.log({ sum });
}

main(rawInput);
