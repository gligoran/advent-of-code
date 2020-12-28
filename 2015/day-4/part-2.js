const fs = require('fs');
const crypto = require('crypto');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const md5 = (data) => crypto.createHash('md5').update(data).digest('hex');

function main(input) {
  const secret = input.split('\n')[0];

  let found = false;
  let number = -1;

  do {
    number += 1;
    const hash = md5(`${secret}${number}`);

    found = hash.slice(0, 6) === '000000';
  } while (!found);

  console.log({ number });
}

main(rawInput);
