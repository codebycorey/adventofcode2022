import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const alphabet = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((map: { [key: string]: number }, item: string, index: number) => {
    map[item] = index + 1;
    return map;
  }, {});

type Seen = "front" | "back";

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const rucksack = input[i];
    const seen: Record<string, Record<Seen, boolean>> = {};

    let dup: string = "";

    for (let j = 0; j < rucksack.length / 2; j++) {
      const front = rucksack[j];
      const back = rucksack[rucksack.length - 1 - j];

      if (seen[front]?.back) {
        dup = front;
        break;
      } else if (seen[back]?.front) {
        dup = back;
        break;
      } else if (front === back) {
        dup = front;
        break;
      } else {
        seen[front] = {
          ...seen[front],
          front: true,
        };
        seen[back] = {
          ...seen[back],
          back: true,
        };
      }
    }

    const alphaValue = alphabet[dup] ?? alphabet[dup.toLowerCase()] + 26;
    total += alphaValue;
  }
  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;

  let seen: Record<string, Record<number, boolean>> = {};
  let badge: string = "";

  for (let i = 0; i < input.length; i++) {
    const memberId = i % 3;
    const rucksack = input[i];

    for (let j = 0; j < rucksack.length; j++) {
      const item = rucksack[j];

      const seenItem = seen[item] ?? {};
      seenItem[memberId] = true;

      seen[item] = seenItem;

      if (Object.keys(seenItem).length === 3) {
        badge = item;
      }
    }

    if (memberId === 2) {
      const alphaValue = alphabet[badge] ?? alphabet[badge.toLowerCase()] + 26;
      total += alphaValue;

      badge = "";
      seen = {};
    }
  }
  return total;
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
