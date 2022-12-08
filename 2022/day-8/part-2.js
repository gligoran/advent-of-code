const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const treeHeights = rawInput
  .split('\n')
  .filter((row) => !!row)
  .map((row) => row.split('').map(Number));

const treeHeightsTransposed = treeHeights.map((row, rowIndex) =>
  row.map((col, colIndex) => treeHeights[colIndex][rowIndex]),
);

const size = treeHeights.length;

const visibilityScores = treeHeights.map((row, rowIndex) => {
  return row.map((treeHeight, colIndex) => {
    if (
      rowIndex === 0 ||
      rowIndex === size - 1 ||
      colIndex === 0 ||
      colIndex === size - 1
    ) {
      return 0;
    }

    const rowLeft = row.slice(0, colIndex);
    const left =
      Math.max(...rowLeft) < treeHeight
        ? colIndex
        : _.reverse(rowLeft).findIndex((th) => th >= treeHeight) + 1;

    const rowRight = row.slice(colIndex + 1);
    const right =
      Math.max(...rowRight) < treeHeight
        ? size - colIndex - 1
        : rowRight.findIndex((th) => th >= treeHeight) + 1;

    const col = treeHeightsTransposed[colIndex];
    const rowUp = col.slice(0, rowIndex);
    const up =
      Math.max(...rowUp) < treeHeight
        ? rowIndex
        : _.reverse(rowUp).findIndex((th) => th >= treeHeight) + 1;

    const rowDown = col.slice(rowIndex + 1);
    const down =
      Math.max(...rowDown) < treeHeight
        ? size - rowIndex - 1
        : rowDown.findIndex((th) => th >= treeHeight) + 1;

    return left * right * up * down;
  });
});

const maxScore = Math.max(...visibilityScores.flatMap((row) => row));

console.log(maxScore);
