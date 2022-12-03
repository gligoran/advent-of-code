const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const sum = rawInput
  .split('\n')
  .filter((r) => !!r)
  .reduce((groups, rucksack) => {
    if (groups.length < 1) {
      return [[rucksack]];
    }

    if (groups[groups.length - 1].length < 3) {
      groups[groups.length - 1].push(rucksack);
    } else {
      groups.push([rucksack]);
    }

    return groups;
  }, [])
  .flatMap((group) => _.intersection(...group.map((rucksack) => [...rucksack])))
  .map((item) => {
    const priority = item.charCodeAt(0);
    return priority < 97 ? priority - 64 + 26 : priority - 96;
  })
  .reduce((total, priority) => total + priority, 0);

console.log(sum);
