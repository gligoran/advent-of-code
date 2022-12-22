const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

const cubes = rawInput
  .split('\n')
  .filter((l) => !!l)
  .map((line) => line.split(',').map(Number))
  .map(([x, y, z]) => ({ x, y, z }));

const xs = cubes.map(({ x }) => x);
const ys = cubes.map(({ y }) => y);
const zs = cubes.map(({ z }) => z);

const minX = Math.min(...xs) - 1;
const maxX = Math.max(...xs) + 1;
const minY = Math.min(...ys) - 1;
const maxY = Math.max(...ys) + 1;
const minZ = Math.min(...zs) - 1;
const maxZ = Math.max(...zs) + 1;

const steamCubes = [];
const openSteamCubes = [{ x: minX, y: minY, z: minZ }];
let outsideSides = 0;
while (openSteamCubes.length) {
  const steamCube = openSteamCubes.shift();
  steamCubes.push(steamCube);

  let newSteamCubes = [];

  if (steamCube.z > minZ) {
    newSteamCubes.push({
      x: steamCube.x,
      y: steamCube.y,
      z: steamCube.z - 1,
    });
  }
  if (steamCube.z < maxZ) {
    newSteamCubes.push({
      x: steamCube.x,
      y: steamCube.y,
      z: steamCube.z + 1,
    });
  }
  if (steamCube.y > minY) {
    newSteamCubes.push({
      x: steamCube.x,
      y: steamCube.y - 1,
      z: steamCube.z,
    });
  }
  if (steamCube.y < maxY) {
    newSteamCubes.push({
      x: steamCube.x,
      y: steamCube.y + 1,
      z: steamCube.z,
    });
  }
  if (steamCube.x > minX) {
    newSteamCubes.push({
      x: steamCube.x - 1,
      y: steamCube.y,
      z: steamCube.z,
    });
  }
  if (steamCube.x < maxX) {
    newSteamCubes.push({
      x: steamCube.x + 1,
      y: steamCube.y,
      z: steamCube.z,
    });
  }

  newSteamCubes = newSteamCubes.filter(
    (nsc) =>
      !openSteamCubes.find(
        (opsc) => nsc.x === opsc.x && nsc.y === opsc.y && nsc.z === opsc.z,
      ) &&
      !steamCubes.find(
        (sc) => nsc.x === sc.x && nsc.y === sc.y && nsc.z === sc.z,
      ),
  );

  outsideSides += newSteamCubes.length;

  newSteamCubes = newSteamCubes.filter(
    (nsc) =>
      !cubes.find((c) => nsc.x === c.x && nsc.y === c.y && nsc.z === c.z),
  );

  outsideSides -= newSteamCubes.length;

  openSteamCubes.push(...newSteamCubes);
}

console.log(outsideSides);
