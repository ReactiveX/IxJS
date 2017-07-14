import { bindCallback } from '../internal/bindcallback';

/**
 * Returns the value of the first element in the sequence that satisfies the provided testing function.
 * Otherwise undefined is returned.
 * @param {Iterable<T>} source Source sequence.
 * @param {function(value: T, index: number): boolean} predicate Function to execute for every item in the sequence.
 * @param {Object} [thisArg] Object to use as this when executing callback.
 * @return {T | undefined} The value of the first element in the sequence that satisfies the provided testing function.
 * Otherwise undefined is returned.
 */
export function find<T>(
    source: Iterable<T>,
    predicate: (value: T, index: number) => boolean,
    thisArg?: any): T | undefined {
  if (typeof predicate !== 'function') { throw new TypeError(); }
  const f = bindCallback(predicate, thisArg, 2);
  let i = 0;

  for (let item of source) {
    if (f(item, i++)) {
      return item;
    }
  }
  return undefined;
}
