'use strict';
import { identity } from '../internal/identity';

export function min(source: Iterable<number>, fn?: (x: number) => number): number;
export function min<T>(source: Iterable<T>, fn: (x: T) => number): number;
export function min(source: Iterable<any>, fn: (x: any) => number = identity): number {
  let atleastOnce = false;
  let value = Infinity;
  for (let item of source) {
    if (!atleastOnce) {
      atleastOnce = true;
    }
    let x = fn(item);
    if (x < value) { value = x; }
  }
  if (!atleastOnce) {
    throw new Error('Sequence contains no elements');
  }

  return value;
}
