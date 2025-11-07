export const snap = (value: number, step = 5) =>
  Math.round(value / step) * step;
