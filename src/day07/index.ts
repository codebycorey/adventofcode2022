import run from 'aocrunner';

interface FileNode {
  value: { name: string, size: number }
  parent: FileNode | null
  children: FileNode[]
}

const createNode = (
  value: FileNode['value'],
  parent: FileNode | null,
): FileNode => ({
  value,
  parent,
  children: [],
});

class FileTree {
  private readonly head: FileNode;
  private current: FileNode;

  public constructor (input: string[]) {
    this.head = createNode({ name: '/', size: 0 }, null);
    this.current = this.head;

    for (let i = 0; i < input.length; i++) {
      const item = input[i].split(' ');
      if (item[0] === '$') {
        if (item[1] === 'cd') {
          this.cd(item[2]);
        }
      } else if (item[0] === 'dir') {
        this.addFileOrDir(item[1]);
      } else {
        this.addFileOrDir(item[1], parseInt(item[0]));
      }
    }
  }

  public cd (value: string): void {
    if (value === '/') {
      this.current = this.head;
      return;
    }

    const current = this.current;
    if (value === '..' && current.parent != null) {
      this.current = current.parent;
      return;
    }

    const dir = current.children.find((child) => child.value.name === value);
    if (dir == null) {
      return;
    }
    this.current = dir;
  }

  public addFileOrDir (name: string, size: number = 0): void {
    const node = createNode({ name, size }, this.current);
    this.current.children.push(node);
    if (size > 0) {
      this.addFileSizeToAllParents(node, size);
    }
  }

  public addSizeForAllDirLessThanMax (
    max: number,
    node: FileNode = this.head,
  ): number {
    let total = 0;
    if (node.children.length === 0) {
      return total;
    }

    if (node.value.size < max) {
      total += node.value.size;
    }

    for (let i = 0; i < node.children.length; i++) {
      total += this.addSizeForAllDirLessThanMax(max, node.children[i]);
    }
    return total;
  }

  public findDirToDelete (
    node: FileNode = this.head,
    nodeToDelete: FileNode = this.head,
  ): FileNode {
    if (node.children.length === 0) {
      return nodeToDelete;
    }

    const space = 30000000 - (70000000 - this.head.value.size);

    if (node.value.size < nodeToDelete.value.size && node.value.size > space) {
      nodeToDelete = node;
    }

    for (let i = 0; i < node.children.length; i++) {
      const possibleNodeToDelete = this.findDirToDelete(
        node.children[i],
        nodeToDelete,
      );
      if (
        possibleNodeToDelete.value.size < nodeToDelete.value.size &&
        possibleNodeToDelete.value.size > space
      ) {
        nodeToDelete = possibleNodeToDelete;
      }
    }

    return nodeToDelete;
  }

  private addFileSizeToAllParents (node: FileNode, size: number): void {
    const parent = node.parent;
    if (parent != null) {
      parent.value.size += size;
      this.addFileSizeToAllParents(parent, size);
    }
  }
}

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const fileTree = new FileTree(input);

  return fileTree.addSizeForAllDirLessThanMax(100000);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const fileTree = new FileTree(input);

  return fileTree.findDirToDelete().value.size;
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
