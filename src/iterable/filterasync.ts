import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class FilterIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;

  constructor(
      source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
      predicate: (value: TSource, index: number) => boolean | Promise<boolean>) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of <AsyncIterable<TSource>>(this._source)) {
      if (await this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

/**
* Filters a sequence of values based on a predicate.
* @param {Iterable<T | Promise<T>> | AsyncIterable<T>} source Source sequence.
* @param {function(value: T, index: number): boolean | Promise<boolean>} predicate A function to test each source element for a condition.
* @param {Object} [thisArg] Value to use as this when executing callback.
* @return {AsyncIterable<T>} Sequence that contains elements from the input sequence that satisfy the condition.
*/
export function filterAsync<TSource>(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
    thisArg?: any): AsyncIterableX<TSource> {
  return new FilterIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
}
