const fs = require('fs');
const { addListener } = require('process');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function generateAddreses(addr) {
  if (addr.length === 0) {
    return [[]];
  }

  const x = generateAddreses(addr.slice(1)).flatMap((a) => {
    if (addr[0] === 'X') {
      return [
        [0, ...a],
        [1, ...a],
      ];
    }

    return [[addr[0], ...a]];
  });

  return x;
}

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

    const val = cmd[2];
    const addr = cmd[1]
      .toString(2)
      .padStart(bitmask.length, '0')
      .split('')
      .map((v, i) => (bitmask[i] === '0' ? v : bitmask[i]));

    const addresses = generateAddreses(addr);
    addresses.forEach((a) => {
      memory[parseInt(a.join(''), 2)] = val;
    });
  });

  const sum = Object.values(memory).reduce((acc, v) => (acc += v), 0);

  console.log({ sum });
}

main(rawInput);
