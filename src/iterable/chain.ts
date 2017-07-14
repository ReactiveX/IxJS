import { IterableX } from '../iterable';

class ChainIterable<TResult> extends IterableX<TResult> {
  private _result: Iterable<TResult>;

  constructor(result: Iterable<TResult>) {
    super();
    this._result = result;
  }

  [Symbol.iterator]() {
    return this._result[Symbol.iterator]();
  }
}

/**
 * Returns an iterable sequence that is the result of invoking the selector on the source sequence,
 * without sharing subscriptions.  This operator allows for a fluent style of writing queries that use
 * the same sequence multiple times.
 * @param {Iterable<TSource>} source Source sequence that will be shared in the selector function.
 * @param {function(source: Iterable<TSource>): Iterable<TResult>} selector Selector function which can use
 * the source sequence as many times as needed, without sharing subscriptions to the source sequence.
 * @returns An iterable sequence that contains the elements of a sequence produced by multicasting the source
 * sequence within a selector function.
 */
export function chain<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (source: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult> {
  return new ChainIterable<TResult>(selector(source));
}
