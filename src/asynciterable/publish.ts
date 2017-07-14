import { AsyncIterableX } from '../asynciterable';
import { RefCountList } from '../iterable/_refcountlist';
import { create } from './create';

class PublishedAsyncBuffer<T> extends AsyncIterableX<T> {
  private _buffer: RefCountList<T>;
  private _source: AsyncIterator<T>;
  private _error: any;
  private _stopped: boolean = false;

  constructor(source: AsyncIterator<T>) {
    super();
    this._source = source;
    this._buffer = new RefCountList<T>(0);
  }

  private async *_getIterable(i: number): AsyncIterable<T> {
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
            if (this._error) {
              throw this._error;
            } else {
              break;
            }
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

  [Symbol.asyncIterator](): AsyncIterator<T> {
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.asyncIterator]();
  }
}

export function publish<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource>;
export function publish<TSource, TResult>(
  source: AsyncIterable<TSource>,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult>;
export function publish<TSource, TResult>(
    source: AsyncIterable<TSource>,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  return selector ?
    create(async () => selector(publish(source))[Symbol.asyncIterator]()) :
    new PublishedAsyncBuffer<TSource>(source[Symbol.asyncIterator]());
}
