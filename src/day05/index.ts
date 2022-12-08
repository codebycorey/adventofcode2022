import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n\n");

const parseBoard = (board: string[]): string[][] => {
  const stacks: string[][] = [];

  for (let i = board.length - 1; i >= 0; i--) {
    const row = board[i];
    if (i !== board.length - 1) {
      for (let j = 0; j < row.length; j += 4) {
        const column = row[j + 1];
        const stackNum = j / 4;

        if (column !== " ") {
          const stack = stacks[stackNum] || [];

          stack.push(column);
          stacks[stackNum] = stack;
        }
      }
    }
  }

  return stacks;
};

/**
 * notes: Use a stack
 */
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const board = input[0].split("\n");
  const moves = input[1].split("\n");

  const stacks: string[][] = parseBoard(board);

  for (let i = 0; i < moves.length; i++) {
    const [count, start, end] = moves[i]
      .replace("move ", "")
      .replace("from ", "")
      .replace("to ", "")
      .split(" ")
      .map((val) => parseInt(val));

    for (let j = 0; j < count; j++) {
      const crate = stacks[start - 1].pop();
      if (crate) {
        stacks[end - 1].push(crate);
      }
    }
  }

  let letters = "";

  for (let i = 0; i < stacks.length; i++) {
    letters += stacks[i].pop() || "";
  }

  return letters;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const board = input[0].split("\n");
  const moves = input[1].split("\n");

  const stacks: string[][] = parseBoard(board);

  for (let i = 0; i < moves.length; i++) {
    const [count, start, end] = moves[i]
      .replace("move ", "")
      .replace("from ", "")
      .replace("to ", "")
      .split(" ")
      .map((val) => parseInt(val));

    const stack = stacks[start - 1];
        
    const sliced = stack.slice(-count);
    stacks[start - 1] = stack.slice(0, stack.length - count);
    stacks[end - 1] = [...stacks[end - 1], ...sliced];
  }

  let letters = "";

  for (let i = 0; i < stacks.length; i++) {
    letters += stacks[i].pop() || "";
  }

  return letters;
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
