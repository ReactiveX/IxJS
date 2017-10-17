import { bindCallback } from '../internal/bindcallback';

export function findIndex<T, S extends T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): number;
export function findIndex<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): number;
export function findIndex<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): number {
  if (typeof predicate !== 'function') {
    throw new TypeError();
  }
  const f = bindCallback(predicate, thisArg, 2);
  let i = 0;

  for (let item of source) {
    if (f(item, i++)) {
      return i;
    }
  }
  return -1;
}
