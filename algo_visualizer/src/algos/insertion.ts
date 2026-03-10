import { BigO } from "./SortAlgorithm";
import type SortAlgorithm from "./SortAlgorithm";

export default class Insertion implements SortAlgorithm {
  readonly name = "Insertion Sort";
  readonly expectedBigO: BigO = BigO.N_SQUARED;
  readonly chartColor: string = "#10b981";

  sort = (listToSort: number[]): number[] => {
    for (let i = 1; i < listToSort.length; i++) {
      const key = listToSort[i];
      let j = i - 1;

      while (j >= 0) {
        if (listToSort[j] > key) {
          listToSort[j + 1] = listToSort[j];
          j--;
        } else {
          break;
        }
      }
      listToSort[j + 1] = key;
    }
    return listToSort;
  };
}
