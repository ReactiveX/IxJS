import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class ReverseIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    const results = [] as TSource[];
    for (const item of this._source) {
      results.unshift(item);
    }
    yield* results;
  }
}

/**
 * Reverses the iterable instance.
 *
 * @template TSource The type of the elements in the source sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} The iterable in reversed sequence.
 */
export function reverse<TSource>(): MonoTypeOperatorFunction<TSource> {
  return function reverseOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new ReverseIterable<TSource>(source);
  };
}
