const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const compare = (left, right) => {
  if (!_.isArray(left) && !_.isArray(right)) {
    if (left === right) {
      return undefined;
    }

    return left < right;
  }

  if (!_.isArray(left)) {
    return compare([left], right);
  }

  if (!_.isArray(right)) {
    return compare(left, [right]);
  }

  for (let i = 0; i < Math.min(left.length, right.length); i += 1) {
    const leftItem = left?.[i];
    const rightItem = right?.[i];

    const result = compare(leftItem, rightItem);
    if (result === undefined) {
      continue;
    }

    return result;
  }

  if (left.length === right.length) {
    return undefined;
  }

  return left.length < right.length;
};

const pairs = rawInput
  .split('\n\n')
  .filter((p) => !!p)
  .map((pair) =>
    pair
      .split('\n')
      .filter((p) => !!p)
      .map(JSON.parse),
  )
  .map(([left, right]) => ({ left, right }))
  .map(({ left, right }) => ({ left, right, ordered: compare(left, right) }));

const indices = pairs
  .map(({ ordered }, index) => ({ ordered, index: index + 1 }))
  .filter(({ ordered }) => ordered)
  .map(({ index }) => index);

const sum = _.sum(indices);

console.log(sum);
