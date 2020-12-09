const fs = require('fs');

const rawInput = fs.readFileSync('./input.txt', { encoding: 'utf-8' });

function main(input) {
  const passports = input.split(`\n\n`).map((parts) =>
    parts
      .split('\n')
      .filter((l) => !!l)
      .join(' '),
  );

  const requriedField = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  const validPassports = passports.filter((passport) => {
    if (!requriedField.every((rf) => ` ${passport}`.includes(` ${rf}:`))) {
      return false;
    }

    const fields = passport.split(' ');
    return fields.every((field) => {
      const [key, val] = field.split(':');

      switch (key) {
        case 'byr':
          return Number(val) >= 1920 && Number(val) <= 2002;
        case 'iyr':
          return Number(val) >= 2010 && Number(val) <= 2020;
        case 'eyr':
          return Number(val) >= 2020 && Number(val) <= 2030;
        case 'hgt':
          const unit = val.substr(val.length - 2);
          const h = parseInt(val);
          return (
            (unit == 'cm' && h >= 150 && h <= 193) ||
            (unit == 'in' && h >= 59 && h <= 76)
          );
        case 'hcl':
          return /^#[0-9a-f]{6}$/.test(val);
        case 'ecl':
          return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(
            val,
          );
        case 'pid':
          return /^[0-9]{9}$/.test(val);
        case 'cid':
          return true;
        default:
          return false;
      }
    });
  });

  console.log({ validPassports: validPassports.length });
}

main(rawInput);
