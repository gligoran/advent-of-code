const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const directions = input.split('').filter((d) => !!d);

  let [x, y] = [0, 0];
  const houses = directions.reduce(
    (h, dir) => {
      switch (dir) {
        case '^':
          y += 1;
          break;
        case '>':
          x += 1;
          break;
        case 'v':
          y -= 1;
          break;
        case '<':
          x -= 1;
          break;
      }

      const loc = `${x}x${y}`;
      h[loc] = h[loc] ? h[loc] + 1 : 1;

      return h;
    },
    { '0x0': 1 },
  );

  console.log({ houses: Object.entries(houses).length });
}

main(rawInput);
