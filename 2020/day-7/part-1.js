const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const rules = input
    .split('\n')
    .filter((l) => !!l)
    .map((r) => r.split(' contain '))
    .map(([container, content]) => [
      container.replace(' bags', ''),
      content
        .split(', ')
        .filter((b) => !b.includes('no other bags'))
        .map((b) => {
          const parts = b.split(' ');
          return [parts[1], parts[2]].join(' ');
        }),
    ]);

  let newBags = ['shiny gold'];
  let containerBags = [];
  while (newBags.length) {
    const currentBags = [...newBags];
    newBags = rules.reduce((nb, [container, content]) => {
      if (currentBags.some((cb) => content.includes(cb))) {
        return [...nb, container];
      }

      return nb;
    }, []);

    containerBags.push(...newBags);
  }

  containerBags = containerBags.filter((b, i, arr) => arr.indexOf(b) === i);
  console.log(containerBags.length);
}

main(rawInput);
