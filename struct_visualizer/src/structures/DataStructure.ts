export default interface DataStructure {
  readonly name: string;
  readonly associatedColor: string;

  get(): number[];
  push(newItem: number): void;
  pop(): number;

  shouldShowAdd(reversedIndex: number): boolean;
  shouldShowRemove(reversedIndex: number): boolean;
}
