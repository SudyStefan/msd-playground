import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Heap implements DataStructure {
  readonly name: string = "Heap";
  readonly associatedColor: string = "#10b981";

  readonly pop = (): void => {};
  readonly push = (): void => {};
  readonly visualize = (): JSX.Element => <></>;
}
