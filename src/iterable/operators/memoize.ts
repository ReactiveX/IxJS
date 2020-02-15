import { IterableX } from '../iterablex';
import { IRefCountList, MaxRefCountList, RefCountList } from './_refcountlist';
import { create } from '../create';
import { OperatorFunction } from '../../interfaces';

class MemoizeBuffer<T> extends IterableX<T> {
  private _source: Iterator<T>;
  private _buffer: IRefCountList<T>;
  private _error: any;
  private _stopped: boolean = false;

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

export function memoize<TSource>(readerCount?: number): OperatorFunction<TSource, TSource>;
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function memoize<TSource, TResult = TSource>(
  readerCount: number = -1,
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
