const fs = require('fs');

const rawInput = fs.readFileSync('./input-2.txt', { encoding: 'utf-8' });

function convert(rule, rules, depth, maxDepth) {
  if (depth >= maxDepth) {
    if (typeof rule === 'string') {
      if (RegExp('^[a-z]+$').test(rule)) {
        return rule;
      }

      return `(${rule})`;
    }

    return rule.join('');
  }

  if (typeof rule === 'string') {
    const parts = rule.split(' ');

    if (parts.length === 1) {
      if (RegExp('^[a-z]+$').test(rule)) {
        return rule;
      }

      return convert(rules[rule], rules, depth + 1, maxDepth);
    }
    return parts
      .map((subRule) => convert(subRule, rules, depth + 1, maxDepth))
      .join('');
  }

  if (rule.length === 1) {
    return convert(rule[0], rules, depth + 1, maxDepth);
  }

  return `(${rule
    .map((subRule) => convert(subRule, rules, depth + 1, maxDepth))
    .join('|')})`;
}

function main(input) {
  let [rules, messages] = input
    .split('\n\n')
    .filter((l) => !!l)
    .map((l) => l.split('\n').filter((i) => !!i));

  rules = Object.fromEntries(
    rules.map((r) => {
      const [id, value] = r.split(': ');

      const rule = value.replaceAll('"', '').split(' | ');

      return [id, rule];
    }),
  );

  const maxDepth = messages.reduce(
    (max, m) => (m.length > max ? m.length : max),
    0,
  );

  const rule0 = `^${convert(rules[0], rules, 0, maxDepth)}$`;
  const matches = messages.filter((m) => RegExp(rule0).test(m)).length;

  console.log({ matches });
}

main(rawInput);
