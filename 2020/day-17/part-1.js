const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  let minZ = 0;
  let maxZ = 0;

  let space = input
    .split('\n')
    .filter((l) => !!l)
    .flatMap((l, y) =>
      l.split('').map((c, x) => ({ x, y, z: 0, active: c === '#' })),
    )
    .reduce((s, c) => {
      if (c.active) {
        s.push(`x${c.x}|y${c.y}|z${c.z}`);
      }

      if (c.x > maxX) {
        maxX = c.x;
      }
      if (c.y > maxY) {
        maxY = c.y;
      }

      return s;
    }, []);

  for (let cycle = 0; cycle < 6; cycle++) {
    const newSpace = [...space];

    minX -= 1;
    maxX += 1;
    minY -= 1;
    maxY += 1;
    minZ -= 1;
    maxZ += 1;

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          const currentCubeId = `x${x}|y${y}|z${z}`;
          let activeCount = 0;

          outloop: for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dy === 0 && dz === 0) {
                  continue;
                }

                const cx = x + dx;
                const cy = y + dy;
                const cz = z + dz;

                const neighborsCubeId = `x${cx}|y${cy}|z${cz}`;
                if (space.includes(neighborsCubeId)) {
                  activeCount++;
                }
              }
            }
          }

          if (space.includes(currentCubeId)) {
            if (activeCount < 2 || activeCount > 3) {
              delete newSpace.splice(newSpace.indexOf(currentCubeId), 1);
            }
          } else if (activeCount === 3) {
            newSpace.push(currentCubeId);
          }
        }
      }
    }

    space = newSpace;
  }

  console.log({ activeCube: space.length });
}

main(rawInput);
