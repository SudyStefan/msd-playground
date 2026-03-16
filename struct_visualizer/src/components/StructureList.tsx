import { useDroppable } from "@dnd-kit/core";
import type DataStructure from "../structures/DataStructure";
import AlgoItem from "./StructureItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export type StructureListProps = {
  structures: DataStructure[];
  listId: string;
  listTitle: string;
};

const StructureList = ({
  structures,
  listId,
  listTitle,
}: StructureListProps) => {
  const { setNodeRef } = useDroppable({ id: listId });

  return (
    <div
      className="flex w-1/4 basis-1/2 flex-col items-center"
      ref={setNodeRef}
    >
      <h1 className="w-full cursor-default bg-stone-700 p-2 text-center text-xl text-slate-300">
        {listTitle}
      </h1>
      <SortableContext
        id={listId}
        items={structures.map((struct) => struct.name)}
        strategy={verticalListSortingStrategy}
      >
        {structures.map((struct) => (
          <AlgoItem key={struct.name} structure={struct} />
        ))}
      </SortableContext>
    </div>
  );
};

export default StructureList;
