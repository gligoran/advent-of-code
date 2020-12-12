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

  const waypoint = {
    E: 10,
    N: 1,
  };

  let cN, cE;

  instructions.forEach(([dir, units]) => {
    switch (dir) {
      case 'N':
        waypoint.N += units;
        break;
      case 'S':
        waypoint.N -= units;
        break;
      case 'E':
        waypoint.E += units;
        break;
      case 'W':
        waypoint.E -= units;
        break;
      case 'L':
        cE = waypoint.E;
        cN = waypoint.N;
        switch (units) {
          case 90:
            waypoint.E = -cN;
            waypoint.N = cE;
            break;
          case 180:
            waypoint.E = -cE;
            waypoint.N = -cN;
            break;
          case 270:
            waypoint.E = cN;
            waypoint.N = -cE;
            break;
        }
        break;
      case 'R':
        cE = waypoint.E;
        cN = waypoint.N;
        switch (units) {
          case 90:
            waypoint.E = cN;
            waypoint.N = -cE;
            break;
          case 180:
            waypoint.E = -cE;
            waypoint.N = -cN;
            break;
          case 270:
            waypoint.E = -cN;
            waypoint.N = cE;
            break;
        }
        break;
      case 'F':
        position.N += units * waypoint.N;
        position.E += units * waypoint.E;
        break;
    }
  });

  console.log({
    manhattanDistance: Math.abs(position.N) + Math.abs(position.E),
  });
}

main(rawInput);
