import { IterableX } from './iterablex.js';

class DeferIterable<T> extends IterableX<T> {
  private _fn: () => Iterable<T>;

  constructor(fn: () => Iterable<T>) {
    super();
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    for (const item of this._fn()) {
      yield item;
    }
  }
}

/**
 * Returns an iterable sequence that invokes the specified factory function whenever a call to [Symbol.iterator] has been made.
 *
 * @template TSource The type of the elements in the sequence returned by the factory function, and in the resulting sequence.
 * @param {(() => Iterable<TSource>)} factory iterable factory function to invoke for each call to [Symbol.iterator].
 * @returns {AsyncIterableX<TSource>} An iterable sequence whose observers trigger an invocation of the given iterable factory function.
 */
export function defer<TSource>(factory: () => Iterable<TSource>): IterableX<TSource> {
  return new DeferIterable<TSource>(factory);
}
