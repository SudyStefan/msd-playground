import type DataStructure from "./DataStructure";

export default class Linked implements DataStructure {
  readonly name: string = "Linked";
  readonly associatedColor: string = "#ef4444";

  readonly get = (): number[] => [];
  readonly pop = (): number => 0;
  readonly push = (_newItem: number): void => {};
}

export class LinkedItem {}
