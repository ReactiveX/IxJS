import { bindCallback } from '../internal/bindcallback';
import { booleanPredicate } from '../internal/predicates';

export function findIndex<T>(source: Iterable<T>, fn: booleanPredicate<T>, thisArg?: any): number {
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
