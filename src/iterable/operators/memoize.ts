import { IterableX } from '../iterablex';
import { IRefCountList, MaxRefCountList, RefCountList } from './_refcountlist';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class MemoizeBuffer<T> extends IterableX<T> {
  private _source: Iterator<T>;
  private _buffer: IRefCountList<T>;
  private _error: any;
  private _stopped = false;

  constructor(source: Iterator<T>, buffer: IRefCountList<T>) {
    super();
    this._source = source;
    this._buffer = buffer;
  }

  // eslint-disable-next-line complexity
  *[Symbol.iterator]() {
    let i = 0;
    try {
      while (1) {
        let hasValue = false;
        let current = <T>{};
        if (i >= this._buffer.count) {
          if (!this._stopped) {
            try {
              const next = this._source.next();
              hasValue = !next.done;
              // eslint-disable-next-line max-depth
              if (hasValue) {
                current = next.value;
              }
            } catch (e) {
              this._error = e;
              this._stopped = true;
            }
          }

          if (this._stopped) {
            throw this._error;
          }

          if (hasValue) {
            this._buffer.push(current);
          }
        } else {
          hasValue = true;
        }

        if (hasValue) {
          yield this._buffer.get(i);
        } else {
          break;
        }

        i++;
      }
    } finally {
      this._buffer.done();
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
 * @returns {OperatorFunction<TSource, TSource>} Buffer enabling a specified number of iterators to retrieve all
 * elements from the shared source sequence, without duplicating source iteration side-effects.
 */
export function memoize<TSource>(readerCount?: number): OperatorFunction<TSource, TSource>;
/**
 * Memoizes the source sequence within a selector function where a specified number of iterators can get access
 * to all of the sequence's elements without causing multiple iterations over the source.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {number} [readerCount] Number of iterators that can access the underlying buffer. Once every
 * iterator has obtained an element from the buffer, the element is removed from the buffer.
 * @param {(value: Iterable<TSource>) => Iterable<TResult>} [selector] Selector function with memoized access
 * to the source sequence for a specified number of iterators.
 * @returns {OperatorFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * memoized view over the source sequence.
 */
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
/**
 * Memoizes the source sequence within a selector function where a specified number of iterators can get access
 * to all of the sequence's elements without causing multiple iterations over the source.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {number} [readerCount=-1] Number of iterators that can access the underlying buffer. Once every
 * iterator has obtained an element from the buffer, the element is removed from the buffer.
 * @param {(value: Iterable<TSource>) => Iterable<TResult>} [selector] Selector function with memoized access
 * to the source sequence for a specified number of iterators.
 * @returns {(OperatorFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * memoized view over the source sequence.
 */
export function memoize<TSource, TResult = TSource>(
  readerCount = -1,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function memoizeOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    if (!selector) {
      return readerCount === -1
        ? new MemoizeBuffer<TSource>(source[Symbol.iterator](), new MaxRefCountList<TSource>())
        : new MemoizeBuffer<TSource>(
            source[Symbol.iterator](),
            new RefCountList<TSource>(readerCount)
          );
    }
    return create<TSource | TResult>(() =>
      selector!(memoize<TSource>(readerCount)(source))[Symbol.iterator]()
    );
  };
}
