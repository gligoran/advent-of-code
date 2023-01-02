const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const PROPERTIES = ['capacity', 'durability', 'flavor', 'texture', 'calories'];

const ingredients = rawInput
  .split('\n')
  .filter((i) => !!i)
  .map((i) => {
    const [name, rawProperties] = i.split(': ');

    const properties = rawProperties
      .split(' ')
      .reduce((pairs, part, index, props) => {
        if (index % 2 === 1) {
          pairs[props[index - 1]] = parseInt(part, 10);
        }

        return pairs;
      }, {});

    return { name, ...properties };
  });

const generateTablespoons = (count, max) => {
  if (count <= 1) {
    return [[max]];
  }

  return new Array(max + 1)
    .fill(null)
    .map((_, index) => index)
    .flatMap((t) =>
      generateTablespoons(count - 1, max - t).map((i) => [...i, t]),
    );
};

const tablespoons = generateTablespoons(ingredients.length, 100);

const scores = tablespoons.map((quantities) => {
  return PROPERTIES.reduce((score, property) => {
    const total = quantities.reduce(
      (sum, qunatity, quantityIndex) =>
        sum + ingredients[quantityIndex][property] * qunatity,
      0,
    );

    if (total < 0) {
      return 0;
    }

    if (property === 'calories') {
      if (total !== 500) {
        return 0;
      } else {
        return score;
      }
    }

    return score * total;
  }, 1);
});

scores.sort((a, b) => b - a);
const maxScore = scores[0];

console.log(maxScore);
