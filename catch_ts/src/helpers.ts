export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}

export const randomMax = (max: number): number => {
  return Math.random() * max;
}

export const constrain = (n: number, low: number, high: number): number => {
  return Math.max(low, Math.min(n, high));
}