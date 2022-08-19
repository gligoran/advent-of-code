const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const lights = Array.from(Array(1000).keys()).map(() =>
  Array.from(Array(1000).keys()).map(() => 0),
);

const rows = rawInput
  .replaceAll('turn o', 'turnO')
  .split('\n')
  .filter((row) => !!row);

const commands = rows.map((row) => {
  const [command, startAt, , endAt] = row.split(' ');
  const [startX, startY] = startAt.split(',');
  const [endX, endY] = endAt.split(',');

  return {
    command,
    startX: Number(startX),
    startY: Number(startY),
    endX: Number(endX),
    endY: Number(endY),
  };
});

commands.forEach(({ command, startX, startY, endX, endY }) => {
  for (let x = startX; x <= endX; x += 1) {
    for (let y = startY; y <= endY; y += 1) {
      switch (command) {
        case 'turnOn':
          lights[x][y] = 1;
          break;
        case 'turnOff':
          lights[x][y] = 0;
          break;
        case 'toggle':
          lights[x][y] = (lights[x][y] + 1) % 2;
          break;
      }
    }
  }
});

const lightCount = lights
  .map((row) => row.filter((light) => !!light).length)
  .reduce((sum, count) => sum + count, 0);

console.log(lightCount);
