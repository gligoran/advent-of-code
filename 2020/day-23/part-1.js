const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input, moves = 100) {
  let cups = input.split('\n')[0].split('').map(Number);

  let current = cups[0];
  for (let i = 0; i < moves; i++) {
    let pickedUp = cups.splice(cups.indexOf(current) + 1, 3);
    while (pickedUp.length < 3) {
      pickedUp = [...pickedUp, cups.shift()];
    }

    let destination = current;
    do {
      destination = destination - 1;
      if (destination < 1) {
        destination += cups.length + pickedUp.length;
      }
      if (cups.indexOf(destination) >= 0) {
        break;
      }
    } while (true);

    cups.splice(cups.indexOf(destination) + 1, 0, ...pickedUp);

    current = cups[(cups.indexOf(current) + 1) % cups.length];
  }

  let first;
  while (cups[0] !== 1) {
    [first, ...cups] = cups;
    cups = [...cups, first];
  }

  [first, ...cups] = cups;
  console.log({ cups: cups.join('') });
}

main(rawInput, 100);
