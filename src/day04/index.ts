import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const mock = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const work = (
  aStart: number,
  aEnd: number,
  bStart: number,
  bEnd: number,
): boolean => {
  return (
    (aStart >= bStart && aEnd <= bEnd) || (bStart >= aStart && bEnd <= aEnd)
  );
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let count = 0;

  for (let i = 0; i < input.length; i++) {
    const [one, two] = input[i].split(',');
    const [oneStart, oneEnd] = one.split('-');
    const [twoStart, twoEnd] = two.split('-');
    const oneStartNum = parseInt(oneStart);
    const oneEndNum = parseInt(oneEnd);
    const twoStartNum = parseInt(twoStart);
    const twoEndNum = parseInt(twoEnd);

    if (work(oneStartNum, oneEndNum, twoStartNum, twoEndNum)) {
      count++;
    }
  }

  return count;
};

const work2 = (aStart: number, aEnd: number, bStart: number, bEnd: number): boolean => {
  return (
    (aStart >= bStart && aStart <= bEnd) || (bStart >= aStart && bStart <= aEnd)
  );
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let count = 0;

  for (let i = 0; i < input.length; i++) {
    const [one, two] = input[i].split(',');
    const [oneStart, oneEnd] = one.split('-');
    const [twoStart, twoEnd] = two.split('-');
    const oneStartNum = parseInt(oneStart);
    const oneEndNum = parseInt(oneEnd);
    const twoStartNum = parseInt(twoStart);
    const twoEndNum = parseInt(twoEnd);

    if (work2(twoStartNum, twoEndNum, oneStartNum, oneEndNum)) {
      count++;
    }
  }

  return count;
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
