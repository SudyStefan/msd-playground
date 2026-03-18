import { useState } from "react";
import type SortAlgorithm from "../algos/SortAlgorithm";
import Bubble from "../algos/bubble";
import Insertion from "../algos/insertion";
import Selection from "../algos/selection";
import Quick from "../algos/quick";
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
import ControlHub from "./ControlHub";

export type Settings = {
  maxN: number;
  intervals: number;
};

export type AlgoLists = {
  available: SortAlgorithm[];
  selected: SortAlgorithm[];
};

export const App = () => {
  const [algoLists, setAlgoLists] = useState<AlgoLists>({
    available: [
      new Bubble(),
      new Insertion(),
      new Selection(),
      new Quick(),
      new Merge(),
    ],
    selected: [],
  });
  const [settings, setSettings] = useState<Settings>({
    maxN: 10000,
    intervals: 10,
  });
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkDataPoint[]>([]);
  const [visulizationData, setVisulizationData] = useState<VisulizationData[]>(
    [],
  );
  const [isCalculating, setIsCalculating] = useState(false);

  const handleRunBenchmark = async () => {
    if (settings.intervals <= 0 || settings.maxN <= 0) {
      alert("Please enter values greater than zero.");
      return;
    }
    setIsCalculating(true);
    setBenchmarkData([]);

    await runBenchmarks(
      algoLists.selected,
      settings.maxN,
      settings.intervals,
      (newDataPoint) => {
        setBenchmarkData((prev) => [...prev, newDataPoint]);
      },
    );

    setIsCalculating(false);
  };

  const handleRunVisulization = async () => {
    setIsCalculating(true);

    await runVisulization(algoLists.selected, setVisulizationData);
  };

  return (
    <div
      className={cn(
        "flex h-screen min-h-fit w-screen flex-col items-center justify-start",
        "lg:flex-row lg:justify-center",
        "gap-10 bg-stone-800 px-10",
      )}
    >
      <ControlHub
        lists={algoLists}
        setLists={setAlgoLists}
        isBenchmarking={isCalculating}
        runBenchmark={handleRunBenchmark}
        isVisualizing={visulizationData.length > 0}
        runVisualization={handleRunVisulization}
        settings={settings}
        setSettings={setSettings}
      />
      {benchmarkData.length > 0 && (
        <PerformanceChart algos={algoLists.selected} data={benchmarkData} />
      )}
      {visulizationData.length > 0 && <VisualizerView tbd="bla" />}
    </div>
  );
};
