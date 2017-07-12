import { AsyncIterableX } from '../asynciterable';
import { IRefCountList, MaxRefCountList, RefCountList } from '../iterable/_refcountlist';
import { create } from './create';

class MemoizeAsyncBuffer<T> extends AsyncIterableX<T> {
  private _source: AsyncIterator<T>;
  private _buffer: IRefCountList<T>;
  private _error: any;
  private _stopped: boolean = false;

  constructor(source: AsyncIterator<T>, buffer: IRefCountList<T>) {
    super();
    this._source = source;
    this._buffer = buffer;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    try {
      while (1) {
        let hasValue = false, current = <T>{};
        if (i >= this._buffer.count) {
          if (!this._stopped) {
            try {
              let next = await this._source.next();
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
    source: AsyncIterable<TSource>,
    readerCount?: number): AsyncIterableX<TSource>;
export function memoize<TSource, TResult>(
    source: AsyncIterable<TSource>,
    readerCount?: number,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult>;
export function memoize<TSource, TResult = TSource>(
    source: AsyncIterable<TSource>,
    readerCount: number = -1,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  if (readerCount === -1 && !selector) {
    return new MemoizeAsyncBuffer<TSource>(source[Symbol.asyncIterator](), new MaxRefCountList<TSource>());
  }

  if (readerCount !== -1 && !selector) {
    return new MemoizeAsyncBuffer<TSource>(source[Symbol.asyncIterator](), new RefCountList<TSource>(readerCount));
  }

  return create<TSource | TResult>(() => selector!(memoize(source, readerCount))[Symbol.asyncIterator]());
}
