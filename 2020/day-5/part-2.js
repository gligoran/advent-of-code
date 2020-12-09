const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const passes = input.split('\n');

  const ids = passes
    .map((p) => parseInt(p.replace(/[FL]/gi, 0).replace(/[BR]/gi, 1), 2))
    .sort((a, b) => a - b);

  const seatId = ids.reduce((m, id, index) => {
    if (index === 0) {
      return -1;
    }

    if (id - ids[index - 1] === 2) {
      return id - 1;
    }

    return m;
  }, -1);

  console.log({ seatId });
}

main(rawInput);
