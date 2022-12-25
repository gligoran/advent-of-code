const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const DECRYPTION_KEY = 811589153;

const encryptedFile = rawInput
  .split(`\n`)
  .filter((l) => !!l)
  .map((n, i) => ({
    originalIndex: i,
    value: Number(n) * DECRYPTION_KEY,
  }));

const decryptedFile = encryptedFile.map((n) => ({ ...n }));

for (let round = 0; round < 10; round += 1) {
  for (
    let originalIndex = 0;
    originalIndex < encryptedFile.length;
    originalIndex += 1
  ) {
    let index = decryptedFile.findIndex(
      (n) => n.originalIndex === originalIndex,
    );
    const de = decryptedFile.splice(index, 1)[0];

    let newIndex = (index + de.value) % decryptedFile.length;

    const newDe = {
      originalIndex: de.originalIndex,
      value: de.value,
    };

    decryptedFile.splice(newIndex, 0, newDe);
  }
}

const index0 = decryptedFile.findIndex((n) => n.value === 0);

const num1 = decryptedFile[(index0 + 1000) % decryptedFile.length].value;
const num2 = decryptedFile[(index0 + 2000) % decryptedFile.length].value;
const num3 = decryptedFile[(index0 + 3000) % decryptedFile.length].value;

const sum = num1 + num2 + num3;

console.log(sum);
