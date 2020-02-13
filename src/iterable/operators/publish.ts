import { IterableX } from '../iterablex';
import { RefCountList } from './_refcountlist';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class PublishedBuffer<T> extends IterableX<T> {
  private _buffer: RefCountList<T>;
  private _source: Iterator<T>;
  private _error: any;
  private _stopped: boolean = false;

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

export function publish<TSource>(): OperatorFunction<TSource, TSource>;
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return selector
      ? create(() => selector(publish<TSource>()(source))[Symbol.iterator]())
      : new PublishedBuffer<TSource>(source[Symbol.iterator]());
  };
}
