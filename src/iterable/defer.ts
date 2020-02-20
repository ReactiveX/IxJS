import { IterableX } from './iterablex';

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
 * Creates an enumerable sequence based on an iterable factory function.
 * @param {function(): Iterable<T>} factory Iterable factory function.
 * @return {Iterable<T>} Sequence that will invoke the iterable factory upon a call to [Symbol.iterator]().
 */
export function defer<TSource>(factory: () => Iterable<TSource>): IterableX<TSource> {
  return new DeferIterable<TSource>(factory);
}
