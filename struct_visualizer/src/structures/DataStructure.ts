import type { JSX } from "react";

export default interface DataStructure {
  readonly name: string;
  readonly associatedColor: string;

  push(): void;
  pop(): void;
  visualize(): JSX.Element;
}
