import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

export class FilterIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;
  private _thisArg?: any;

  constructor(
    source: Iterable<TSource>,
    predicate: (value: TSource, index: number) => boolean,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
    this._thisArg = thisArg;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._source) {
      if (this._predicate.call(this._thisArg, item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): OperatorFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): OperatorFunction<T, T>;

/**
 * Filters the elements of an iterable sequence based on a predicate.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {((value: TSource, index: number) => boolean)} predicate A function to test each source element for a condition.
 * @param {*} [thisArg] Optional this for binding.
 * @returns {OperatorFunction<TSource, TSource>} An operator which returns an iterable
 * sequence that contains elements from the input sequence that satisfy the condition.
 */
export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean,
  thisArg?: any
): OperatorFunction<TSource, TSource> {
  return function filterOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FilterIterable<TSource>(source, predicate, thisArg);
  };
}
