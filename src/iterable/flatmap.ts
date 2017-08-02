import { IterableX } from '../iterable';
import { bindCallback } from '../internal/bindcallback';

class FlatMapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => Iterable<TResult>;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TResult>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    for (let outerItem of this._source) {
      for (let innerItem of this._fn(outerItem)) {
        yield innerItem;
      }
    }
  }
}

/**
 * Projects each element of a sequence to iterable and flattens the resulting sequences into
 * one sequence.
 * @param {Iterable<T>} source Source sequence
 * @param {function:(value: T): Iterable<R>} selector A transform function to apply to each element.
 * @param {Object} [thisArg] An optional "this" binding for the selector function.
 * @returns {Iterable<R>} An iterable whose elements are the result of invoking the one-to-many
 * transform function on each element of the input sequence.
 */
export function flatMap<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (value: TSource) => Iterable<TResult>,
    thisArg?: any): IterableX<TResult> {
  return new FlatMapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
}
