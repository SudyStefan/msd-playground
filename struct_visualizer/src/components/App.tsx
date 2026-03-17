import { useEffect, useState } from "react";
import type DataStructure from "../structures/DataStructure";
import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { cn } from "../helpers/utils";
import Linked from "../structures/linked";
import StructureItem from "./StructureItem";
import StructureList from "./StructureList";
import Heap from "../structures/heap";
import Queue from "../structures/queue";
import Stack from "../structures/stack";
import DoubleLinked from "../structures/doubleLinked";
import StructureContainer from "./StructureContainer";

export const App = () => {
  const [availableStructures, setAvailableStructures] = useState<
    DataStructure[]
  >([]);
  const [selectedStructures, setSelectedStructures] = useState<DataStructure[]>(
    [],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const activeItem = [...availableStructures, ...selectedStructures].find(
    (a) => a.name === activeId,
  );

  useEffect(() => {
    setAvailableStructures([
      new Linked(),
      new Heap(),
      new Queue(),
      new Stack(),
      new DoubleLinked(),
    ]);
  }, []);

  const moveAllToSelected = () => {
    setSelectedStructures((prev) => [...prev, ...availableStructures]);
    setAvailableStructures([]);
  };

  const moveAllToAvailable = () => {
    setAvailableStructures((prev) => [...prev, ...selectedStructures]);
    setSelectedStructures([]);
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
      if (activeContainer === "available") {
        setAvailableStructures((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      } else {
        setSelectedStructures((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      return;
    }

    // Moving from Available -> Selected
    if (activeContainer === "available" && overContainer === "selected") {
      const itemToMove = availableStructures.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setAvailableStructures((prev) =>
        prev.filter((a) => a.name !== active.id),
      );
      setSelectedStructures((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    // Moving from Selected -> Available
    else if (activeContainer === "selected" && overContainer === "available") {
      const itemToMove = selectedStructures.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setSelectedStructures((prev) => prev.filter((a) => a.name !== active.id));
      setAvailableStructures((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    setActiveId(null);
  };

  const handleRunVisualization = () => {
    setIsVisualizing(true);
  };

  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-start",
        "md:flex-row md:justify-center",
        "bg-stone-800",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "w-full max-w-90",
        )}
      >
        <h1 className="mx-2 cursor-default text-6xl font-bold text-slate-400">
          Structure Visualizer
        </h1>
        <button
          onClick={handleRunVisualization}
          disabled={isVisualizing || selectedStructures.length === 0}
          className={cn(
            "w-full bg-slate-700 text-slate-300",
            "rounded-sm text-2xl font-medium",
            "my-2 py-2",
            "hover:cursor-pointer hover:bg-slate-600",
          )}
        >
          Visualize
        </button>
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
            <StructureList
              structures={availableStructures}
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
            <StructureList
              structures={selectedStructures}
              listId="selected"
              listTitle="Selected"
            ></StructureList>
          </div>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: "0.5" } },
              }),
            }}
          >
            {activeItem ? <StructureItem structure={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
        <a
          className="text-slate-500"
          href="https://github.com/SudyStefan/DataAndAlgosPlayGround"
        >
          {">> GitHub Repo <<"}
        </a>
      </div>
      {isVisualizing &&
        selectedStructures.map((structure) => (
          <StructureContainer key={structure.name} structure={structure} />
        ))}
    </div>
  );
};
