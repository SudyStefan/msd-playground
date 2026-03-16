import type DataStructure from "./DataStructure";

export default class LinkedList implements DataStructure {
  name: string = "Linked List";
  associatedColor: string = "#ef4444";

  pop(): void {}
  push(): void {}
}

export class LinkedItem {}
