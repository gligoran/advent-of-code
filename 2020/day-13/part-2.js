const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input, initialTimestamp) {
  const busIdList = input.split('\n')[1];

  let buses = busIdList
    .split(',')
    .map((id) => Number(id))
    .map((id, i) => ({ id, offset: i }))
    .filter(({ id }) => id > 0);

  const firstBus = buses.shift();
  let fq = firstBus.id;
  let earliestTimestamp = Math.ceil(initialTimestamp / fq) * fq;
  while (true) {
    const buses0 = buses.filter(
      ({ id, offset }) => (earliestTimestamp + offset) % id === 0,
    );

    buses0.forEach((bus) => (fq *= bus.id));

    buses = buses.filter((bus) => !buses0.find((b) => b.id === bus.id));

    if (buses.length === 0) {
      break;
    }
    earliestTimestamp += fq;
  }

  console.log({ earliestTimestamp });
}

main(rawInput, 100000000000000);
