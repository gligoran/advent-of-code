const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  let tiles = input
    .split('\n\n')
    .filter((l) => !!l)
    .map((tile) => {
      const [tId, ...pixels] = tile.split('\n').filter((l) => !!l);

      const topBorder = pixels[0];
      const bottomBorder = pixels[pixels.length - 1];
      const leftBorder = pixels.map((p) => p[0]).join('');
      const rightBorder = pixels.map((p) => p[p.length - 1]).join('');

      return {
        id: Number(tId.match(/[0-9]+/)[0]),
        topBorder: [topBorder, [...topBorder].reverse().join('')],
        bottomBorder: [bottomBorder, [...bottomBorder].reverse().join('')],
        leftBorder: [leftBorder, [...leftBorder].reverse().join('')],
        rightBorder: [rightBorder, [...rightBorder].reverse().join('')],
      };
    });

  const borders = tiles.flatMap((t) => [
    ...t.topBorder,
    ...t.bottomBorder,
    ...t.leftBorder,
    ...t.rightBorder,
  ]);

  tiles = tiles.map((t) => ({
    id: t.id,
    topBorder: t.topBorder.reduce(
      (sum, tb) => sum + borders.filter((b) => tb === b).length,
      0,
    ),
    bottomBorder: t.bottomBorder.reduce(
      (sum, bb) => sum + borders.filter((b) => bb === b).length,
      0,
    ),
    leftBorder: t.leftBorder.reduce(
      (sum, lb) => sum + borders.filter((b) => lb === b).length,
      0,
    ),
    rightBorder: t.rightBorder.reduce(
      (sum, rb) => sum + borders.filter((b) => rb === b).length,
      0,
    ),
  }));

  const cornerTiles = tiles.filter(
    (t) => t.topBorder + t.bottomBorder + t.leftBorder + t.rightBorder === 12,
  );

  const product = cornerTiles.reduce((p, t) => p * t.id, 1);

  console.log({ product });
}

main(rawInput);
