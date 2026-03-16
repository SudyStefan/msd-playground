import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Stack implements DataStructure {
  readonly name: string = "Stack";
  readonly associatedColor: string = "#3b82f6";

  private arr: Int32Array = new Int32Array();

  readonly get = (): number[] => [...this.arr];
  readonly pop = (): number => 0;
  readonly push = (newItem: number): void => {};

  readonly visualize = (): JSX.Element => {
    return <></>;
  };
}
