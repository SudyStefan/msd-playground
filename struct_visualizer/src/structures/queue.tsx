import type DataStructure from "./DataStructure";

export default class Queue implements DataStructure {
  readonly name: string = "Queue";
  readonly associatedColor: string = "#2a8b5b";
  private stack: number[] = [...Array(5).keys()].map((i) => i + 1);

  readonly get = (): number[] => this.stack;
  readonly pop = (): number => this.stack.shift()!;
  readonly push = (newItem: number): void => {
    this.stack.push(newItem);
  };

  readonly shouldShowAdd = (reversedIndex: number): boolean =>
    reversedIndex === 0;
  readonly shouldShowRemove = (reversedIndex: number): boolean =>
    reversedIndex === this.stack.length - 1;
}
