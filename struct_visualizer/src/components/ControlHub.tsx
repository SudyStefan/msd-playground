import {
  DndContext,
  closestCenter,
  DragOverlay,
  defaultDropAnimationSideEffects,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { cn } from "../helpers/utils";
import PickItem from "./PickItem";
import PickList from "./PickList";
import FunctionButton from "./FunctionButton";
import { useState, type Dispatch } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { StructureLists } from "./App";

type ControlHubProps = {
  lists: StructureLists;
  setLists: Dispatch<React.SetStateAction<StructureLists>>;

  isVisualizing: boolean;
  setIsVisualizing: () => void;
  //setIsVisualizing: Dispatch<React.SetStateAction<boolean>>;
};

const ControlHub = ({
  lists,
  isVisualizing,
  setLists,
  setIsVisualizing,
}: ControlHubProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = [...lists.available, ...lists.selected].find(
    (a) => a.name === activeId,
  );

  const moveAllToSelected = () => {
    setLists((prev) => ({
      available: [],
      selected: [...prev.selected, ...prev.available],
    }));
  };

  const moveAllToAvailable = () => {
    setLists((prev) => ({
      available: [...prev.available, ...prev.selected],
      selected: [],
    }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer === overContainer) {
      const key = activeContainer as "available" | "selected";
      setLists((prev) => {
        const items = prev[key];
        const oldIndex = items.findIndex((i) => i.name === active.id);
        const newIndex = items.findIndex((i) => i.name === over.id);
        return {
          ...prev,
          [key]: arrayMove(items, oldIndex, newIndex),
        };
      });
      return;
    }

    // Moving from Available -> Selected
    if (activeContainer === "available" && overContainer === "selected") {
      const itemToMove = lists.available.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setLists((prev) => {
        const overIndex = prev.selected.findIndex((i) => i.name === over.id);
        const newSelected = [...prev.selected];
        newSelected.splice(
          overIndex >= 0 ? overIndex : newSelected.length,
          0,
          itemToMove,
        );
        return {
          available: prev.available.filter((a) => a.name !== active.id),
          selected: newSelected,
        };
      });
    }

    // Moving from Selected -> Available
    else if (activeContainer === "selected" && overContainer === "available") {
      const itemToMove = lists.selected.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setLists((prev) => {
        const overIndex = prev.available.findIndex((i) => i.name === over.id);
        const newAvailable = [...prev.available];
        newAvailable.splice(
          overIndex >= 0 ? overIndex : newAvailable.length,
          0,
          itemToMove,
        );
        return {
          selected: prev.selected.filter((a) => a.name !== active.id),
          available: newAvailable,
        };
      });
    }

    setActiveId(null);
  };

  return (
    <div className="flex w-90 flex-col items-center justify-center">
      <h1 className="mx-2 text-6xl font-bold text-slate-400">
        Structure Visualizer
      </h1>
      <FunctionButton
        isDisabled={isVisualizing}
        onClick={setIsVisualizing}
        text="Visualize"
      />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div
          className={cn(
            "m-auto flex w-full overflow-hidden",
            "rounded-l-sm border-2 border-teal-400",
            "my-2",
          )}
        >
          <PickList
            items={lists.available}
            listId="available"
            listTitle="Available"
          />

          <div className="flex flex-col">
            <button
              className={cn(
                "h-1/2 bg-stone-700 p-1 text-6xl font-extrabold text-slate-500",
                "hover:cursor-pointer hover:bg-stone-600",
              )}
              onClick={moveAllToSelected}
            >
              {">"}
            </button>
            <button
              className={cn(
                "h-1/2 bg-stone-700 p-1 text-6xl font-extrabold text-slate-500",
                "hover:cursor-pointer hover:bg-stone-600",
              )}
              onClick={moveAllToAvailable}
            >
              {"<"}
            </button>
          </div>

          <PickList
            items={lists.selected}
            listId="selected"
            listTitle="Selected"
          />
        </div>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: "0.5" } },
            }),
          }}
        >
          {activeItem ? <PickItem item={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default ControlHub;
