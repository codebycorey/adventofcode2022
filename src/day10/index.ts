import run from 'aocrunner';

class Device {
  private x: number = 1;
  private cycleCount: number = 0;
  private crt: string[][] = [];
  private readonly crtWidth = 40;
  private readonly crtHeight = 6;

  public readonly cycleHistory = new Map<number, number>();

  constructor (input: string[]) {
    const crt = [];
    for (let i = 0; i < this.crtHeight; i++) {
      crt.push(new Array(this.crtWidth).fill('.'));
    }
    this.crt = crt;

    this._execute(input);
  }

  public count = (): number => {
    return this.cycleCount;
  };

  public getSignalForCycle = (cycle: number): number => {
    const x = this.cycleHistory.get(cycle);
    if (x === undefined) {
      return 0;
    }
    return cycle * x;
  };

  public printCRT (): void {
    for (let i = 0; i < this.crtHeight; i++) {
      console.log(this.crt[i].join(''));
    }
  }

  private readonly _execute = (instructions: string[]): void => {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      if (instruction === 'noop') {
        this._noopInstruction();
      } else {
        this._addxInstruction(instruction);
      }
    }
  };

  private readonly _noopInstruction = (): void => {
    this.cycleCPU();
  };

  private readonly _addxInstruction = (instruction: string): void => {
    const [, v] = instruction.split(' ');
    const value = parseInt(v);
    // cycle twice
    this.cycleCPU();
    this.cycleCPU();

    this.x = this.x + value;
  };

  private readonly cycleCPU = (): void => {
    const cycleCount = this.cycleCount + 1;

    this.cycleHistory.set(cycleCount, this.x);

    this.drawPixel();

    this.cycleCount = cycleCount;
  };

  private readonly drawPixel = (): void => {
    const row = Math.floor(this.cycleCount / this.crtWidth);
    const index = this.cycleCount % this.crtWidth;

    const diff = this.x - (index + 1);
    const sprite = diff > -3 && diff <= 0;

    if (sprite) {
      this.crt[row][index] = '#';
    }
  };
}

const part1 = (rawInput: string): number => {
  const input = rawInput.split('\n');
  const program = new Device(input);

  const cycles = [20, 60, 100, 140, 180, 220];

  let totalSignal = 0;

  for (let i = 0; i < cycles.length; i++) {
    totalSignal += program.getSignalForCycle(cycles[i]);
  }

  return totalSignal;
};

const part2 = (rawInput: string): string => {
  const input = rawInput.split('\n');
  const program = new Device(input);

  program.printCRT();

  // The answer is console.log() out.
  return 'EZFCHJAB';
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
