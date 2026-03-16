import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Queue implements DataStructure {
  readonly name: string = "Queue";
  readonly associatedColor: string = "#10e971";

  readonly pop = (): void => {};
  readonly push = (): void => {};
  readonly visualize = (): JSX.Element => <></>;
}
