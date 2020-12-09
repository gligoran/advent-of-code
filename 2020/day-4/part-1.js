const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const passports = input.split(`\n\n`).map((parts) =>
    parts
      .split('\n')
      .filter((l) => !!l)
      .join(' '),
  );

  const requriedField = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    // 'cid',
  ];

  const validPassports = passports.filter((passport) =>
    requriedField.every((rf) => passport.includes(`${rf}:`)),
  );

  console.log({ validPassports: validPassports.length });
}

main(rawInput);
