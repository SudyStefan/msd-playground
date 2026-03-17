import { useEffect, useState } from "react";
import AlgoList from "./AlgoList";
import type SortAlgorithm from "../algos/SortAlgorithm";
import Bubble from "../algos/bubble";
import Insertion from "../algos/insertion";
import Selection from "../algos/selection";
import Quick from "../algos/quick";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import AlgoItem from "./AlgoItem";
import {
  runBenchmarks,
  runVisulization,
  type BenchmarkDataPoint,
  type VisulizationData,
} from "../helpers/runner";
import PerformanceChart from "./PerformanceChart";
import Merge from "../algos/merge";
import { cn } from "../helpers/utils";
import VisualizerView from "./VisualizerView";

export const App = () => {
  const [availableAlgos, setAvailableAlgos] = useState<SortAlgorithm[]>([]);
  const [selectedAlgos, setSelectedAlgos] = useState<SortAlgorithm[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkDataPoint[]>([]);
  const [visulizationData, setVisulizationData] = useState<VisulizationData[]>(
    [],
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [maxN, setMaxN] = useState<number>(10000);
  const [intervals, setIntervals] = useState<number>(10);

  const activeItem = [...availableAlgos, ...selectedAlgos].find(
    (a) => a.name === activeId,
  );

  useEffect(() => {
    setAvailableAlgos([
      new Bubble(),
      new Insertion(),
      new Selection(),
      new Quick(),
      new Merge(),
    ]);
  }, []);

  const moveAllToSelected = () => {
    setSelectedAlgos((prev) => [...prev, ...availableAlgos]);
    setAvailableAlgos([]);
  };

  const moveAllToAvailable = () => {
    setAvailableAlgos((prev) => [...prev, ...selectedAlgos]);
    setSelectedAlgos([]);
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

  const handleRunBenchmark = async () => {
    if (intervals <= 0 || maxN <= 0) {
      alert("Please enter values greater than zero.");
      return;
    }
    setIsCalculating(true);
    setBenchmarkData([]);

    await runBenchmarks(selectedAlgos, maxN, intervals, (newDataPoint) => {
      setBenchmarkData((prev) => [...prev, newDataPoint]);
    });

    setIsCalculating(false);
  };

  const handleRunVisulization = async () => {
    setIsCalculating(true);

    await runVisulization(selectedAlgos, setVisulizationData);
  };

  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-start",
        "lg:flex-row lg:justify-center",
        "gap-10 bg-stone-800 px-10",
      )}
    >
      <div className="flex w-90 flex-col items-center justify-center">
        <h1 className="mx-2 cursor-default text-6xl font-bold text-slate-400">
          Algo Visualizer
        </h1>
        <button
          onClick={handleRunBenchmark}
          disabled={isCalculating || selectedAlgos.length === 0}
          className={cn(
            "w-full bg-slate-700 text-slate-300",
            "rounded-sm text-2xl font-medium",
            "my-2 py-2",
            "hover:cursor-pointer hover:bg-slate-600",
          )}
        >
          {isCalculating ? "Calculating..." : "Run Benchmarks"}
        </button>
        <button
          onClick={handleRunVisulization}
          disabled={isCalculating || selectedAlgos.length === 0}
          className={cn(
            "w-full bg-slate-700 text-slate-300",
            "rounded-sm text-2xl font-medium",
            "mb-2 py-2",
            "hover:cursor-pointer hover:bg-slate-600",
          )}
        >
          {isCalculating ? "Calculating..." : "Run Visulization"}
        </button>
        <div className="flex w-full flex-col rounded-l-sm border-2 border-teal-400">
          <div className="flex w-full text-center text-xl text-slate-300">
            <label className="m-2 min-w-1/4 basis-1/4">Max N:</label>
            <input
              className="min-w-0 basis-3/4 bg-stone-700 py-2 text-center"
              type="number"
              value={maxN}
              onChange={(e) => setMaxN(Number(e.target.value))}
            />
          </div>
          <div className="flex w-full text-center text-xl text-slate-300">
            <label className="m-2 min-w-1/4 basis-1/4">Intervals:</label>
            <input
              className="min-w-0 basis-3/4 bg-stone-700 py-2 text-center"
              type="number"
              value={intervals}
              onChange={(e) => setIntervals(Number(e.target.value))}
            />
          </div>
        </div>
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
            <AlgoList
              algos={availableAlgos}
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
            <AlgoList
              algos={selectedAlgos}
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
            {activeItem ? <AlgoItem algo={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
        <a
          className="text-slate-500"
          href="https://github.com/SudyStefan/DataAndAlgosPlayGround"
        >
          {">> GitHub Repo <<"}
        </a>
      </div>
      {benchmarkData.length > 0 && (
        <PerformanceChart algos={selectedAlgos} data={benchmarkData} />
      )}
      {visulizationData.length > 0 && <VisualizerView tbd="bla" />}
    </div>
  );
};
