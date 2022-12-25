const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const monkeys = rawInput
  .split('\n')
  .filter((m) => !!m)
  .map((m) => {
    const [name, value] = m.split(': ');

    return { name, value };
  });

const numberYellingMonekys = {};

while (numberYellingMonekys.root === undefined) {
  const monkey = monkeys.shift();

  if (!Number.isNaN(Number(monkey.value))) {
    numberYellingMonekys[monkey.name] = Number(monkey.value);
    continue;
  }

  const [monkey1, _, monkey2] = monkey.value.split(' ');
  if (
    numberYellingMonekys[monkey1] !== undefined &&
    numberYellingMonekys[monkey2] !== undefined
  ) {
    numberYellingMonekys[monkey.name] = eval(
      monkey.value
        .replace(monkey1, numberYellingMonekys[monkey1])
        .replace(monkey2, numberYellingMonekys[monkey2]),
    );
    continue;
  }

  monkeys.push(monkey);
}

const root = numberYellingMonekys.root;
console.log(root);
