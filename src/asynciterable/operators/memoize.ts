import { AsyncIterableX } from '../asynciterablex';
import {
  IRefCountList,
  MaxRefCountList,
  RefCountList,
} from '../../iterable/operators/_refcountlist';
import { create } from '../create';
import { OperatorAsyncFunction } from '../../interfaces';
import { throwIfAborted } from '../../aborterror';

export class MemoizeAsyncBuffer<T> extends AsyncIterableX<T> {
  protected _source: AsyncIterator<T>;
  protected _buffer: IRefCountList<T>;
  protected _shared: Promise<IteratorResult<T>> | null;
  protected _error: any;
  protected _stopped: boolean;

  constructor(source: AsyncIterator<T>, buffer: IRefCountList<T>) {
    super();
    this._error = null;
    this._shared = null;
    this._stopped = false;
    this._source = source;
    this._buffer = buffer;
  }

  [Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    return this._getIterable(0);
  }

  protected async *_getIterable(offset = 0) {
    let i = offset - 1;
    let done: boolean | undefined = false;
    const buffer = this._buffer;

    try {
      do {
        if (++i < buffer.count) {
          yield buffer.get(i);
          continue;
        }

        if (this._stopped) {
          throw this._error;
        }

        if (this._shared === null) {
          this._shared = this._source.next().then((r) => {
            this._shared = null;
            if (!r.done) {
              buffer.push(r.value);
            }
            return r;
          });
        }

        ({ done } = await this._shared.catch((e) => {
          this._error = e;
          this._stopped = true;
          throw e;
        }));

        if (!done) {
          yield buffer.get(i);
        }
      } while (!done);
    } finally {
      buffer.done();
    }
  }
}

/**
 * Creates a buffer with a view over the source sequence, causing a specified number of iterators to obtain access
 * to all of the sequence's elements without causing multiple enumerations over the source.
 * @export
 * @template TSource Source sequence element type.
 * @param {number} [readerCount] Number of iterators that can access the underlying buffer.
 * Once every iterator has obtained an element from the buffer, the element is removed from the buffer.
 * @returns {OperatorAsyncFunction<TSource, TSource>} Buffer enabling a specified number of iterators to retrieve all
 * elements from the shared source sequence, without duplicating source iteration side-effects.
 */
export function memoize<TSource>(readerCount?: number): OperatorAsyncFunction<TSource, TSource>;
/**
 * Memoizes the source sequence within a selector function where a specified number of iterators can get access
 * to all of the sequence's elements without causing multiple iterations over the source.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {number} [readerCount] Number of iterators that can access the underlying buffer. Once every
 * iterator has obtained an element from the buffer, the element is removed from the buffer.
 * @param {(value: AsyncIterableX<TSource>) => AsyncIterable<TResult>} [selector] Selector function with memoized access
 * to the source sequence for a specified number of iterators.
 * @returns {OperatorAsyncFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * memoized view over the source sequence.
 */
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
/**
 * Memoizes the source sequence within a selector function where a specified number of iterators can get access
 * to all of the sequence's elements without causing multiple iterations over the source.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {number} [readerCount=-1] Number of iterators that can access the underlying buffer. Once every
 * iterator has obtained an element from the buffer, the element is removed from the buffer.
 * @param {(value: AsyncIterableX<TSource>) => AsyncIterable<TResult>} [selector] Selector function with memoized access
 * to the source sequence for a specified number of iterators.
 * @returns {(OperatorAsyncFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * memoized view over the source sequence.
 */
export function memoize<TSource, TResult = TSource>(
  readerCount: number = -1,
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function memoizeOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    if (!selector) {
      return readerCount === -1
        ? new MemoizeAsyncBuffer<TSource>(
          source[Symbol.asyncIterator](),
          new MaxRefCountList<TSource>()
        )
        : new MemoizeAsyncBuffer<TSource>(
          source[Symbol.asyncIterator](),
          new RefCountList<TSource>(readerCount)
        );
    }
    return create<TSource | TResult>(() =>
      selector!(memoize<TSource>(readerCount)(source))[Symbol.asyncIterator]()
    );
  };
}
