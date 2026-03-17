import type DataStructure from "./DataStructure";

export default class Heap implements DataStructure {
  readonly name: string = "Heap";
  readonly associatedColor: string = "#10b981";

  readonly get = (): number[] => [];
  readonly pop = (): number => 0;
  readonly push = (_newItem: number): void => {};
}
