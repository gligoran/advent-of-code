const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const json = JSON.parse(rawInput);

const process = (data) => {
  if (typeof data === 'number') {
    return Number(data);
  }

  if (_.isArray(data)) {
    return _.sum(data.map(process));
  }

  if (_.isObject(data)) {
    if (Object.values(data).includes('red')) {
      return 0;
    }

    return _.sum(Object.values(data).map(process));
  }

  return 0;
};

const sum = process(json);

console.log(sum);
