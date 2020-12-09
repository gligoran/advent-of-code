const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const lines = input.split('\n').filter((l) => !!l);

  const valid = lines.filter((line) => {
    const [rule, char, pwd] = line.split(/[ \:]/).filter((p) => !!p);
    const [min, max] = rule.split('-').map(Number);

    const chars = [...pwd].filter((c) => c === char);
    const pass = chars.length >= min && chars.length <= max;

    return pass;
  });

  console.log({ valid: valid.length });
}

main(rawInput);
