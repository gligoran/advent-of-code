const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const treeHeights = rawInput
  .split('\n')
  .filter((row) => !!row)
  .map((row) => row.split('').map(Number));

const size = treeHeights.length;

const treeHeightsTransposed = treeHeights.map((row, rowIndex) =>
  row.map((col, colIndex) => treeHeights[colIndex][rowIndex]),
);

const isVisible = treeHeights.map((row, rowIndex) => {
  return row.map((treeHeight, colIndex) => {
    if (
      rowIndex === 0 ||
      rowIndex === size - 1 ||
      colIndex === 0 ||
      colIndex === size - 1
    ) {
      return true;
    }

    const left = row.slice(0, colIndex);
    if (Math.max(...left) < treeHeight) {
      return true;
    }

    const right = row.slice(colIndex + 1);
    if (Math.max(...right) < treeHeight) {
      return true;
    }

    const col = treeHeightsTransposed[colIndex];
    const up = col.slice(0, rowIndex);
    if (Math.max(...up) < treeHeight) {
      return true;
    }

    const down = col.slice(rowIndex + 1);
    if (Math.max(...down) < treeHeight) {
      return true;
    }

    return false;
  });
});

const visibleTrees = isVisible.flatMap((row) => row).filter((v) => v).length;

console.log(visibleTrees);
