const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const rules = Object.fromEntries(
    input
      .split('\n')
      .filter((l) => !!l)
      .map((r) => r.split(' contain '))
      .map(([container, content]) => [
        container.replace(' bags', ''),
        content
          .split(', ')
          .filter((b) => !b.includes('no other bags'))
          .flatMap((b) => {
            const parts = b.split(' ');
            const length = Number(parts[0]);

            return Array.from({ length }, () => [parts[1], parts[2]].join(' '));
          }),
      ]),
  );

  let newBags = ['shiny gold'];
  let containedBags = [];
  while (newBags.length) {
    newBags = newBags.reduce((bags, nb) => [...bags, ...rules[nb]], []);

    containedBags.push(...newBags);
  }

  console.log(containedBags.length);
}

main(rawInput);
