import { AsyncIterableX } from '../asynciterable';

class ChainAsyncIterable<TResult> extends AsyncIterableX<TResult> {
  private _result: AsyncIterable<TResult>;

  constructor(result: AsyncIterable<TResult>) {
    super();
    this._result = result;
  }

  [Symbol.asyncIterator]() {
    return this._result[Symbol.asyncIterator]();
  }
}

/**
 * Returns an async iterable sequence that is the result of invoking the selector on the source sequence,
 * without sharing subscriptions.  This operator allows for a fluent style of writing queries that use
 * the same sequence multiple times.
 * @param {AsyncIterable<TSource>} source Source sequence that will be shared in the selector function.
 * @param {function(source: AsyncIterable<TSource>): AsyncIterable<TResult>} selector Selector function which can use
 * the source sequence as many times as needed, without sharing subscriptions to the source sequence.
 * @returns An async iterable sequence that contains the elements of a sequence produced by multicasting the source
 * sequence within a selector function.
 */
export function chain<TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector: (source: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult> {
  return new ChainAsyncIterable<TResult>(selector(source));
}
