const _ = require('lodash');

let password = 'cqjxxyzz';

const incrementChar = (c) => {
  if (c === 'z') {
    return 'a';
  }

  const charCode = c.charCodeAt(0);
  return String.fromCharCode(charCode + 1);
};

const incrementPassword = (p) => {
  if (!p.length) {
    return p;
  }

  let chars = [...p];
  let char = chars.pop();
  char = incrementChar(char);

  if (char === 'a') {
    chars = incrementPassword(chars.join(''));
  }

  return [...chars, char].join('');
};

const isValidPassword = (p) => {
  if (p.includes('i') || p.includes('l') || p.includes('o')) {
    return false;
  }

  const matches = _.uniq(p.match(/(\w)\1{1}/g));
  if (matches.length < 2) {
    return false;
  }

  const charCodes = [...p].map((c) => c.charCodeAt(0));
  return charCodes.some(
    (cc, i) =>
      i < charCodes.length - 2 &&
      cc === charCodes[i + 1] - 1 &&
      cc === charCodes[i + 2] - 2,
  );
};

do {
  password = incrementPassword(password);
} while (!isValidPassword(password));

console.log(password);
