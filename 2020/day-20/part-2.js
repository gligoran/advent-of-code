const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function calcTileBorder(tile) {
  const topBorder = tile.pixels[0];
  const topBorderReversed = [...topBorder].reverse().join('');

  const bottomBorder = tile.pixels[tile.pixels.length - 1];
  const bottomBorderReversed = [...bottomBorder].reverse().join('');

  const leftBorder = tile.pixels.map((p) => p[0]).join('');
  const leftBorderReversed = [...leftBorder].reverse().join('');

  const rightBorder = tile.pixels.map((p) => p[p.length - 1]).join('');
  const rightBorderReversed = [...rightBorder].reverse().join('');

  return {
    ...tile,
    topBorder,
    topBorderReversed,
    bottomBorder,
    bottomBorderReversed,
    leftBorder,
    leftBorderReversed,
    rightBorder,
    rightBorderReversed,
    borders: [
      topBorder,
      topBorderReversed,
      bottomBorder,
      bottomBorderReversed,
      leftBorder,
      leftBorderReversed,
      rightBorder,
      rightBorderReversed,
    ],
  };
}

function flipX(tile) {
  tile.pixels = tile.pixels.map((p) => [...p].reverse().join(''));
  return calcTileBorder(tile);
}

function flipY(tile) {
  tile.pixels = tile.pixels.reverse();
  return calcTileBorder(tile);
}

function rotateRight(tile) {
  const N = tile.pixels.length - 1;
  const result = tile.pixels.map((row, i) =>
    [...row].map((val, j) => tile.pixels[N - j][i]).join(''),
  );
  tile.pixels.length = 0;
  tile.pixels.push(...result);

  return calcTileBorder(tile);
}

