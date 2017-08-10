import { bindCallback } from '../internal/bindcallback';

/**
 * Iterates the sequence and invokes the given action for each value in the sequence.
 * @param {Iterable<T>} source Source sequence.
 * @param {function:(value: T, index: number): void} callback Action to invoke for each element.
 * @param {Object} [thisArg] Optional "this" binding for the callback.
 */
export function forEach<TSource>(
    source: Iterable<TSource>,
    callback: (value: TSource, index: number) => void,
    thisArg?: any): void {
  let i = 0;
  const fn = bindCallback(callback, thisArg, 2);
  for (let item of source) {
    fn(item, i++);
  }
}
