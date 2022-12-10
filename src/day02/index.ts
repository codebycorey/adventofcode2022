import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

// A = Rock, B = Paper, C = Scissors
// X = Rock, Y = Paper, Z = Scissors

type Elf = 'A' | 'B' | 'C';
type Player = 'X' | 'Y' | 'Z';
type Outcome = Player;

const mapPlayers: Record<Elf, Player> = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};

const mapWinner: Record<Elf, Player> = {
  A: 'Y',
  B: 'Z',
  C: 'X',
};

const mapPlayValue: Record<Player, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let score = 0;

  for (let i = 0; i < input.length; i++) {
    const [elf, me] = input[i].split(' ') as [Elf, Player];

    let round = mapPlayValue[me];
    if (mapWinner[elf] === me) {
      round += 6;
    } else if (mapPlayers[elf] === me) {
      round += 3;
    }

    score += round;
  }

  return score;
};

// A = Rock, B = Paper, C = Scissors
// X = Rock, Y = Paper, Z = Scissors
const loseMap: Record<Elf, Player> = {
  A: 'Z',
  B: 'X',
  C: 'Y',
};

const drawMap: Record<Elf, Player> = {
  A: 'X',
  B: 'Y',
  C: 'Z',
};

const winMap: Record<Elf, Player> = {
  A: 'Y',
  B: 'Z',
  C: 'X',
};

const outcomeMap: Record<Outcome, Record<Elf, Player>> = {
  X: loseMap,
  Y: drawMap,
  Z: winMap,
};

const outcomeValueMap: Record<Outcome, number> = {
  X: 0,
  Y: 3,
  Z: 6,
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let score = 0;

  for (let i = 0; i < input.length; i++) {
    const [elf, outcome] = input[i].split(' ') as [Elf, Outcome];

    const player = outcomeMap[outcome][elf];
    const outcomeValue = outcomeValueMap[outcome];
    const playValue = mapPlayValue[player];

    score += outcomeValue + playValue;
  }

  return score;
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
