import { IterableX } from '../iterable';

class AnonymousIterable<T> extends IterableX<T> {
  private _fn: () => Iterator<T>;

  constructor(fn: () => Iterator<T>) {
    super();
    this._fn = fn;
  }

  [Symbol.iterator]() {
    return this._fn();
  }
}

/**
 * Creates an enumerable sequence based on an enumerator factory function.
 * @param {function(): Iterator<T>} getIterator The iterator factory function.
 * @return {Iterable<T>} Sequence that will invoke the iterator factory upon a call to [Symbol.iterator]().
 */
export function create<T>(getIterator: () => Iterator<T>): IterableX<T> {
  return new AnonymousIterable(getIterator);
}
