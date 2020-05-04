import { IterableX } from './iterablex';

class EmptyIterable<TSource> extends IterableX<TSource> {
  *[Symbol.iterator](): Iterator<TSource> {
    // eslint-disable-next-line no-empty
  }
}

/**
 * Returns an empty iterable sequence.
 *
 * @export
 * @template TSource The type used for the iterable type parameter of the resulting sequence.
 * @returns {IterableX<TSource>} An iterable sequence with no elements.
 */
export function empty<TSource>(): IterableX<TSource> {
  return new EmptyIterable<TSource>();
}
