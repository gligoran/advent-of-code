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

const packets = rawInput
  .replaceAll('\n\n', '\n')
  .split('\n')
  .filter((p) => !!p)
  .map(JSON.parse)
  .sort();

const div2 = [[2]];
const div6 = [[6]];
packets.push(div2, div6);

packets.sort((a, b) => (compare(a, b) ? -1 : 1));

const index2 = packets.indexOf(div2) + 1;
const index6 = packets.indexOf(div6) + 1;

const decoderKey = index2 * index6;
console.log(decoderKey);
