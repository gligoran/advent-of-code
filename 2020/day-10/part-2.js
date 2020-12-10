const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const adapters = [
    0,
    ...input
      .split('\n')
      .filter((l) => !!l)
      .map(Number)
      .sort((a, b) => a - b),
  ];

  const max = adapters[adapters.length - 1] + 3;

  const options = Object.fromEntries(
    adapters.map((a) => {
      const maxNext = a + 3;

      if (maxNext === max) {
        return [a, [max]];
      }

      const opts = adapters.filter((i) => i > a && i <= a + 3);
      return [a, opts];
    }),
  );

  const pathsPerAdapter = Object.fromEntries(adapters.map((a) => [a, -1]));

  adapters
    .sort((a, b) => b - a)
    .forEach((a) => {
      const connections = options[a];

      const sum = connections
        .map((c) => pathsPerAdapter[c] || 1)
        .reduce((acc, c) => acc + c);

      pathsPerAdapter[a] = sum;
    }, 0);

  console.log({ paths: pathsPerAdapter[0] });
}

main(rawInput);
