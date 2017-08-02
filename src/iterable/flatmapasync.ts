import { AsyncIterableX } from '../asynciterable';
import { bindCallback } from '../internal/bindcallback';

class FlatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>;
  private _selector: (value: TSource) => Iterable<TResult | PromiseLike<TResult>> | AsyncIterable<TResult>;

  constructor(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    selector: (value: TSource) => Iterable<TResult | PromiseLike<TResult>> | AsyncIterable<TResult>) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator]() {
    for await (let outer of <AsyncIterable<TSource>>(this._source)) {
      for await (let inner of <AsyncIterable<TResult>>(this._selector(outer))) {
        yield inner;
      }
    }
  }
}

/**
 * Projects each element of a sequence to a potentially async iterable and flattens the
 * resulting sequences into one sequence.
 * @param {Iterable<T | Promise<T>> | AsyncIterable<T>} source Source sequence
 * @param {function:(value: T): Iterable<R | Promise<R>> | AsyncIterable<R>} selector A transform function to apply to each element.
 * @param {Object} [thisArg] An optional "this" binding for the selector function.
 * @returns {AsyncIterable<R>} An async iterable whose elements are the result of invoking the one-to-many
 * transform function on each element of the input sequence.
 */
export function flatMapAsync<TSource, TResult>(
    source: Iterable<TSource | PromiseLike<TSource>> | AsyncIterable<TSource>,
    selector: (value: TSource) => Iterable<TResult | PromiseLike<TResult>> | AsyncIterable<TResult>,
    thisArg?: any): AsyncIterableX<TResult> {
  return new FlatMapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
}
