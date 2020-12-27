const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  console.time('main');
  let cups = new Array(1e6).fill(-1).map((c, i) => i + 1);
  const inputCups = input.split('\n')[0].split('').map(Number);
  inputCups.forEach((c, i) => (cups[i] = c));

  let currentIndex = 0;
  let current = cups[currentIndex];
  for (let i = 0; i < 1e7; i++) {
    let pickedUp = cups.splice(currentIndex + 1, 3);
    while (pickedUp.length < 3) {
      pickedUp = [...pickedUp, cups.shift()];
    }

    let destination = current;
    do {
      destination = destination - 1;
      if (destination < 1) {
        destination += cups.length + pickedUp.length;
      }
      if (pickedUp.indexOf(destination) < 0) {
        break;
      }
    } while (true);

    const destIndex = cups.indexOf(destination);

    cups.splice(destIndex + 1, 0, ...pickedUp);

    currentIndex = (cups.indexOf(current) + 1) % cups.length;
    current = cups[currentIndex];
  }

  const index = cups.indexOf(1);
  const product =
    cups[(index + 1) % cups.length] * cups[(index + 2) % cups.length];

  console.log({ product });
}

main(rawInput);
