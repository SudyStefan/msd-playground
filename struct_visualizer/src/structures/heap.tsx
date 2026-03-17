import type DataStructure from "./DataStructure";

export default class Heap implements DataStructure {
  readonly name: string = "Heap";
  readonly associatedColor: string = "#10b981";

  readonly get = (): number[] => [];
  readonly pop = (): number => 0;
  readonly push = (_newItem: number): void => {};

  readonly shouldShowAdd = (index: number): boolean => index === 0;
  readonly shouldShowRemove = (index: number): boolean => index === 0;
}
