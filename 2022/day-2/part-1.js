const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const opponentMoves = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const myMoves = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
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
    myMove: myMoves[me],
  }));

const scores = rounds.map(({ opponentMove, myMove }) => {
  let resultScore = 0;
  if (opponentMove === myMove) {
    resultScore = 3;
  } else if (
    (opponentMove === 'Rock' && myMove === 'Paper') ||
    (opponentMove === 'Scissors' && myMove === 'Rock') ||
    (opponentMove === 'Paper' && myMove === 'Scissors')
  ) {
    resultScore = 6;
  }

  return resultScore + moveScores[myMove];
});

const totalScore = scores.reduce((total, roundScore) => total + roundScore, 0);

console.log(totalScore);
