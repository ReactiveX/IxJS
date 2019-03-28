import { create } from './create';
import { MemoizeAsyncBuffer } from './memoize';
import { AsyncIterableX } from './asynciterablex';
import { RefCountList } from '../iterable/_refcountlist';

class PublishedAsyncBuffer<T> extends MemoizeAsyncBuffer<T> {
  // @ts-ignore
  protected _buffer: RefCountList<T>;

  constructor(source: AsyncIterator<T>) {
    super(source, new RefCountList<T>(0));
  }

  [Symbol.asyncIterator]() {
    this._buffer.readerCount++;
    return this._getIterable(this._buffer.count)[Symbol.asyncIterator]();
  }
}

export function publish<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource>;
export function publish<TSource, TResult>(
  source: AsyncIterable<TSource>,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): AsyncIterableX<TResult>;
export function publish<TSource, TResult>(
  source: AsyncIterable<TSource>,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): AsyncIterableX<TSource | TResult> {
  return selector
    ? create(async () => selector(publish(source))[Symbol.asyncIterator]())
    : new PublishedAsyncBuffer<TSource>(source[Symbol.asyncIterator]());
}
