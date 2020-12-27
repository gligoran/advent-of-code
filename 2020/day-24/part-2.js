const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const directions = {
    e: [-1, 0],
    ne: [0, -1],
    nw: [1, -1],
    w: [1, 0],
    sw: [0, 1],
    se: [-1, 1],
  };

  const tilesDirections = input
    .split('\n')
    .filter((l) => !!l)
    .map((td) => {
      const letters = td.split('');
      const path = [];

      for (let i = 0; i < letters.length; i++) {
        let dir = letters[i];

        if (['s', 'n'].includes(dir)) {
          i++;
          dir += letters[i];
        }

        path.push(dir);
      }

      return path;
    })
    .map((td) =>
      td.reduce(
        (c, dir) => ({
          q: c.q + directions[dir][0],
          r: c.r + directions[dir][1],
        }),
        { q: 0, r: 0 },
      ),
    );

  let blackTiles = tilesDirections
    .map((td) => ({
      ...td,
      count: tilesDirections.filter((t) => _.isEqual(td, t)).length,
    }))
    .filter((td) => td.count % 2 === 1)
    .map(({ q, r }) => ({ q, r }));

  for (let day = 1; day <= 100; day++) {
    let whiteTileToCheck = [];
    let newBlackTiles = blackTiles
      .map((bt) => {
        const neighbors = Object.values(directions).map((dir) => ({
          q: bt.q + dir[0],
          r: bt.r + dir[1],
        }));

        const blackNeighbors = _.intersectionWith(
          neighbors,
          blackTiles,
          _.isEqual,
        );

        const whiteNeighbors = _.differenceWith(
          neighbors,
          blackNeighbors,
          _.isEqual,
        );

        whiteTileToCheck.push(...whiteNeighbors);

        return { ...bt, blackNeighbors: blackNeighbors.length, whiteNeighbors };
      })
      .filter((bt) => bt.blackNeighbors > 0 && bt.blackNeighbors <= 2)
      .map(({ q, r }) => ({ q, r }));

    whiteTileToCheck = _.uniqWith(whiteTileToCheck, _.isEqual);
    whiteTileToCheck.forEach((wt) => {
      const neighbors = Object.values(directions).map((dir) => ({
        q: wt.q + dir[0],
        r: wt.r + dir[1],
      }));

      const blackNeighbors = _.intersectionWith(
        neighbors,
        blackTiles,
        _.isEqual,
      );

      if (blackNeighbors.length === 2) {
        newBlackTiles.push(wt);
      }
    });

    blackTiles = _.uniqWith(newBlackTiles, _.isEqual);
    console.log(`Day ${day}: ${blackTiles.length}`);
  }
}

main(rawInput);
