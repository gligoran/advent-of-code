const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const [earliestDepartureTime, busIdList] = input
    .split('\n')
    .map((p, i) => (i === 0 ? Number(p) : p));

  const busIds = busIdList
    .split(',')
    .map((id) => Number(id))
    .filter((id) => id > 0);

  const nextDepartureTimes = busIds
    .map((id) => ({
      id,
      nextDepartureTime: Math.ceil(earliestDepartureTime / id) * id,
    }))
    .sort((a, b) => a.nextDepartureTime - b.nextDepartureTime);

  console.log({
    product:
      nextDepartureTimes[0].id *
      (nextDepartureTimes[0].nextDepartureTime - earliestDepartureTime),
  });
}

main(rawInput);
