const fs = require('fs');
const { cloneDeep, isEqual } = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function playGame(players, depth) {
  const previousRounds = [];

  while (players.every((p) => p.length > 0)) {
    if (previousRounds.some((pr) => isEqual(pr, players))) {
      return 0;
    }

    previousRounds.push(cloneDeep(players));

    const cards = players.map((p) => p.shift());
    let winner;
    if (players.every((p, i) => cards[i] <= p.length)) {
      const newPlayers = players.map((p, i) => p.slice(0, cards[i]));
      winner = playGame(newPlayers, depth + 1);
    } else {
      winner = cards[0] > cards[1] ? 0 : 1;
    }

    players[winner].push(cards[(0 + winner) % 2], cards[(1 + winner) % 2]);
  }

  return players[0].length ? 0 : 1;
}

function main(input) {
  const players = input
    .split('\n\n')
    .filter((l) => !!l)
    .map((p) => {
      const [playerName, ...cards] = p.split('\n').filter((l) => !!l);
      return cards.map(Number);
    });

  const winner = players[playGame(players, 0)];
  const score = winner.reverse().reduce((s, c, i) => s + c * (i + 1), 0);

  console.log({ score });
}

main(rawInput);
