import { IterableX } from '../iterable';
import { IRefCountList, MaxRefCountList, RefCountList } from './_refcountlist';
import { create } from './create';

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

  *[Symbol.iterator]() {
    let i = 0;
    try {
      while (1) {
        let hasValue = false, current = <T>{};
        if (i >= this._buffer.count) {
          if (!this._stopped) {
            try {
              let next = this._source.next();
              hasValue = !next.done;
              if (hasValue) { current = next.value; }
            } catch (e) {
              this._error = e;
              this._stopped = true;
            }
          }

          if (this._stopped) {
            throw this._error;
          }

          if (hasValue) { this._buffer.push(current); }
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
export function memoize<TSource>(
  source: Iterable<TSource>,
  readerCount?: number): IterableX<TSource>;
export function memoize<TSource, TResult>(
  source: Iterable<TSource>,
  readerCount?: number,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
export function memoize<TSource, TResult = TSource>(
    source: Iterable<TSource>,
    readerCount: number = -1,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  if (readerCount === -1 && !selector) {
    return new MemoizeBuffer<TSource>(source[Symbol.iterator](), new MaxRefCountList<TSource>());
  }

  if (readerCount !== -1 && !selector) {
    return new MemoizeBuffer<TSource>(source[Symbol.iterator](), new RefCountList<TSource>(readerCount));
  }

  return create<TSource | TResult>(() => selector!(memoize(source, readerCount))[Symbol.iterator]());
}
