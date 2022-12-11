const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const monkeys = rawInput.split('\n\n').map((monkey) => {
  const lines = monkey
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => !!l);

  const id = parseInt(lines[0].split(' ')[1], 10);
  const items = lines[1].split(': ')[1].split(', ').map(Number);
  const operation = lines[2].split(`: `)[1].replace('new = ', '');
  const divisor = Number(lines[3].split(': ')[1].split(' by ')[1]);
  const pass = {
    [true]: Number(lines[4].split(' ')[5]),
    [false]: Number(lines[5].split(' ')[5]),
  };

  return { id, items, operation, divisor, pass, inspections: 0 };
});

const lcm = monkeys.map((m) => m.divisor).reduce((m, d) => m * d, 1);

for (let round = 1; round <= 10_000; round += 1) {
  monkeys.forEach((monkey) => {
    let item;
    while ((item = monkey.items.shift())) {
      monkey.inspections += 1;

      const op = monkey.operation.replaceAll('old', item);
      const newItem = eval(op) % lcm;

      const throwTo = monkey.pass[newItem % monkey.divisor === 0];

      monkeys[throwTo].items.push(newItem);
    }
  });
}

const inspections = monkeys
  .map((monkey) => monkey.inspections)
  .sort((a, b) => b - a);

const monkeyBusiness = inspections[0] * inspections[1];
console.log(monkeyBusiness);
