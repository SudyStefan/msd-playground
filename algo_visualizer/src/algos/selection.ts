import type SortAlgorithm from "./SortAlgorithm";
import { BigO } from "./SortAlgorithm";

export default class Selection implements SortAlgorithm {
  readonly name = "Selection Sort";
  readonly expectedBigO: BigO = BigO.N_SQUARED;

  sort = (listToSort: number[]): number[] => {
    for (let i = 0; i < listToSort.length - 1; i++) {
      let minIndex = i;
      for (let k = i + 1; k < listToSort.length; k++) {
        if (listToSort[k] < listToSort[minIndex]) {
          minIndex = k;
        }
      }
      if (minIndex !== i) {
        [listToSort[i], listToSort[minIndex]] = [listToSort[minIndex], listToSort[i]];
      }
    }
    return listToSort;
  };
}
