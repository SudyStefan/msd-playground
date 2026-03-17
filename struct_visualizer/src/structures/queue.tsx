import type DataStructure from "./DataStructure";

export default class Queue implements DataStructure {
  readonly name: string = "Queue";
  readonly associatedColor: string = "#10e971";
  private stack: number[] = [...Array(5).keys()].map((i) => i + 1);

  readonly get = (): number[] => this.stack;
  readonly pop = (): number => this.stack.shift()!;
  readonly push = (newItem: number): void => {
    this.stack.push(newItem);
  };

  readonly shouldShowAdd = (index: number): boolean =>
    index === this.stack.length - 1;
  readonly shouldShowRemove = (index: number): boolean => index === 0;
}
