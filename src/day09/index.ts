import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

enum Direction {
  UP = "U",
  RIGHT = "R",
  DOWN = "D",
  LEFT = "L",
}

const moveMap: Record<Direction, number[]> = {
  [Direction.UP]: [0, 1],
  [Direction.RIGHT]: [1, 0],
  [Direction.DOWN]: [0, -1],
  [Direction.LEFT]: [-1, 0],
};

const pullNext = (
  rope: Knot[],
  prev: Knot,
  seen: Set<string>,
  index: number = 1,
): void => {
  const knot = rope[index];

  if (!knot) {
    seen.add(`${prev.x},${prev.y}`);
    return;
  }

  const { x: px, y: py } = prev;
  const { x, y } = knot;
  //
  const dx = Math.abs(px - x);
  const dy = Math.abs(py - y);

  if (dx <= 1 && dy <= 1) {
    return;
  }

  if (py === y) {
    const mx = px - x > 0 ? 1 : -1;
    rope[index] = { ...knot, x: knot.x + mx };
  }

  if (px === x) {
    const my = py - y > 0 ? 1 : -1;
    rope[index] = { ...knot, y: knot.y + my };
  }

  if (dx === 1 && dy > 1) {
    const my = py - y > 0 ? 1 : -1;
    rope[index] = { x: px, y: knot.y + my };
  }

  if (dy === 1 && dx > 1) {
    const mx = px - x > 0 ? 1 : -1;
    rope[index] = { y: py, x: knot.x + mx };
  }

  if (dx > 1 && dy > 1) {
    const mx = px - x > 0 ? 1 : -1;
    const my = py - y > 0 ? 1 : -1;
    rope[index] = { x: knot.x + mx, y: knot.y + my };
  }

  pullNext(rope, rope[index], seen, ++index);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rope: typeof knot[] = [];
  const ropeLength = 2;

  for (let i = 0; i < ropeLength; i++) {
    rope.push({ ...knot });
  }

  const seen = new Set<string>().add("0,0");

  for (let i = 0; i < input.length; i++) {
    const [direction, count] = input[i].split(" ");
    const [mx, my] = moveMap[direction as Direction];

    for (let j = 0; j < parseInt(count); j++) {
      const cknot = rope[0];
      rope[0] = { x: cknot.x + mx, y: cknot.y + my };
      pullNext(rope, rope[0], seen);
    }
  }

  return seen.size;
};

type Knot = { x: number; y: number };
const knot: Knot = {
  x: 0,
  y: 0,
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rope: typeof knot[] = [];
  const ropeLength = 10;

  for (let i = 0; i < ropeLength; i++) {
    rope.push({ ...knot });
  }

  const seen = new Set<string>().add("0,0");

  for (let i = 0; i < input.length; i++) {
    const [direction, count] = input[i].split(" ");
    const [mx, my] = moveMap[direction as Direction];

    for (let j = 0; j < parseInt(count); j++) {
      const cknot = rope[0];
      rope[0] = { x: cknot.x + mx, y: cknot.y + my };
      pullNext(rope, rope[0], seen);
    }
  }

  return seen.size;
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
