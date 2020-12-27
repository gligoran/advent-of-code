const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const devices = input
    .split('\n')
    .filter((l) => !!l)
    .map((pk) => ({ publicKey: Number(pk) }))
    .map((d) => {
      let loopSize = 0;
      let value = 1;
      while (value !== d.publicKey) {
        value = (value * 7) % 20201227;
        loopSize++;
      }

      return { ...d, loopSize };
    });

  const encryptionKey = new Array(devices[0].loopSize)
    .fill(0)
    .reduce((ek) => (ek * devices[1].publicKey) % 20201227, 1);

  console.log({ encryptionKey });
}

main(rawInput);
