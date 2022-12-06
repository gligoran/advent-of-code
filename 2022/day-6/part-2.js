const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const uniqueCharsNeeded = 14;
let marker = 0;
for (let i = uniqueCharsNeeded - 1; i < rawInput.length; i += 1) {
  const chars = new Array(uniqueCharsNeeded)
    .fill(null)
    .map((g, index) => rawInput.charAt(i - index));

  const uniqChars = _.uniq(chars);

  if (uniqChars.length === uniqueCharsNeeded) {
    marker = i + 1;
    break;
  }
}

console.log(marker);
