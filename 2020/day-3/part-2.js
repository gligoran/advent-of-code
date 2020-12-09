const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const lines = input.split('\n').filter((l) => !!l);
  const lineLength = lines[0].length;

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let total = 1;

  for (let s = 0; s < slopes.length; s++) {
    let x = 0;
    let trees = 0;
    for (let y = slopes[s][1]; y < lines.length; y += slopes[s][1]) {
      x += slopes[s][0];

      if (lines[y][x % lineLength] === '#') {
        trees++;
      }
    }
    total *= trees;
  }

  console.log({ total });
}

main(rawInput);
