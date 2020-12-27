const fs = require('fs');
const { intersection, difference } = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const foods = input
    .split('\n')
    .filter((l) => !!l)
    .map((food) => {
      let [ingredients, allergenList] = food.split(' (contains ');

      ingredients = ingredients.split(' ').sort();

      if (allergenList) {
        allergenList = allergenList.replace(')', '').split(', ').sort();
      }

      const allergens = allergenList
        ? allergenList.map((a) => ({
            name: a,
            ingredients,
          }))
        : undefined;

      return { allergens };
    });

  const allergens = foods
    .flatMap((f) => f.allergens)
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  let uniqueAllergens = allergens
    .map((a) => a.name)
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .map((ua) => {
      const allgs = allergens.filter((a) => a.name === ua);

      initialIngs = allgs.shift().ingredients;

      const ings = allgs.reduce(
        (ings, a) => intersection(ings, a.ingredients),
        initialIngs,
      );

      return {
        name: ua,
        ingredients: ings,
      };
    });

  do {
    const algsWith1Ing = uniqueAllergens.filter(
      (ua) => ua.ingredients.length === 1,
    );

    if (algsWith1Ing.length === uniqueAllergens.length) {
      break;
    }

    uniqueAllergens = uniqueAllergens.map((ua) => {
      if (algsWith1Ing.filter((a1) => a1.name === ua.name).length === 0) {
        algsWith1Ing.forEach((a1) => {
          ua.ingredients = difference(ua.ingredients, a1.ingredients);
        });
      }

      return ua;
    });
  } while (true);

  const canonicalDangerousIngredientList = uniqueAllergens
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map((ua) => ua.ingredients[0])
    .join(',');

  console.log({ canonicalDangerousIngredientList });
}

main(rawInput);
