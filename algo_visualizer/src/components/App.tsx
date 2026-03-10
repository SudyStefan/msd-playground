import { useEffect, useState } from "react";
import "../styles/App.css";
import AlgoList from "./AlgoList";
import type SortAlgorithm from "../algos/SortAlgorithm";
import Bubble from "../algos/bubble";
import Insertion from "../algos/insertion";
import Selection from "../algos/selection";
import Quick from "../algos/quick";
import { DndContext, DragOverlay, closestCenter, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AlgoItem from "./AlgoItem";

export const App = () => {
  const [availableAlgos, setAvailableAlgos] = useState<SortAlgorithm[]>([]);
  const [selectedAlgos, setSelectedAlgos] = useState<SortAlgorithm[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = [...availableAlgos, ...selectedAlgos].find((a) => a.name === activeId);

  useEffect(() => {
    setAvailableAlgos([new Bubble(), new Insertion(), new Selection(), new Quick()]);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // 1. Identify which container we started in and which we are over
    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    // 2. SAME LIST MOVE (Reordering)
    if (activeContainer === overContainer) {
      if (activeContainer === "available") {
        setAvailableAlgos((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      } else {
        setSelectedAlgos((items) => {
          const oldIndex = items.findIndex((i) => i.name === active.id);
          const newIndex = items.findIndex((i) => i.name === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
      return;
    }

    // 3. CROSS LIST MOVE (Swapping)
    // Moving from Available -> Selected
    if (activeContainer === "available" && overContainer === "selected") {
      const itemToMove = availableAlgos.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setAvailableAlgos((prev) => prev.filter((a) => a.name !== active.id));
      setSelectedAlgos((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    // Moving from Selected -> Available
    else if (activeContainer === "selected" && overContainer === "available") {
      const itemToMove = selectedAlgos.find((a) => a.name === active.id);
      if (!itemToMove) return;

      setSelectedAlgos((prev) => prev.filter((a) => a.name !== active.id));
      setAvailableAlgos((prev) => {
        const overIndex = prev.findIndex((i) => i.name === over.id);
        const next = [...prev];
        next.splice(overIndex >= 0 ? overIndex : next.length, 0, itemToMove);
        return next;
      });
    }

    setActiveId(null);
  };

  return (
    <>
      <h1>Algo Visualizer</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="algoLists">
          <AlgoList algos={availableAlgos} listId="available" listTitle="Available Algorithms"></AlgoList>
          <AlgoList algos={selectedAlgos} listId="selected" listTitle="Selected Algorithms"></AlgoList>
        </div>

        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: { active: { opacity: "0.5" } }
            })
          }}
        >
          {activeItem ? <AlgoItem algo={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
};
