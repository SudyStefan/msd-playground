import type { JSX } from "react";
import type DataStructure from "./DataStructure";

export default class Linked implements DataStructure {
  readonly name: string = "Linked";
  readonly associatedColor: string = "#ef4444";

  readonly pop = (): void => {};
  readonly push = (): void => {};
  readonly visualize = (): JSX.Element => <></>;
}

export class LinkedItem {}
