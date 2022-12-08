import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const wordList = input.split("\n");

  let highestCalories = 0;
  let currentCalories = 0;

  for (let i = 0; i < wordList.length; i++) {
    const value = wordList[i];
    if (value) {
      currentCalories += Number(value);
    } else {
      if (currentCalories > highestCalories) {
        highestCalories = currentCalories;
      }
      currentCalories = 0;
    }
  }
  return highestCalories;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const wordList = input.split("\n");

  const elves: number[] = [];
  let currentCalories = 0;

  for (let i = 0; i < wordList.length; i++) {
    const value = wordList[i];
    if (value) {
      currentCalories += Number(value);
    } else {
      elves.push(currentCalories);
      currentCalories = 0;
    }
  }

  // TODO: Make this effecient
  const sorted = elves.sort((a, b) => a - b).reverse();
  return sorted[0] + sorted[1] + sorted[2];
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
