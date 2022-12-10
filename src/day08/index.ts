import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

enum Direction {
  t,
  l,
  r,
  b,
}

const directionArray = [Direction.t, Direction.l, Direction.r, Direction.b];
const DirectionCoordinates: Record<Direction, number[]> = {
  [Direction.l]: [-1, 0],
  [Direction.r]: [1, 0],
  [Direction.t]: [0, -1],
  [Direction.b]: [0, 1],
};

interface CoordinateState {
  isVisible: boolean
  [Direction.l]: number
  [Direction.r]: number
  [Direction.t]: number
  [Direction.b]: number
}
type Seen = CoordinateState[][];

const emptyCoordinateState: CoordinateState = {
  isVisible: false,
  [Direction.l]: -1,
  [Direction.r]: -1,
  [Direction.t]: -1,
  [Direction.b]: -1,
};

const walk1 = (
  board: string[],
  seen: Seen,
  x: number,
  y: number,
  direction: Direction,
): boolean => {
  const boardValue = board[y]?.[x];
  const seenValue = seen[y]?.[x];

  // We ran out the forest
  if (boardValue === undefined || seenValue === undefined) {
    return false;
  }

  const value = parseInt(boardValue);

  // undefined check because 0 falsy
  if (seenValue[direction] === -1 || seenValue[direction] === undefined) {
    const [xdir, ydir] = DirectionCoordinates[direction];
    const mx = x + xdir;
    const my = y + ydir;

    walk1(board, seen, mx, my, direction);

    const next = seen[my]?.[mx];

    const nextDirState = next?.[direction] ?? null;
    if (nextDirState !== null && nextDirState >= 0) {
      const isVisible =
        seenValue.isVisible || parseInt(board[y][x]) > nextDirState;
      const newValue = nextDirState > value ? nextDirState : value;
      seen[y][x] = {
        ...seen[y][x],
        isVisible,
        [direction]: newValue,
      };
      return isVisible;
    }

    // Ran out of forrest
    if (seen[my]?.[mx] === undefined) {
      seen[y][x] = {
        ...seenValue,
        isVisible: true,
        [direction]: value,
      };
      return true;
    }
  }

  return false;
};

const isVisible = (
  board: string[],
  seen: Seen,
  x: number,
  y: number,
): boolean => {
  for (let i = 0; i < directionArray.length; i++) {
    walk1(board, seen, x, y, directionArray[i]);
  }

  return seen[y][x].isVisible;
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const seen: Seen = [];
  for (let i = 0; i < input.length; i++) {
    seen.push(new Array(input[i].length).fill({ ...emptyCoordinateState }));
  }

  let count = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      if (isVisible(input, seen, x, y)) {
        count++;
      }
    }
  }

  return count;
};

const walk2 = (
  board: string[],
  x: number,
  y: number,
  direction: Direction,
  size: number,
  count: number = 0,
): number => {
  const boardValue = board[y]?.[x];

  // We ran out the forest
  if (boardValue === undefined) {
    return count - 1;
  }

  if (count > 0 && parseInt(boardValue) >= size) {
    return count;
  }

  const [xdir, ydir] = DirectionCoordinates[direction];
  const mx = x + xdir;
  const my = y + ydir;

  return walk2(board, mx, my, direction, size, ++count);
};

const getTreeCount = (board: string[], x: number, y: number): number => {
  let count = 1;
  for (let i = 0; i < directionArray.length; i++) {
    const height = parseInt(board[y]?.[x] ?? 0);
    const wCount = walk2(board, x, y, directionArray[i], height);
    count = count * wCount;
  }

  return count;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let highest = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    for (let x = 0; x < row.length; x++) {
      const count = getTreeCount(input, x, y);
      if (count > highest) {
        highest = count;
      }
    }
  }

  return highest;
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
