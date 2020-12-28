const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const directions = input.split('').filter((d) => !!d);

  let pos = [
    [0, 0],
    [0, 0],
  ];
  const houses = directions.reduce(
    (h, dir, i) => {
      switch (dir) {
        case '^':
          pos[i % 2][1] += 1;
          break;
        case '>':
          pos[i % 2][0] += 1;
          break;
        case 'v':
          pos[i % 2][1] -= 1;
          break;
        case '<':
          pos[i % 2][0] -= 1;
          break;
      }

      const loc = `${pos[i % 2][0]}x${pos[i % 2][1]}`;
      h[loc] = h[loc] ? h[loc] + 1 : 1;

      return h;
    },
    { '0x0': 2 },
  );

  console.log({ houses: Object.entries(houses).length });
}

main(rawInput);
