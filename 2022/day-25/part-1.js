const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const snafuMap = {
  '=': -2,
  '-': -1,
  0: 0,
  1: 1,
  2: 2,
};

const toDecimal = (snafuNumber) => {
  const places = snafuNumber.split('').map((s) => snafuMap[s]);
  places.reverse();

  return places.reduce((sum, place, index) => sum + place * 5 ** index, 0);
};

const maxNum = (pow) => {
  let max = 0;
  for (let p = 0; p <= pow; p += 1) {
    max = max + 2 * 5 ** p;
  }
  return max;
};

const toSnafu = (decimalNumber) => {
  const parts = ['=', '-', '0', '1', '2'];
  let number = decimalNumber;
  let snafu = [];

  while (true) {
    snafu.push(parts[(number + 2) % 5]);
    number = Math.floor((number + 2) / 5);
    if (number === 0) {
      break;
    }
  }

  snafu.reverse();
  return snafu.join('');
};

const sum = rawInput
  .split('\n')
  .filter((n) => !!n)
  .map((snafu) => toDecimal(snafu))
  .reduce((sum, number) => sum + number, 0);

const snafuSum = toSnafu(sum);
console.log(snafuSum);
