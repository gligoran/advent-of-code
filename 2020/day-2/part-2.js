const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const lines = input.split('\n').filter((l) => !!l);

  const valid = lines.filter((line) => {
    const [rule, char, pwd] = line.split(/[ \:]/).filter((p) => !!p);
    const [p1, p2] = rule.split('-').map(Number);

    const c1 = pwd[p1 - 1];
    const c2 = pwd[p2 - 1];

    const pass = (c1 === char && c2 !== char) || (c1 !== char && c2 === char);

    return pass;
  });

  console.log({ valid: valid.length });
}

main(rawInput);
