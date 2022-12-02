const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const opponentMoves = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const roundResult = {
  X: 0,
  Y: 3,
  Z: 6,
};

const moveScores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const rounds = rawInput
  .split('\n')
  .filter((r) => !!r)
  .map((r) => r.split(' '))
  .map(([opponent, me]) => ({
    opponentMove: opponentMoves[opponent],
    result: roundResult[me],
  }))
  .map((round) => {
    if (round.result === roundResult.Y) {
      return { ...round, myMove: round.opponentMove };
    }

    if (round.result === roundResult.X) {
      if (round.opponentMove === 'Rock') {
        return { ...round, myMove: 'Scissors' };
      }

      if (round.opponentMove === 'Paper') {
        return { ...round, myMove: 'Rock' };
      }

      return { ...round, myMove: 'Paper' };
    }

    if (round.opponentMove === 'Rock') {
      return { ...round, myMove: 'Paper' };
    }

    if (round.opponentMove === 'Paper') {
      return { ...round, myMove: 'Scissors' };
    }

    return { ...round, myMove: 'Rock' };
  });

const scores = rounds.map(({ result, myMove }) => {
  return result + moveScores[myMove];
});

const totalScore = scores.reduce((total, roundScore) => total + roundScore, 0);

console.log(totalScore);
