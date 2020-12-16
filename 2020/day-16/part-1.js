const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  let [rules, yourTicket, nearbyTickets] = input.split('\n\n');

  rules = rules.split('\n').map((rule) => {
    const [name, values] = rule.split(': ');

    const ranges = values
      .split(' or ')
      .map((ruleSet) => ruleSet.split('-').map(Number));

    return { name, ranges };
  });

  nearbyTickets = nearbyTickets
    .split('\n')
    .filter((l) => !!l)
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number));

  let ticketScanningErrorRate = 0;
  nearbyTickets.forEach((ticket) => {
    ticket.forEach((value) => {
      const inRange = rules.some((rule) =>
        rule.ranges.some((range) => value >= range[0] && value <= range[1]),
      );

      if (!inRange) {
        ticketScanningErrorRate += value;
      }
    });
  });

  console.log({ ticketScanningErrorRate });
}

main(rawInput);
