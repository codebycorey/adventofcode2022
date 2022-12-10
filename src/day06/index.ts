import run from 'aocrunner';

const parseInput = (rawInput: string): string => rawInput;

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const uniqueCount = 4;

  let start = 0;
  let end = uniqueCount;
  for (; end < input.length; start++, end++) {
    const slice = input.slice(start, end);
    // Set removes duplicates
    const set = new Set(slice);
    if (set.size === uniqueCount) {
      break;
    }
  }

  return end;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const uniqueCount = 14;

  let start = 0;
  let end = uniqueCount;
  for (; end < input.length; start++, end++) {
    const slice = input.slice(start, end);
    // Set removes duplicates
    const set = new Set(slice);
    if (set.size === uniqueCount) {
      break;
    }
  }

  return end;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
