const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const sueCompounds = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const aunts = rawInput
  .split('\n')
  .filter((i) => !!i)
  .map((aunt) => {
    const [left, ...right] = aunt.split(': ');

    const name = parseInt(left.split(' ')[1]);

    const compounds = Object.fromEntries(
      right
        .join(': ')
        .split(', ')
        .map((prop) => {
          const [l, r] = prop.split(': ');
          return [l, Number(r)];
        }),
    );

    return { name, compounds };
  });

const potentialAunts = aunts.filter((aunt) => {
  return Object.entries(aunt.compounds).every(([compound, qty]) => {
    if (compound === 'cats' || compound === 'trees') {
      return sueCompounds[compound] < qty;
    }

    if (compound === 'pomeranians' || compound === 'goldfish') {
      return sueCompounds[compound] > qty;
    }

    return sueCompounds[compound] === qty;
  });
});

const auntSue = potentialAunts[0].name;
console.log(auntSue);
