import { identity } from '../internal/identity';

export function sum(source: Iterable<number>, fn?: (x: number) => number): number;
export function sum<T>(source: Iterable<T>, fn: (x: T) => number): number;
export function sum(source: Iterable<any>, fn: (x: any) => number = identity): number {
  let sum = 0;
  for (let item of source) {
    sum += fn(item);
  }

  return sum;
}
