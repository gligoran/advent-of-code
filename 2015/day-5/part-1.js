const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const vowels = 'aeiou';
  const banned = ['ab', 'cd', 'pq', 'xy'];

  const strings = input
    .split('\n')
    .filter((l) => !!l)
    .filter((str) => {
      const chars = str.split('');

      if (banned.some((s) => str.includes(s))) {
        return false;
      }

      if (chars.filter((c) => vowels.includes(c)).length < 3) {
        return false;
      }

      if (!chars.some((c, i) => i < chars.length - 1 && chars[i + 1] === c)) {
        return false;
      }

      return true;
    }).length;

  console.log({ strings });
}

main(rawInput);
