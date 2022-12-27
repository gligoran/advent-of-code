const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });
const [rawMap, rawPath] = rawInput.split('\n\n');

const mapRows = rawMap.split('\n');
const printedMapRows = [...mapRows];

let path = rawPath
  .split('\n')[0]
  .replaceAll('R', ' R ')
  .replaceAll('L', ' L ')
  .split(' ')
  .map((el) => (Number.isNaN(Number(el)) ? el : Number(el)));

let position = [[...mapRows[0]].lastIndexOf(' ') + 1, 0];
let direction = '>';

const turnRight = () => {
  switch (direction) {
    case '>':
      return 'v';
    case 'v':
      return '<';
    case '<':
      return '^';
    case '^':
      return '>';
  }
};

const turnLeft = () => {
  switch (direction) {
    case '>':
      return '^';
    case '^':
      return '<';
    case '<':
      return 'v';
    case 'v':
      return '>';
  }
};

const getNextPosition = () => {
  let x = position[0];
  let y = position[1];

  let start = null;
  let end = null;

  switch (direction) {
    case '>':
    case '<': {
      start = [...mapRows[y]].lastIndexOf(' ') + 1;
      end = mapRows[y].length - 1;
      break;
    }
    case '^':
    case 'v': {
      for (let i = 0; i < mapRows.length; i += 1) {
        if (start === null && mapRows[i][x] !== ' ') {
          start = i;
        }

        if (mapRows[i][x] === '.' || mapRows[i][x] === '#') {
          end = i;
        }
      }
      break;
    }
  }

  switch (direction) {
    case '>': {
      let newX = x + 1;
      if (newX > end) {
        newX = start;
      }

      return [newX, y];
    }
    case '<': {
      let newX = x - 1;
      if (newX < start) {
        newX = end;
      }

      return [newX, y];
    }
    case 'v': {
      let newY = y + 1;
      if (newY > end) {
        newY = start;
      }

      return [x, newY];
    }
    case '^': {
      let newY = y - 1;
      if (newY < start) {
        newY = end;
      }

      return [x, newY];
    }
  }
};

const isWall = (position) => {
  const x = position[0];
  const y = position[1];

  const line = mapRows[y];
  return line[x] === '#';
};

while (path.length) {
  const move = path.shift();

  if (move === 'R') {
    direction = turnRight();
    continue;
  }

  if (move === 'L') {
    direction = turnLeft();
    continue;
  }

  let hitWall = false;
  for (let step = 0; step < move && !hitWall; step += 1) {
    let x = position[0];
    let y = position[1];

    const newPrintedMapRow = [...printedMapRows[y]];
    newPrintedMapRow.splice(x, 1, direction);
    printedMapRows[y] = newPrintedMapRow.join('');

    const [nextX, nextY] = getNextPosition();

    if (isWall([nextX, nextY])) {
      hitWall = true;
      break;
    }

    position = [nextX, nextY];
  }
}

const row = position[1] + 1;
const col = position[0] + 1;
const dir = () => {
  switch (direction) {
    case '>':
      return 0;
    case 'v':
      return 1;
    case '<':
      return 2;
    case '^':
      return 3;
  }
};

const newPrintedMapRow = [...printedMapRows[position[1]]];
newPrintedMapRow.splice(position[0], 1, direction);
printedMapRows[position[1]] = newPrintedMapRow.join('');

printedMapRows.forEach((row) => console.log(row));

const password = row * 1000 + col * 4 + dir();
console.log(password);
