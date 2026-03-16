import type DataStructure from "./DataStructure";

export default class DoubleLinked implements DataStructure {
  readonly name: string = "Dobule Linked";
  readonly associatedColor: string = "#ef6666";

  readonly pop = (): void => {};
  readonly push = (): void => {};

  readonly visualize = () => {
    return <></>;
  };
}

export class LinkedItem {}
