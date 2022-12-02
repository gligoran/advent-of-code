const input = '3113322113';

const repetitions = 40;

const lookAndSay = (sequence) => {
  let newSequence = '';

  while (sequence.length) {
    const digit = sequence[0];
    const regex = new RegExp(`^[${digit}]+`);
    const match = sequence.match(regex)[0];

    newSequence += `${match.length}${digit}`;

    sequence = sequence.replace(match, '');
  }

  return newSequence;
};

let currentSequence = input;
for (let i = 0; i < repetitions; i += 1) {
  currentSequence = lookAndSay(currentSequence);
}

console.log(currentSequence.length);
