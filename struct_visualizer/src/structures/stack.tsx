import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Stack implements DataStructure {
  readonly name: string = "Stack";
  readonly associatedColor: string = "#3b82f6";

  readonly pop = (): void => {};
  readonly push = (): void => {};
  readonly visualize = (): JSX.Element => <></>;
}
