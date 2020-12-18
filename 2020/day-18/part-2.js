const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function evaluate(expression) {
  if (expression[0] === '(') {
    let level = 1;
    for (let i = 1; i < expression.length; i++) {
      if (expression[i] === '(') {
        level += 1;
      }

      if (expression[i] === ')') {
        level -= 1;

        if (level === 0) {
          const innerExpression = [...expression].slice(1, i).join('');
          const newExpression = [...expression];
          newExpression
            .splice(0, innerExpression.length + 2, evaluate(innerExpression))
            .join('');
          expression = newExpression.join('');
          break;
        }
      }
    }
  }

  let [left, operator, ...right] = expression.split(' ');
  if (!operator) {
    return Number(left);
  }

  right = right.join(' ');

  if (operator === '*') {
    right = `${evaluate(right)}`;
  }

  let rest;
  if (right.startsWith('(')) {
    let level = 1;
    for (let i = 1; i < right.length; i++) {
      if (right[i] === '(') {
        level += 1;
      }

      if (right[i] === ')') {
        level -= 1;

        if (level === 0) {
          rest = [...right].slice(i + 1).join('');
          right = [...right].slice(1, i).join('');
          break;
        }
      }
    }

    right = evaluate(right);
  } else {
    const parts = right.split(' ');
    right = parts.shift();
    rest = parts.join(' ');
  }
  if (rest.startsWith(' ')) {
    rest = [...rest].slice(1).join('');
  }

  const leftExpression = [left, operator, right].join(' ');
  let result = eval(leftExpression);

  if (rest && rest.length) {
    result = evaluate([result, rest].join(' '));
  }
  return result;
}

function main(input) {
  const expressions = input.split('\n').filter((l) => !!l);

  const sum = expressions.reduce((s, e) => s + evaluate(e), 0);

  console.log({ sum });
}

main(rawInput);
