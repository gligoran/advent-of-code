const fs = require('fs');

const not = (value) => {
  const bits = value.toString(2).slice(-16).padStart(16, '0');

  const invertedBits = [...bits].map((bit) => (bit === '1' ? '0' : '1'));

  return parseInt(invertedBits.join(''), 2);
};

const lshift = (value, n) => {
  const bits = [...value.toString(2).slice(-16).padStart(16, '0')];

  const newBits = [...bits, ...new Array(n).fill(0, 0, n).map(() => '0')];
  newBits.splice(0, n);

  return parseInt(newBits.join(''), 2);
};

const rshift = (value, n) => {
  const bits = [...value.toString(2).slice(-16)];
  bits.splice(-n);

  return parseInt(bits.join(''), 2);
};

const and = (value1, value2) => {
  const bits1 = [...value1.toString(2).slice(-16).padStart(16, '0')];
  const bits2 = [...value2.toString(2).slice(-16).padStart(16, '0')];

  const newBits = [];
  for (let i = 0; i < 16; i += 1) {
    newBits.push(bits1[i] === '1' && bits2[i] === '1' ? '1' : '0');
  }

  return parseInt(newBits.join(''), 2);
};

const or = (value1, value2) => {
  const bits1 = [...value1.toString(2).slice(-16).padStart(16, '0')];
  const bits2 = [...value2.toString(2).slice(-16).padStart(16, '0')];

  const newBits = [];
  for (let i = 0; i < 16; i += 1) {
    newBits.push(bits1[i] === '1' || bits2[i] === '1' ? '1' : '0');
  }

  return parseInt(newBits.join(''), 2);
};

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

let rules = rawInput
  .split('\n')
  .filter((line) => !!line)
  .map((line) => {
    const [left, right] = line.split(' -> ');

    return { left, right };
  });

const values = {};
while (rules.length) {
  const rule = rules.shift();

  const parts = rule.left.split(' ');

  if (parts.length === 1 && rule.left in values) {
    values[rule.right] = values[rule.left];
    continue;
  }

  if (!isNaN(rule.left)) {
    values[rule.right] = Number(rule.left);
    continue;
  }

  if (parts[0] === 'NOT' && parts[1] in values) {
    values[rule.right] = not(values[parts[1]]);
    continue;
  }

  if (parts[1] === 'LSHIFT' && parts[0] in values) {
    values[rule.right] = lshift(values[parts[0]], Number(parts[2]));
    continue;
  }

  if (parts[1] === 'RSHIFT' && parts[0] in values) {
    values[rule.right] = rshift(values[parts[0]], Number(parts[2]));
    continue;
  }

  if (parts[1] === 'AND' && parts[0] in values && parts[2] in values) {
    values[rule.right] = and(values[parts[0]], values[parts[2]]);
    continue;
  }

  if (parts[1] === 'AND' && !isNaN(parts[0]) && parts[2] in values) {
    values[rule.right] = and(Number(parts[0]), values[parts[2]]);
    continue;
  }

  if (parts[1] === 'OR' && parts[0] in values && parts[2] in values) {
    values[rule.right] = or(values[parts[0]], values[parts[2]]);
    continue;
  }

  if ('a' in values) {
    break;
  }

  rules.push(rule);
}

console.log(values.a);
