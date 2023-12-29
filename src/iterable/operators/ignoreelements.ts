import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
export class IgnoreElementsIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator](): Iterator<TSource> {
    const it = this._source[Symbol.iterator]();
    while (!it.next().done) {
      /* intentionally empty */
    }
  }
}

/**
 * Ignores all elements in an iterable sequence leaving only the termination messages.
 *
 * @template TSource The type of the elements in the source sequence
 * @returns {MonoTypeOperatorFunction<TSource>} An operator that returns an empty iterable sequence
 * that signals termination, successful or exceptional, of the source sequence.
 */
export function ignoreElements<TSource>(): MonoTypeOperatorFunction<TSource> {
  return function ignoreElementsOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new IgnoreElementsIterable<TSource>(source);
  };
}
