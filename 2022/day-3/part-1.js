const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const sum = rawInput
  .split('\n')
  .filter((r) => !!r)
  .flatMap((r) => {
    const smallCompartment = [...r].slice(0, r.length / 2);
    const bigCompartment = [...r].slice(r.length / 2);

    const shared = _.intersection(smallCompartment, bigCompartment);

    return shared;
  })
  .map((item) => {
    const priority = item.charCodeAt(0);
    return priority < 97 ? priority - 64 + 26 : priority - 96;
  })
  .reduce((total, priority) => total + priority, 0);

console.log(sum);
