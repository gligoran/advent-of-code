const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let [rawStacks, moves] = rawInput.split('\n\n').filter((l) => !!l);

rawStacks = _.reverse(rawStacks.split('\n').filter((l) => !!l));
const [stackNumbers, ...crateRows] = rawStacks;
const stacks = Object.fromEntries(
  stackNumbers
    .split(' ')
    .filter((s) => !!s)
    .map((s) => [s, []]),
);

const stackCount = Object.keys(stacks).length;

crateRows.forEach((crateRow) => {
  for (let x = 0; x < stackCount; x += 1) {
    const crate = crateRow.charAt(x * 4 + 1);
    if (!!crate.trim()) {
      stacks[x + 1].push(crate);
    }
  }
});

moves = moves
  .split('\n')
  .filter((m) => !!m)
  .map((move) => {
    const [count, from, to] = move
      .split(' ')
      .map(Number)
      .filter(Number.isInteger);

    return { count, from, to };
  });

moves.forEach((move) => {
  const movedCrates = stacks[move.from].splice(
    stacks[move.from].length - move.count,
    move.count,
  );

  stacks[move.to].push(...movedCrates);
});

const topOfStacks = Object.values(stacks)
  .map((stack) => stack.pop())
  .join('');

console.log(topOfStacks);
