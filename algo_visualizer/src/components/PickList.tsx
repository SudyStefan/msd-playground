import { useDroppable } from "@dnd-kit/core";
import type SortAlgorithm from "../algos/SortAlgorithm";
import PickItem from "./PickItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type PickListProps = {
  items: SortAlgorithm[];
  listId: string;
  listTitle: string;
};

const PickList = ({ items, listId, listTitle }: PickListProps) => {
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
        items={items.map((item) => item.name)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <PickItem key={item.name} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default PickList;
