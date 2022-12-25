const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const encryptedFile = rawInput
  .split(`\n`)
  .filter((l) => !!l)
  .map((n, i) => ({ value: Number(n), sorted: false }));

const decryptedFile = encryptedFile.map((n) => ({ ...n }));

let index;
while ((index = decryptedFile.findIndex((n) => !n.sorted)) > -1) {
  const de = decryptedFile.splice(index, 1)[0];

  let newIndex = (index + de.value) % decryptedFile.length;

  const newDe = {
    value: de.value,
    sorted: true,
  };

  decryptedFile.splice(newIndex, 0, newDe);
}

const index0 = decryptedFile.findIndex((n) => n.value === 0);

const num1 = decryptedFile[(index0 + 1000) % decryptedFile.length].value;
const num2 = decryptedFile[(index0 + 2000) % decryptedFile.length].value;
const num3 = decryptedFile[(index0 + 3000) % decryptedFile.length].value;

const sum = num1 + num2 + num3;

console.log(sum);
