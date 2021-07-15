import { IterableX } from './iterablex';

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
 * Creates a new iterable using the specified function implementing the members of AsyncIterable
 *
 * @template T The type of the elements returned by the iterable sequence.
 * @param {(() => Iterator<T>)} fn The function that creates the [Symbol.iterator]() method
 * @returns {IterableX<T>} A new iterable instance.
 */
export function create<T>(getIterator: () => Iterator<T>): IterableX<T> {
  return new AnonymousIterable(getIterator);
}
