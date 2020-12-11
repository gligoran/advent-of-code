const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function findDiagonal(rows, r, c, dr, dc) {
  if (dr === 0 && dc === 0) {
    return '';
  }

  const rowCount = rows.length;
  const colCount = rows[0].length;

  let i = r + dr;
  let j = c + dc;
  while (i >= 0 && i < rowCount && j >= 0 && j < colCount) {
    if (rows[i][j] !== '.') {
      return rows[i][j];
    }
    i = i + dr;
    j = j + dc;
  }

  return '';
}

function doRound(rows) {
  const newRows = _.cloneDeep(rows);

  const rowCount = rows.length;
  const colCount = rows[0].length;

  let changes = 0;
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      if (rows[r][c] === '.') {
        continue;
      }

      let seats = '';
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          seats += findDiagonal(rows, r, c, i, j);
        }
      }

      const seatCount = seats.length;
      const emptyCount = seats.split('').filter((s) => s === 'L').length;

      if (rows[r][c] === 'L' && seatCount === emptyCount) {
        newRows[r][c] = '#';
        changes += 1;
      } else if (rows[r][c] === '#' && seatCount - emptyCount >= 5) {
        newRows[r][c] = 'L';
        changes += 1;
      }
    }
  }

  return { newRows, changes };
}

function main(input) {
  let rows = input
    .split(`\n`)
    .filter((l) => !!l)
    .map((r) => r.split(''));

  let changes;
  do {
    const result = doRound(rows);
    rows = result.newRows;
    changes = result.changes;
  } while (changes > 0);

  const occupiedSeats = rows.flatMap((r) => r).filter((s) => s === '#').length;

  console.log({ occupiedSeats });
}

main(rawInput);
