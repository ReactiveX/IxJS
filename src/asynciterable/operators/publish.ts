import { AsyncIterableX } from '../asynciterablex';
import { RefCountList } from '../../iterable/operators/_refcountlist';
import { create } from '../create';
import { OperatorAsyncFunction } from '../../interfaces';
import { MemoizeAsyncBuffer } from './memoize';
import { throwIfAborted } from '../../aborterror';

class PublishedAsyncBuffer<T> extends MemoizeAsyncBuffer<T> {
  // @ts-ignore
  protected _buffer: RefCountList<T>;

  constructor(source: AsyncIterator<T>) {
    super(source, new RefCountList<T>(0));
  }

  [Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.asyncIterator]();
  }
}

/**
 * Creates a buffer with a view over the source sequence, causing each iterator to obtain access to the
 * remainder of the sequence from the current index in the buffer.
 *
 * @export
 * @template TSource Source sequence element type.
 * @returns {OperatorAsyncFunction<TSource, TSource>} Buffer enabling each iterator to retrieve elements from
 * the shared source sequence, starting from the index at the point of obtaining the enumerator.
 */
export function publish<TSource>(): OperatorAsyncFunction<TSource, TSource>;
/**
 * Buffer enabling each iterator to retrieve elements from the shared source sequence, starting from the
 * index at the point of obtaining the iterator.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {(value: AsyncIterable<TSource>) => AsyncIterable<TResult>} [selector] Selector function with published
 * access to the source sequence for each iterator.
 * @returns {OperatorAsyncFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * published view over the source sequence.
 */
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
/**
 * Buffer enabling each iterator to retrieve elements from the shared source sequence, starting from the
 * index at the point of obtaining the iterator.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {(value: AsyncIterable<TSource>) => AsyncIterable<TResult>} [selector] Selector function with published
 * access to the source sequence for each iterator.
 * @returns {(OperatorAsyncFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * published view over the source sequence.
 */
export function publish<TSource, TResult>(
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return selector
      ? create(async () => selector(publish<TSource>()(source))[Symbol.asyncIterator]())
      : new PublishedAsyncBuffer<TSource>(source[Symbol.asyncIterator]());
  };
}
