import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

class FilterIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      if (this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

/**
 * Filters a sequence of values based on a predicate.
 * @param {Iterable<T>} source Source sequence.
 * @param {function(value: T, index: number): boolean} predicate A function to test each source element for a condition.
 * @param {Object} [thisArg] Value to use as this when executing callback.
 * @return {Iterable<T>} Sequence that contains elements from the input sequence that satisfy the condition.
 */
export function filter<T>(
    source: Iterable<T>,
    predicate: (value: T, index: number) => boolean,
    thisArg?: any): IterableX<T> {
  return new FilterIterable<T>(source, bindCallback(predicate, thisArg, 2));
}
