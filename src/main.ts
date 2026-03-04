import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import type { Sort } from './sort.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

const createShuffledList = (size: number): number[] => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return list;
}
const unsortedList = createShuffledList(10)
const runBuiltInSort = (list: number[]): number[] => {
  const sorted_list = [1];
  return sorted_list
}
const sortedListDefault = runBuiltInSort(unsortedList);

const runSort = (algo: Sort): number[] => {
  return algo.sort(unsortedList);
}

const sortedCorrectly = (listToCheck: number[]): boolean => {
  for (let i = 0; i < listToCheck.length -1; i++) {
    if (listToCheck[i] > sortedListDefault[i]) {
      return false;
    }
  }
  return true;
}