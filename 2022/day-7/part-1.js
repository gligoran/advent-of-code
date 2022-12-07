const fs = require('fs');
const _ = require('lodash');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const logLines = rawInput.split('\n').filter((i) => !!i);

const files = [];
let directories = [];
let currentDir = '/';
while (logLines.length) {
  const line = logLines.shift();
  if (line.startsWith('$ cd')) {
    const parts = line.split(' ');
    if (parts[2] === '..') {
      const cdParts = currentDir.split('/');
      cdParts.pop();
      cdParts.pop();
      currentDir = cdParts.join('/') + '/';
    } else if (parts[2] === '/') {
      currentDir = '/';
    } else {
      currentDir += parts[2] + '/';
    }

    directories.push(currentDir);
  }

  if (line === '$ ls') {
    while (logLines.length && !logLines[0].startsWith('$')) {
      const lsLine = logLines.shift();
      if (!lsLine.startsWith('dir')) {
        const parts = lsLine.split(' ');
        files.push({
          name: `${currentDir}${parts[1]}`,
          size: Number(parts[0]),
        });
      }
    }
  }
}

directories = _.uniq(directories);

const dirSizes = directories.map((dir) =>
  files
    .filter(({ name }) => name.startsWith(dir))
    .reduce((total, { size }) => total + size, 0),
);

const sumUnder100k = dirSizes
  .filter((size) => size <= 100_000)
  .reduce((total, size) => total + size);

console.log(sumUnder100k);
