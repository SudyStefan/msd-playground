import type DataStructure from "./DataStructure";

export default class Stack implements DataStructure {
  readonly name: string = "Stack";
  readonly associatedColor: string = "#3b82f6";
  private stack: number[] = [...Array(5).keys()].map((i) => i + 1);

  readonly get = (): number[] => this.stack;
  readonly pop = (): number => this.stack.pop()!;
  readonly push = (newItem: number): void => {
    this.stack.push(newItem);
  };

  readonly shouldShowAdd = (index: number): boolean =>
    index === this.stack.length - 1;
  readonly shouldShowRemove = (index: number): boolean =>
    index === this.stack.length - 1;
}
