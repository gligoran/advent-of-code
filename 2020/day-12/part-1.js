const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const instructions = input
    .split('\n')
    .filter((l) => !!l)
    .map((i) => [i[0], Number(i.split('').slice(1).join(''))]);

  const position = {
    E: 0,
    N: 0,
  };

  let direction = 'E';
  const leftRotation = ['E', 'N', 'W', 'S'];
  const rightRotation = ['E', 'S', 'W', 'N'];

  instructions.forEach(([dir, units]) => {
    switch (dir) {
      case 'N':
        position.N += units;
        break;
      case 'S':
        position.N -= units;
        break;
      case 'E':
        position.E += units;
        break;
      case 'W':
        position.E -= units;
        break;
      case 'L':
        direction =
          leftRotation[
            (leftRotation.indexOf(direction) + units / 90) % leftRotation.length
          ];
        break;
      case 'R':
        direction =
          rightRotation[
            (rightRotation.indexOf(direction) + units / 90) %
              rightRotation.length
          ];
        break;
      case 'F':
        switch (direction) {
          case 'N':
            position.N += units;
            break;
          case 'S':
            position.N -= units;
            break;
          case 'E':
            position.E += units;
            break;
          case 'W':
            position.E -= units;
            break;
        }
        break;
    }
  });

  console.log({
    manhattanDistance: Math.abs(position.N) + Math.abs(position.E),
  });
}

main(rawInput);
