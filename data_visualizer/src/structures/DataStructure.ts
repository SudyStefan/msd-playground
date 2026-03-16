export default interface DataStructure {
  readonly name: string;
  readonly associatedColor: string;

  push(): void;
  pop(): void;
}
