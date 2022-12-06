const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const relations = rawInput
  .split('\n')
  .filter((r) => !!r)
  .map((relation) => {
    const parts = relation.replace('.', '').split(' ');
    return {
      from: parts[0],
      to: parts[10],
      change: Number(parts[3]) * (parts[2] === 'lose' ? -1 : 1),
    };
  });

const guests = _.uniq(relations.flatMap((r) => [r.from, r.to]));
guests.forEach((guest) =>
  relations.push(
    { from: 'Me', to: guest, change: 0 },
    { from: guest, to: 'Me', change: 0 },
  ),
);
guests.push('Me');

function getPermutations(guests) {
  if (guests.length < 2) {
    return [guests];
  }

  return guests.flatMap((el, i) => {
    const restOfGuests = [...guests];
    restOfGuests.splice(i, 1);

    const permutations = getPermutations(restOfGuests);

    return permutations.map((permutation) => [el, ...permutation]);
  });
}

const sittingArrangements = getPermutations(guests).map((sa) => [...sa, sa[0]]);

const changes = sittingArrangements.map((sittingArrangement) => {
  return sittingArrangement.reduce((change, __, index) => {
    if (index >= sittingArrangement.length - 1) {
      return change;
    }

    const person1 = sittingArrangement[index];
    const person2 = sittingArrangement[index + 1];

    const change1to2 = relations.find(
      (r) => r.from === person1 && r.to === person2,
    ).change;
    const change2to1 = relations.find(
      (r) => r.from === person2 && r.to === person1,
    ).change;

    return change + change1to2 + change2to1;
  }, 0);
});

const maxChange = _.max(changes);

console.log(maxChange);
