import { useState } from "react";
import type DataStructure from "../structures/DataStructure";
import { cn } from "../helpers/utils";
import Queue from "../structures/queue";
import Stack from "../structures/stack";
import StructureContainer from "./StructureContainer";
import ControlHub from "./ControlHub";

export type StructureLists = {
  available: DataStructure[];
  selected: DataStructure[];
};

export const App = () => {
  const [structureLists, setStructureLists] = useState<StructureLists>({
    available: [
      // new Linked(),
      // new Heap(),
      new Queue(),
      new Stack(),
      // new DoubleLinked(),
    ],
    selected: [],
  });
  const [isVisualizing, setIsVisualizing] = useState(false);

  return (
    <div
      className={cn(
        "flex h-screen min-h-fit w-screen flex-col items-center justify-start",
        "md:flex-row md:justify-center",
        "cursor-default gap-10 bg-stone-800 px-10",
      )}
    >
      <ControlHub
        lists={structureLists}
        setLists={setStructureLists}
        isVisualizing={isVisualizing}
        setIsVisualizing={() => setIsVisualizing(true)}
      />
      {isVisualizing &&
        structureLists.selected.map((structure) => (
          <StructureContainer key={structure.name} structure={structure} />
        ))}
    </div>
  );
};
