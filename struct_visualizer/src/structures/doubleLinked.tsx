import type DataStructure from "./DataStructure";

export default class DoubleLinked implements DataStructure {
  readonly name: string = "Dobule Linked";
  readonly associatedColor: string = "#ef6666";

  readonly get = (): number[] => [];
  readonly pop = (): number => 0;
  readonly push = (_newItem: number): void => {};

  readonly shouldShowAdd = (index: number): boolean => index === 0;
  readonly shouldShowRemove = (index: number): boolean => index === 0;
}

export class LinkedItem {}
