import { IterableX } from '../iterablex';
import { RefCountList } from './_refcountlist';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class PublishedBuffer<T> extends IterableX<T> {
  private _buffer: RefCountList<T>;
  private _source: Iterator<T>;
  private _error: any;
  private _stopped = false;

  constructor(source: Iterator<T>) {
    super();
    this._source = source;
    this._buffer = new RefCountList<T>(0);
  }

  // eslint-disable-next-line complexity
  private *_getIterable(i: number): Iterable<T> {
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
            if (this._error) {
              throw this._error;
            } else {
              break;
            }
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

        // eslint-disable-next-line no-param-reassign
        i++;
      }
    } finally {
      this._buffer.done();
    }
  }

  [Symbol.iterator](): Iterator<T> {
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.iterator]();
  }
}

/**
 * Creates a buffer with a view over the source sequence, causing each iterator to obtain access to the
 * remainder of the sequence from the current index in the buffer.
 *
 * @export
 * @template TSource Source sequence element type.
 * @returns {OperatorFunction<TSource, TSource>} Buffer enabling each iterator to retrieve elements from
 * the shared source sequence, starting from the index at the point of obtaining the enumerator.
 */
export function publish<TSource>(): OperatorFunction<TSource, TSource>;
/**
 * Buffer enabling each iterator to retrieve elements from the shared source sequence, starting from the
 * index at the point of obtaining the iterator.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {(value: Iterable<TSource>) => Iterable<TResult>} [selector] Selector function with published
 * access to the source sequence for each iterator.
 * @returns {OperatorFunction<TSource, TResult>} Sequence resulting from applying the selector function to the
 * published view over the source sequence.
 */
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
/**
 * Buffer enabling each iterator to retrieve elements from the shared source sequence, starting from the
 * index at the point of obtaining the iterator.
 *
 * @export
 * @template TSource Source sequence element type.
 * @template TResult Result sequence element type.
 * @param {(value: Iterable<TSource>) => Iterable<TResult>} [selector] Selector function with published
 * access to the source sequence for each iterator.
 * @returns {(OperatorFunction<TSource, TSource | TResult>)} Sequence resulting from applying the selector function to the
 * published view over the source sequence.
 */
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return selector
      ? create(() => selector(publish<TSource>()(source))[Symbol.iterator]())
      : new PublishedBuffer<TSource>(source[Symbol.iterator]());
  };
}
