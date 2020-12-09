const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const lines = input.split('\n').filter((l) => !!l);
  const lineLength = lines[0].length;

  let x = 0;
  let trees = 0;
  for (let y = 1; y < lines.length; y += 1) {
    x += 3;

    if (lines[y][x % lineLength] === '#') {
      trees++;
    }
  }

  console.log({ trees });
}

main(rawInput);
