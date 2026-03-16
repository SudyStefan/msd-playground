import type DataStructure from "../structures/DataStructure";
import { cn } from "../helpers/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ListItemProps = { structure: DataStructure };

const StructureItem = ({ structure }: ListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: structure.name });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center justify-center px-4 py-2",
        "w-full border-b-2 border-teal-400 transition",
        "cursor-default hover:cursor-grab hover:bg-stone-600",
        "active:cursor-grabbing active:opacity-25",
      )}
    >
      <span style={{ color: structure.associatedColor }}>{structure.name}</span>
    </div>
  );
};

export default StructureItem;
