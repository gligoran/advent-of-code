const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const players = input
    .split('\n\n')
    .filter((l) => !!l)
    .map((p) => {
      const [playerName, ...cards] = p.split('\n').filter((l) => !!l);
      return cards.map(Number);
    });

  while (players.every((p) => p.length > 0)) {
    const cards = players.map((p) => p.shift());

    const roundWinner = cards[0] > cards[1] ? 0 : 1;
    players[roundWinner].push(
      cards[(0 + roundWinner) % 2],
      cards[(1 + roundWinner) % 2],
    );
  }

  const winner = players.filter((p) => p.length)[0];
  const score = winner.reverse().reduce((s, c, i) => s + c * (i + 1), 0);

  console.log({ score });
}

main(rawInput);
