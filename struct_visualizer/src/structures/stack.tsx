import type DataStructure from "./DataStructure";

export default class Stack implements DataStructure {
  readonly name: string = "Stack";
  readonly associatedColor: string = "#3b82f6";

  private stack: number[] = [...Array(10).keys()].map((i) => i + 1);

  readonly get = (): number[] => this.stack;
  readonly pop = (): number => this.stack.pop()!;
  readonly push = (newItem: number): void => {
    this.stack.push(newItem);
  };
}
