import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Queue implements DataStructure {
  readonly name: string = "Queue";
  readonly associatedColor: string = "#10e971";

  readonly get = (): number[] => [];
  readonly pop = (): number => 0;
  readonly push = (_newItem: number): void => {};

  readonly visualize = (): JSX.Element => <></>;
}
