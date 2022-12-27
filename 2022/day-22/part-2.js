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
  const [x, y] = position;
  let [nextX, nextY] = position;
  let nextDirection = direction;

  let start = null;
  let end = null;

  switch (nextDirection) {
    case '>':
    case '<': {
      const line = [...mapRows[nextY]];
      start = line.lastIndexOf(' ') + 1;
      end = line.length - 1;
      break;
    }
    case '^':
    case 'v': {
      for (let i = 0; i < mapRows.length; i += 1) {
        if (start === null && mapRows[i][nextX] !== ' ') {
          start = i;
        }

        if (mapRows[i][nextX] === '.' || mapRows[i][nextX] === '#') {
          end = i;
        }
      }
      break;
    }
  }

  switch (nextDirection) {
    case '>': {
      nextX = nextX + 1;
      if (nextX > end) {
        if (y < 50) {
          // 2'' => 4' ✅
          nextX = 99;
          nextY = 149 - y;
          nextDirection = '<';
        } else if (y < 100) {
          // 3' => 2''' ✅
          nextX = y + 50;
          nextY = 49;
          nextDirection = '^';
        } else if (y < 150) {
          // 4' => 2'' ✅
          nextX = 149;
          nextY = 149 - y;
          nextDirection = '<';
        } else {
          // 6' => 4'' ✅
          nextX = y - 100;
          nextY = 149;
          nextDirection = '^';
        }
      }

      break;
    }
    case '<': {
      nextX = nextX - 1;
      if (nextX < start) {
        if (y < 50) {
          // 1'' => 5'' ✅
          nextX = 0;
          nextY = 149 - y;
          nextDirection = '>';
        } else if (y < 100) {
          // 3'' => 5' ✅
          nextX = y - 50;
          nextY = 100;
          nextDirection = 'v';
        } else if (y < 150) {
          // 5'' => 1'' ✅
          nextX = 50;
          nextY = 149 - y;
          nextDirection = '>';
        } else {
          // 6''' => 1' ✅
          nextX = y - 100;
          nextY = 0;
          nextDirection = 'v';
        }
      }

      break;
    }
    case 'v': {
      nextY = nextY + 1;
      if (nextY > end) {
        if (x < 50) {
          // 6'' => 2' ✅
          nextX = x + 100;
          nextY = 0;
          nextDirection = 'v';
        } else if (x < 100) {
          // 4'' => 6' ✅
          nextX = 49;
          nextY = x + 100;
          nextDirection = '<';
        } else {
          // 2''' => 3' ✅
          nextX = 99;
          nextY = x - 50;
          nextDirection = '<';
        }
      }

      break;
    }
    case '^': {
      nextY = nextY - 1;
      if (nextY < start) {
        if (x < 50) {
          // 5' => 3'' ✅
          nextX = 50;
          nextY = x + 50;
          nextDirection = '>';
        } else if (x < 100) {
          // 1' => 6''' ✅
          nextX = 0;
          nextY = x + 100;
          nextDirection = '>';
        } else {
          // 2' => 6'' ✅
          nextX = x - 100;
          nextY = 199;
          nextDirection = '^';
        }
      }
      break;
    }
  }

  return { nextX, nextY, nextDirection };
};

const isWall = (position) => {
  const [x, y] = position;

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
    const newPrintedMapRow = [...printedMapRows[position[1]]];
    newPrintedMapRow.splice(position[0], 1, direction);
    printedMapRows[position[1]] = newPrintedMapRow.join('');

    const { nextX, nextY, nextDirection } = getNextPosition();
    if (isWall([nextX, nextY])) {
      hitWall = true;
      break;
    }

    position = [nextX, nextY];
    direction = nextDirection;
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
