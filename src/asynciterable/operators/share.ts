import { AsyncIterableX } from '../asynciterablex.js';
import { create } from '../create.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { throwIfAborted } from '../../aborterror.js';

class SharedAsyncIterable<T> extends AsyncIterableX<T> {
  private _it: AsyncIterator<T>;

  constructor(it: AsyncIterator<T>) {
    super();

    this._it = {
      next(value) {
        return it.next(value);
      },
    };
  }

  [Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    return this._it;
  }
}

/**
 * Creates a buffer with a shared view over the source sequence, causing each iterator to fetch the next element
 * from the source sequence.
 *
 * @template TSource Source sequence element type.
 * @returns {OperatorAsyncFunction<TSource, TSource>} Buffer enabling each enumerator to retrieve elements from the shared source sequence.
 */
export function share<TSource>(): OperatorAsyncFunction<TSource, TSource>;

/**
 * Shares the source sequence within a selector function where each iterator can fetch the next element from the
 * source sequence.
 *
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {((
 *     value: AsyncIterable<TSource>,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>)} [selector] Selector function with shared access
 * to the source sequence for each iterator.
 * @returns {OperatorAsyncFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * shared view over the source sequence.
 */
export function share<TSource, TResult>(
  selector?: (
    value: AsyncIterable<TSource>,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TResult>;

/**
 * Shares the source sequence within a selector function where each iterator can fetch the next element from the
 * source sequence.
 *
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {((
 *     value: AsyncIterable<TSource>,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>)} [selector] Selector function with shared access
 * to the source sequence for each iterator.
 * @returns {(OperatorAsyncFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * shared view over the source sequence.
 */
export function share<TSource, TResult = TSource>(
  selector?: (
    value: AsyncIterable<TSource>,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return selector
      ? create(async (signal) => {
          const it = await selector(
            new SharedAsyncIterable(source[Symbol.asyncIterator](signal)),
            signal
          );

          return it[Symbol.asyncIterator](signal);
        })
      : new SharedAsyncIterable(source[Symbol.asyncIterator]());
  };
}
