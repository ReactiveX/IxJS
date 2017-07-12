import { bindCallback } from '../internal/bindcallback';

export function findIndex<T>(source: Iterable<T>, fn: (value: T, index: number) => boolean, thisArg?: any): number {
  if (typeof fn !== 'function') { throw new TypeError(); }
  const f = bindCallback(fn, thisArg, 2);
  let i = 0;

  for (let item of source) {
    if (f(item, i++)) {
      return i;
    }
  }
  return -1;
}
