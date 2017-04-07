import { identity } from '../internal/identity';

export function average(source: Iterable<number>, fn?: (x: number) => number): number;
export function average<T>(source: Iterable<T>, fn?: (x: T) => number): number;
export function average(source: Iterable<any>, fn: (x: any) => number = identity): number {
  let sum = 0;
  let count = 0;
  for (let item of source) {
    sum += fn(item);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
