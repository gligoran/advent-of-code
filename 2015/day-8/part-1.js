const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const lines = rawInput.split('\n').filter((i) => !!i);

const codeLength = lines
  .map((line) => line.length)
  .reduce((total, lineLength) => total + lineLength, 0);

const memorySize = lines
  .map((line) => line.replace(/(\\x[a-f0-9]{2}|\\\\|\\")/gi, '#'))
  .map((line) => line.length - 2)
  .reduce((total, lineLength) => total + lineLength, 0);

console.log(codeLength - memorySize);
