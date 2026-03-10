import type SortAlgorithm from "./SortAlgorithm";

export type BenchmarkResult = {
  n: number;
  [algoName: string]: number;
};

const getMedian = (values: number[]): number => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

export const runBenchmarks = (selectedAlgos: SortAlgorithm[]) => {
  const sizes = [100, 500, 1000, 2500, 5000, 7500, 10000];
  const iterations = 5; // Run 5 times to get a reliable median
  const finalResults: BenchmarkResult[] = [];

  sizes.forEach((n) => {
    const dataPoint: BenchmarkResult = { n };

    // Generate the base array for this size
    const baseArray = Array.from({ length: n }, () => Math.floor(Math.random() * 10000));

    selectedAlgos.forEach((algo) => {
      const times: number[] = [];

      for (let i = 0; i < iterations; i++) {
        const arrayCopy = [...baseArray]; // Each run gets identical data

        const start = performance.now();
        algo.sort(arrayCopy);
        const end = performance.now();

        times.push(end - start);
      }

      // Store the median of the 5 runs
      dataPoint[algo.name] = parseFloat(getMedian(times).toFixed(4));
    });

    finalResults.push(dataPoint);
  });

  return finalResults;
};
