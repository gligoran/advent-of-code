const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function convert(rule, rules) {
  if (typeof rule === 'string') {
    const parts = rule.split(' ');

    if (parts.length === 1) {
      if (RegExp('^[a-z]+$').test(rule)) {
        return rule;
      }

      return convert(rules[rule], rules);
    }

    return parts.map((subRule) => convert(subRule, rules)).join('');
  }

  if (rule.length === 1) {
    return convert(rule[0], rules);
  }

  return `(${rule.map((subRule) => convert(subRule, rules)).join('|')})`;
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

  let rule0 = `^${convert(rules[0], rules)}$`;
  const matches = messages.filter((m) => RegExp(rule0).test(m)).length;

  console.log({ matches });
}

main(rawInput);
