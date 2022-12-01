const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const calories = rawInput
  .split('\n\n')
  .map((items) =>
    items
      .split('\n')
      .filter((i) => !!i)
      .map(Number)
      .reduce((total, itemCalories) => total + itemCalories, 0),
  )
  .sort((a, b) => b - a);

const [top] = calories;

console.log(top);
