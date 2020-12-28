const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const strings = input
    .split('\n')
    .filter((l) => !!l)
    .filter((str) => {
      const chars = str.split('');

      if (!chars.some((c, i) => i < chars.length - 2 && chars[i + 2] === c)) {
        return false;
      }

      if (
        !chars.some((c, i) => {
          if (i >= chars.length - 1) {
            return false;
          }

          return str.lastIndexOf(`${chars[i]}${chars[i + 1]}`) > i + 1;
        })
      ) {
        return false;
      }

      return true;
    }).length;

  console.log({ strings });
}

main(rawInput);
