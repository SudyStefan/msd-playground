import { BigO } from "./SortAlgorithm";
import type SortAlgorithm from "./SortAlgorithm";

export default class Bubble implements SortAlgorithm {
  readonly name = "Bubble Sort";
  readonly expectedBigO: BigO = BigO.N_SQUARED;
  readonly chartColor: string = "#ef4444";

  sort = (listToSort: number[]): number[] => {
    let sortedCount = 1;

    while (sortedCount !== listToSort.length) {
      let swapped = false;
      for (let i = 0; i < listToSort.length - sortedCount; i++) {
        if (listToSort[i] > listToSort[i + 1]) {
          [listToSort[i], listToSort[i + 1]] = [listToSort[i + 1], listToSort[i]];
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
      sortedCount++;
    }

    return listToSort;
  };
}
