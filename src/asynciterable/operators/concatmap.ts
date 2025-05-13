import { AsyncIterableX } from '../asynciterablex.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';
import { FlattenConcurrentSelector } from './_flatten.js';

class ConcatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  constructor(
    private _source: AsyncIterable<TSource>,
    private _selector: FlattenConcurrentSelector<TSource, TResult>,
    private _thisArg?: any
  ) {
    super();
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    let outerIndex = 0;
    for await (const outer of wrapWithAbort(this._source, signal)) {
      const values = await this._selector.call(this._thisArg, outer, outerIndex++, signal);

      for await (const item of wrapWithAbort(AsyncIterableX.as(values), signal)) {
        yield item;
      }
    }
  }
}

/**
 * Projects each element of an async-iterable sequence to an async-iterable sequence and merges
 * the resulting async-iterable sequences into one async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of the elements in the projected inner sequences and the elements in the merged result sequence.
 * @param {((
 *     value: TSource,
 *     index: number,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>)} selector A transform function to apply to each element.
 * @param {*} [thisArg] Option this for binding to the selector.
 * @returns {OperatorAsyncFunction<TSource, TResult>} An operator that creates an async-iterable sequence whose
 * elements are the result of invoking the one-to-many transform function on each element of the input sequence.
 */
export function concatMap<TSource, TResult>(
  selector: FlattenConcurrentSelector<TSource, TResult>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function concatMapOperatorFunction(source) {
    return new ConcatMapAsyncIterable(source, selector, thisArg);
  };
}
