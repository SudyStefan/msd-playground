import type SortAlgorithm from "./SortAlgorithm";
import { BigO } from "./SortAlgorithm";

export default class Quick implements SortAlgorithm {
  readonly name = "Quick Sort";
  readonly expectedBigO: BigO = BigO.N_LOG_N;
  readonly chartColor: string = "#3b82f6";

  private partition = (listToSort: number[], low: number, high: number): number => {
    const pivot = listToSort[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (listToSort[j] < pivot) {
        i++;
        this.swap(listToSort, i, j);
      }
    }
    this.swap(listToSort, i + 1, high);
    return i + 1;
  };

  private swap = (listToSort: number[], i: number, j: number): void => {
    [listToSort[i], listToSort[j]] = [listToSort[j], listToSort[i]];
  };

  private quickSortInternal = (listToSort: number[], low: number, high: number): void => {
    if (low < high) {
      const partitionIndex = this.partition(listToSort, low, high);
      this.quickSortInternal(listToSort, low, partitionIndex - 1);
      this.quickSortInternal(listToSort, partitionIndex + 1, high);
    }
  };

  sort = (listToSort: number[]): number[] => {
    this.quickSortInternal(listToSort, 0, listToSort.length - 1);
    return listToSort;
  };
}
