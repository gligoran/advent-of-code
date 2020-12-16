const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  let [rules, yourTicket, nearbyTickets] = input.split('\n\n');

  rules = rules.split('\n').map((rule) => {
    const [name, values] = rule.split(': ');

    const ranges = values
      .split(' or ')
      .map((ruleSet) => ruleSet.split('-').map(Number));

    return { name, ranges, positions: [] };
  });

  nearbyTickets = nearbyTickets
    .split('\n')
    .filter((l) => !!l)
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number));

  const validNearbyTickets = nearbyTickets.filter((ticket) =>
    ticket.every((value) =>
      rules.some((rule) =>
        rule.ranges.some((range) => value >= range[0] && value <= range[1]),
      ),
    ),
  );

  rules.forEach((rule) => {
    for (let i = 0; i < validNearbyTickets[0].length; i++) {
      const isRule = validNearbyTickets.every((ticket) =>
        rule.ranges.some(
          (range) => ticket[i] >= range[0] && ticket[i] <= range[1],
        ),
      );

      if (isRule) {
        rule.positions.push(i);
      }
    }
  });

  let maxLength = rules.reduce(
    (m, r) => (m > r.positions.length ? m : r.positions.length),
    0,
  );

  while (maxLength > 1) {
    const singles = rules
      .filter((r) => r.positions.length === 1)
      .map((r) => r.positions[0]);

    maxLength = rules
      .filter((r) => r.positions.length > 1)
      .reduce((m, r) => {
        r.positions = r.positions.filter((p) => !singles.includes(p));

        return m > r.positions.length ? m : r.positions.length;
      }, 0);
  }

  rules = rules.map(({ name, positions }) => ({
    name,
    position: positions[0],
  }));

  yourTicket = yourTicket
    .split('\n')
    .filter((l) => !!l)
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number))[0];

  const product = rules.reduce(
    (p, rule) =>
      rule.name.startsWith('departure') ? p * yourTicket[rule.position] : p,
    1,
  );

  console.log({ product });
}

main(rawInput);
