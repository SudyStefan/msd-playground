export default interface SortAlgorithm {
  readonly name: string;
  readonly expectedBigO: BigO;
  readonly chartColor: string;

  sort: (unsortedList: number[]) => number[];
}

export enum BigO {
  LOG_N = "log(n)",
  N = "n",
  N_LOG_N = "n log(n)",
  N_SQUARED = "n²"
}
