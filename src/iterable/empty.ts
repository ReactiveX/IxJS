import { IterableX } from '../iterable';

class EmptyIterable<TSource> extends IterableX<TSource> {
  *[Symbol.iterator](): Iterator<TSource> {
    // tslint:disable-next-line:no-empty
  }
}

/**
 * Returns an empty iterable.
 * @return {Iterable<T>} The empty iterable.
 */
export function empty<TSource>(): IterableX<TSource> {
  return new EmptyIterable<TSource>();
}