function main(input) {
  let tiles = input
    .split('\n\n')
    .filter((l) => !!l)
    .map((tile) => {
      const [tId, ...pixels] = tile.split('\n').filter((l) => !!l);

      const id = Number(tId.match(/[0-9]+/)[0]);

      return calcTileBorder({
        id,
        pixels,
        lockedX: false,
        lockedY: false,
      });
    });

  tiles = tiles
    .map((tile) => {
      const neighbors = tiles
        .filter((t) => t.id !== tile.id)
        .filter((t) => t.borders.some((b) => tile.borders.includes(b)))
        .map((t) => t.id)
        .sort((a, b) => a - b);

      return { neighbors, ...tile };
    })
    .sort((a, b) => a.id - b.id);

  const firstCorner = tiles.find((t) => t.neighbors.length === 2);

  const size = Math.sqrt(tiles.length);
  let puzzle = Array(size)
    .fill()
    .map(() => Array(size).fill(undefined));
  puzzle[0][0] = firstCorner.id;

  let openPositions = [[0, 0]];
  while ((curOpenPos = openPositions.shift())) {
    const [curX, curY] = curOpenPos;
    const curId = puzzle[curX][curY];
    const curTile = tiles.find((t) => t.id === curId);

    tiles.forEach(
      (t) => (t.neighbors = t.neighbors.filter((n) => n !== curId)),
    );

    if (curY < size - 1) {
      const [pairX, pairY] = [curX - 1, curY + 1];
      const pairTile =
        pairX >= 0 ? tiles.find((t) => t.id === puzzle[pairX][pairY]) : null;

      const commonNeighbor = pairTile
        ? curTile.neighbors.filter((n) => pairTile.neighbors.includes(n))[0]
        : curTile.neighbors.shift();

      puzzle[curX][curY + 1] = commonNeighbor;
      curTile.neighbors = curTile.neighbors.filter((n) => n !== commonNeighbor);

      if (pairTile) {
        pairTile.neighbors = pairTile.neighbors.filter(
          (n) => n !== commonNeighbor,
        );
      }
    }

    if (curY === 0 && curX + 1 < size) {
      puzzle[curX + 1][curY] = curTile.neighbors.shift();
      openPositions.push([curX + 1, curY]);
    }

    if (curY < size - 1) {
      openPositions.push([curX, curY + 1]);
    }
  }

  puzzle = puzzle.map((rows) =>
    rows.map((tId) => tiles.find((tile) => tile.id === tId)),
  );

  for (let y = 0; y < puzzle.length; y++) {
    for (let x = 0; x < puzzle[y].length; x++) {
      let cur = puzzle[y][x];

      if (x < puzzle[y].length - 1) {
        let nextX = puzzle[y][x + 1];

        const nextBorder = nextX.borders.reduce(
          (match, nb, i) => (cur.borders.includes(nb) ? nb : match),
          null,
        );

        if (!cur.lockedX) {
          if (
            cur.topBorder === nextBorder ||
            cur.topBorderReversed === nextBorder
          ) {
            cur = rotateRight(cur);
          } else if (
            cur.leftBorder === nextBorder ||
            cur.leftBorderReversed === nextBorder
          ) {
            cur = flipX(cur);
          } else if (
            cur.bottomBorder === nextBorder ||
            cur.bottomBorderReversed === nextBorder
          ) {
            cur = flipY(cur);
            cur = rotateRight(cur);
          }

          cur.lockedX = true;
          puzzle[y][x] = cur;
        }

        if (
          nextX.topBorder === nextBorder ||
          nextX.topBorderReversed === nextBorder
        ) {
          nextX = flipY(nextX);
          nextX = rotateRight(nextX);
        } else if (
          nextX.rightBorder === nextBorder ||
          nextX.rightBorderReversed === nextBorder
        ) {
          nextX = flipX(nextX);
        } else if (
          nextX.bottomBorder === nextBorder ||
          nextX.bottomBorderReversed === nextBorder
        ) {
          nextX = rotateRight(nextX);
        }

        if (cur.rightBorder !== nextX.leftBorder) {
          nextX = flipY(nextX);
        }

        nextX.lockedX = true;
        puzzle[y][x + 1] = nextX;
      }

      if (y < puzzle.length - 1) {
        let nextY = puzzle[y + 1][x];

        const nextBorder = nextY.borders.reduce(
          (match, nb, i) => (cur.borders.includes(nb) ? nb : match),
          null,
        );

        if (!cur.lockedY) {
          if (
            cur.topBorder === nextBorder ||
            cur.topBorderReversed === nextBorder
          ) {
            cur = flipY(cur);
          } else if (
            cur.leftBorder === nextBorder ||
            cur.leftBorderReversed === nextBorder
          ) {
            cur = flipX(cur);
            cur = rotateRight(cur);
          } else if (
            cur.rightBorder === nextBorder ||
            cur.rightBorderReversed === nextBorder
          ) {
            cur = rotateRight(cur);
          }

          cur.lockedY = true;
          puzzle[y][x] = cur;
        }

        if (
          nextY.bottomBorder === nextBorder ||
          nextY.bottomBorderReversed === nextBorder
        ) {
          nextY = flipY(nextY);
        } else if (
          nextY.leftBorder === nextBorder ||
          nextY.leftBorderReversed === nextBorder
        ) {
          nextY = rotateRight(nextY);
        } else if (
          nextY.rightBorder === nextBorder ||
          nextY.rightBorderReversed === nextBorder
        ) {
          nextY = flipX(nextY);
          nextY = rotateRight(nextY);
        }

        if (cur.bottomBorder !== nextY.topBorder) {
          nextY = flipX(nextY);
        }

        nextY.lockedY = true;
        puzzle[y + 1][x] = nextY;
      }
    }
  }

  puzzle = puzzle
    .map((rows) => rows.map((row) => row.pixels))
    .map((rows) =>
      rows.map((row) =>
        row
          .slice(1, row.length - 1)
          .map((line) => line.slice(1, line.length - 1)),
      ),
    );

  let image = puzzle.flatMap((rows) => {
    const nr = rows.reduce((rws, tile) => {
      tile.forEach((p, i) => {
        rws[i] += p;
      });

      return rws;
    }, rows.shift());

    return nr;
  });

  const monster = `
                  # 
#    ##    ##    ###
 #  #  #  #  #  #  `
    .split('\n')
    .filter((l) => !!l);

  const monsterSizeX = monster[0].length;
  const monsterSizeY = monster.length;

  let monsterCount = 0;
  for (let loop = 0; monsterCount === 0; loop++) {
    for (let y = 0; y <= image.length - monsterSizeY; y++) {
      for (let x = 0; x <= image[y].length - monsterSizeX; x++) {
        let monsterFound = true;
        monsterLoop: for (let my = 0; my < monsterSizeY; my++) {
          for (let mx = 0; mx < monsterSizeX; mx++) {
            if (monster[my][mx] === '#') {
              if (image[y + my][x + mx] !== '#') {
                monsterFound = false;
                break monsterLoop;
              }
            }
          }
        }

        if (monsterFound) {
          monsterCount++;
          for (let my = 0; my < monsterSizeY; my++) {
            for (let mx = 0; mx < monsterSizeX; mx++) {
              if (monster[my][mx] === '#') {
                image[y + my] = image[y + my]
                  .split('')
                  .map((p, i) => (i === x + mx ? 'O' : p))
                  .join('');
              }
            }
          }
        }
      }
    }

    if (!monsterCount) {
      image =
        loop === 4
          ? rotateRight({ pixels: image }).pixels
          : flipY({ pixels: image }).pixels;
    }
  }

  const roughness = image
    .join('')
    .split('')
    .filter((p) => p === '#').length;

  console.log({ roughness });
}

main(rawInput);
