const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  let tilesDirections = input
    .split('\n')
    .filter((l) => !!l)
    .map((td) => {
      const letters = td.split('');
      const directions = [];

      for (let i = 0; i < letters.length; i++) {
        let dir = letters[i];

        if (['s', 'n'].includes(dir)) {
          i++;
          dir += letters[i];
        }

        directions.push(dir);
      }

      return directions;
    });

  tilesDirections = tilesDirections.map((td) =>
    td.reduce(
      (c, dir) => {
        let { q, r } = c;

        switch (dir) {
          case 'e':
            q -= 1;
            break;
          case 'ne':
            r -= 1;
            break;
          case 'nw':
            q += 1;
            r -= 1;
            break;
          case 'w':
            q += 1;
            break;
          case 'sw':
            r += 1;
            break;
          case 'se':
            q -= 1;
            r += 1;
            break;
        }

        return { q, r };
      },
      { q: 0, r: 0 },
    ),
  );

  tilesDirections = tilesDirections.map((td) => ({
    ...td,
    count: tilesDirections.filter((t) => _.isEqual(td, t)).length,
  }));

  const blackTiles = tilesDirections.filter((td) => td.count % 2 === 1).length;

  console.log({ blackTiles });
}

main(rawInput);
