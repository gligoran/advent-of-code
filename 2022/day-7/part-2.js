const fs = require('fs');
const _ = require('lodash');

const TOTAL_DISK_SIZE = 70_000_000;
const UPDATE_SIZE = 30_000_000;

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
          filename: `${currentDir}${parts[1]}`,
          size: Number(parts[0]),
        });
      }
    }
  }
}

directories = _.uniq(directories);

const dirSizes = directories.map((dirName) => ({
  dirName: dirName,
  size: files
    .filter(({ filename }) => filename.startsWith(dirName))
    .reduce((total, { size }) => total + size, 0),
}));

const usedSpace = dirSizes.find((dir) => dir.dirName === '/').size;
const spaceNeeded = UPDATE_SIZE - (TOTAL_DISK_SIZE - usedSpace);
const deletableDirs = dirSizes.filter((dir) => dir.size >= spaceNeeded);
deletableDirs.sort((a, b) => a.size - b.size);
const dirToDelete = deletableDirs[0];

console.log(dirToDelete.size);
