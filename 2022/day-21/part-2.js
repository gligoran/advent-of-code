const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let leftMonkey;
let rightMonkey;
const monkeys = rawInput
  .split('\n')
  .filter((m) => !!m)
  .map((m) => {
    let [name, value] = m.split(': ');

    if (name === 'humn') {
      return null;
    }

    if (name === 'root') {
      [leftMonkey, _, rightMonkey] = value.split(' ');
      return null;
    }

    return { name, value };
  })
  .filter((m) => !!m);

const numberYellingMonekys = {};
const dependesOnHumn = {
  humn: null,
};

while (monkeys.length) {
  const monkey = monkeys.shift();

  if (!Number.isNaN(Number(monkey.value))) {
    numberYellingMonekys[monkey.name] = Number(monkey.value);
    continue;
  }

  const [monkey1, _, monkey2] = monkey.value.split(' ');
  if (
    dependesOnHumn[monkey1] !== undefined ||
    dependesOnHumn[monkey2] !== undefined
  ) {
    dependesOnHumn[monkey.name] = monkey.value;
    continue;
  }

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

delete dependesOnHumn.humn;

const oppositeOperators = {
  '-': '+',
  '+': '-',
  '*': '/',
  '/': '*',
};

let newMonkey;
if (numberYellingMonekys[leftMonkey] !== undefined) {
  numberYellingMonekys[rightMonkey] = numberYellingMonekys[leftMonkey];
  newMonkey = rightMonkey;
} else {
  numberYellingMonekys[leftMonkey] = numberYellingMonekys[rightMonkey];
  newMonkey = leftMonkey;
}

while (Object.keys(dependesOnHumn).length) {
  const value = dependesOnHumn[newMonkey];
  delete dependesOnHumn[newMonkey];

  const [monkey1, operator, monkey2] = value.split(' ');

  if (!numberYellingMonekys[monkey1]) {
    numberYellingMonekys[monkey1] = eval(
      `${numberYellingMonekys[newMonkey]} ${oppositeOperators[operator]} ${numberYellingMonekys[monkey2]}`,
    );

    newMonkey = monkey1;
  } else {
    if (operator === '-') {
      numberYellingMonekys[monkey2] = eval(
        `${numberYellingMonekys[monkey1]} ${operator} ${numberYellingMonekys[newMonkey]}`,
      );
    } else {
      numberYellingMonekys[monkey2] = eval(
        `${numberYellingMonekys[newMonkey]} ${oppositeOperators[operator]} ${numberYellingMonekys[monkey1]}`,
      );
    }

    newMonkey = monkey2;
  }
}

const humn = numberYellingMonekys.humn;
console.log(humn);
