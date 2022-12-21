const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const allValves = rawInput
  .split('\n')
  .filter((v) => !!v)
  .map((valve) => {
    const [left, right] = valve.split(';');

    const leftParts = left.split(' ');
    const name = leftParts[1];
    const rate = parseInt(leftParts[4].replace('rate=', ''), 10);

    const connections = right.split(' ').slice(5).join('').split(',').sort();

    return { name, rate, connections };
  })
  .reduce((object, { name, ...valve }) => ({ ...object, [name]: valve }), {});

const valvesToOpen = Object.keys(allValves).filter(
  (valveName) => allValves[valveName].rate > 0,
);

const pairs = {};

const search = (start, end) => {
  let pair = `${start}-${end}`;
  if (pairs[pair]) {
    return pairs[pair];
  }

  let openValves = [{ name: start, steps: 0 }];
  let closedValves = [];

  while (openValves.length) {
    const valve = openValves.shift();
    closedValves.push(valve.name);

    const connections = allValves[valve.name].connections;

    if (connections.includes(end)) {
      pairs[`${start}-${end}`] = valve.steps + 1;
      pairs[`${end}-${start}`] = valve.steps + 1;
      return valve.steps + 1;
    }

    const nextSteps = connections
      .filter((c) => !closedValves.includes(c))
      .map((c) => ({
        name: c,
        steps: valve.steps + 1,
      }));

    openValves.push(...nextSteps);
    openValves = openValves.sort((a, b) => a.steps - b.steps);
  }
};

const outerSearch = () => {
  let open = [
    {
      myLocation: 'AA',
      myPath: 'AA',
      myMinutesRemaining: 26,
      elephantsLocation: 'AA',
      elephantsPath: 'AA',
      elephantsMinutesRemaining: 26,
      remainingValves: [...valvesToOpen],
      pressure: 0,
    },
  ];

  let maxPressure = 0;

  while (open.length) {
    const currentValve = open.shift();

    const paths = currentValve.remainingValves.flatMap((myValveName) => {
      const myDistance =
        currentValve.myMinutesRemaining > 0
          ? search(currentValve.myLocation, myValveName)
          : -1;

      const myMinutesRemaining = Math.max(
        currentValve.myMinutesRemaining - myDistance - 1,
        0,
      );

      if (currentValve.elephantsMinutesRemaining <= 0) {
        return {
          myLocation: myMinutesRemaining
            ? myValveName
            : currentValve.myLocation,
          myPath: myMinutesRemaining
            ? `${currentValve.myPath}-${myValveName}(${myMinutesRemaining})`
            : currentValve.myPath,
          myMinutesRemaining,
          elephantsLocation: currentValve.elephantsLocation,
          elephantsPath: currentValve.elephantsPath,
          elephantsMinutesRemaining: currentValve.elephantsMinutesRemaining,
          remainingValves: currentValve.remainingValves.filter(
            (v) => v !== myValveName,
          ),
          pressure:
            currentValve.pressure +
            myMinutesRemaining * allValves[myValveName].rate,
        };
      }

      return currentValve.remainingValves
        .filter((v) => v !== myValveName)
        .map((elephantsValveName) => {
          const elephantsDistance =
            currentValve.elephantsMinutesRemaining > 0
              ? search(currentValve.elephantsLocation, elephantsValveName)
              : -1;

          const elephantsMinutesRemaining = Math.max(
            currentValve.elephantsMinutesRemaining - elephantsDistance - 1,
            0,
          );

          return {
            myLocation: myMinutesRemaining
              ? myValveName
              : currentValve.myLocation,
            myPath: myMinutesRemaining
              ? `${currentValve.myPath}-${myValveName}(${myMinutesRemaining})`
              : currentValve.myPath,
            myMinutesRemaining,
            elephantsLocation: elephantsMinutesRemaining
              ? elephantsValveName
              : currentValve.elephantsLocation,
            elephantsPath: elephantsMinutesRemaining
              ? `${currentValve.elephantsPath}-${elephantsValveName}(${elephantsMinutesRemaining})`
              : currentValve.elephantsPath,
            elephantsMinutesRemaining,
            remainingValves: currentValve.remainingValves.filter(
              (v) => v !== myValveName && v !== elephantsValveName,
            ),
            pressure:
              currentValve.pressure +
              myMinutesRemaining * allValves[myValveName].rate +
              elephantsMinutesRemaining * allValves[elephantsValveName].rate,
          };
        });
    });

    const unfinished = [];
    paths.forEach((p) => {
      if (
        !p.remainingValves.length ||
        (p.myMinutesRemaining <= 0 && p.elephantsMinutesRemaining <= 0)
      ) {
        maxPressure = Math.max(maxPressure, p.pressure);
      } else {
        unfinished.push(p);
      }
    });

    open.push(...unfinished);
    open = open.sort((a, b) => b.pressure - a.pressure);
  }

  return maxPressure;
};

const maxPressure = outerSearch();
console.log(maxPressure);
